# Implementation Plan — Expired Exam Date Notification + Admin View + Audit

## Design decisions

**Feature 1 — Banner placement:** The dashboard is a `'use client'` component with `data.student.exam_date` already available in state after `fetchDashboardData`. The banner is computed inline (no extra API call needed) using a simple `Date` comparison: `exam_date < midnight today (local)`. It is placed immediately before `<HeroBanner>` in the JSX return, following the same pattern as the existing `IS_UNDER_AUDIT` amber alert and the Telegram community banner already in the file. A `useState<boolean>` flag (`examBannerDismissed`) allows dismissal without page reload.

**Feature 2 — Admin view placement:** The existing `app/(admin)/admin/students/page.tsx` is large but fully functional. A new collapsible section at the bottom of the page (toggled by a header button) is the right approach — avoids a sub-page, keeps all student management in one place, and follows the existing accordion pattern. Data is fetched lazily (only when the section is first expanded) via a new `type=expired-exam-active` branch in `/api/admin/data/route.ts`. The query joins `user_logins` (last 30 days, role=student) against `student_profiles` (exam_date < today) and `profiles` (name/email). The service-role admin client handles both tables cleanly. Last login is computed from the most recent `logged_in_at` per user_id.

**Feature 3 — Audit strategy:** Run `npx tsc --noEmit`, which is already wired as `npm run typecheck`. Audit the 7 specified files for broken imports and logic bugs. New errors from FEAT-001/002 are fixed; pre-existing errors are documented separately in the FEAT-003 findings field.

---

- [ ] 1. **Add expired exam date warning banner to student dashboard**
      In `app/(student)/dashboard/page.tsx`: add `const [examBannerDismissed, setExamBannerDismissed] = useState(false)` near existing state declarations. After the `xpProgress` computation, add:
      ```ts
      const examDateExpired = (() => {
        if (!data.student.exam_date) return false;
        const examTs = new Date(data.student.exam_date).setHours(0, 0, 0, 0);
        const todayTs = new Date().setHours(0, 0, 0, 0);
        return examTs < todayTs;
      })();
      ```
      In the JSX return, BEFORE `<HeroBanner ...>`, insert:
      ```tsx
      {examDateExpired && !examBannerDismissed && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700/50 rounded-2xl p-4 sm:p-5 shadow-sm relative">
          <button
            onClick={() => setExamBannerDismissed(true)}
            className="absolute top-3 right-3 text-amber-500 hover:text-amber-700 text-lg leading-none"
            aria-label="Dismiss"
          >×</button>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-xl">⚠️</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-amber-900 dark:text-amber-100 mb-1">Your Exam Date Has Passed</h3>
              <p className="text-sm text-amber-800 dark:text-amber-200/80 mb-3">
                The exam date you set ({new Date(data.student.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}) is in the past. If this is incorrect, please update it so your countdown stays accurate.
              </p>
              <Link href="/settings">
                <Button variant="primary" size="sm">Update Exam Date</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      ```
      Files: `app/(student)/dashboard/page.tsx`
      Verify: `npx tsc --noEmit` — zero new errors on this file.

- [ ] 2. **Extend /api/admin/data with expired-exam-active query**
      In `app/api/admin/data/route.ts`, add a new branch **before** the final `return NextResponse.json({ error: 'Unknown type' })`:
      ```ts
      if (type === 'expired-exam-active') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: recentLogins } = await (admin as any)
          .from('user_logins')
          .select('user_id, logged_in_at')
          .eq('role', 'student')
          .gte('logged_in_at', thirtyDaysAgo.toISOString());

        if (!recentLogins || recentLogins.length === 0) {
          return NextResponse.json({ students: [] });
        }

        // Build map: user_id -> most recent login
        const loginMap = new Map<string, string>();
        for (const row of recentLogins as Array<{ user_id: string; logged_in_at: string }>) {
          const existing = loginMap.get(row.user_id);
          if (!existing || row.logged_in_at > existing) loginMap.set(row.user_id, row.logged_in_at);
        }
        const recentUserIds = Array.from(loginMap.keys());

        // Filter by expired exam_date
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const { data: spData } = await (admin as any)
          .from('student_profiles')
          .select('id, exam_date, exam_cycle')
          .in('id', recentUserIds)
          .lt('exam_date', today);  // exam_date < today

        if (!spData || spData.length === 0) {
          return NextResponse.json({ students: [] });
        }

        const expiredIds = (spData as Array<{ id: string; exam_date: string; exam_cycle: string | null }>).map(s => s.id);
        const spMap = new Map(
          (spData as Array<{ id: string; exam_date: string; exam_cycle: string | null }>).map(s => [s.id, s])
        );

        const { data: profilesData } = await (admin as any)
          .from('profiles')
          .select('id, full_name, email')
          .in('id', expiredIds);

        const students = ((profilesData ?? []) as Array<{ id: string; full_name: string; email: string }>).map(p => {
          const sp = spMap.get(p.id);
          return {
            id: p.id,
            full_name: p.full_name,
            email: p.email,
            exam_date: sp?.exam_date ?? '',
            exam_cycle: sp?.exam_cycle ?? null,
            last_login_at: loginMap.get(p.id) ?? '',
          };
        }).sort((a, b) => b.last_login_at.localeCompare(a.last_login_at));

        return NextResponse.json({ students });
      }
      ```
      Files: `app/api/admin/data/route.ts`
      Verify: `npx tsc --noEmit` — no errors on this file.

- [ ] 3. **Add "Recently Active — Expired Exam Date" section to admin students page**
      In `app/(admin)/admin/students/page.tsx`:
      
      a. Add interface near existing `Student` interface:
      ```ts
      interface ExpiredActiveStudent {
        id: string;
        full_name: string;
        email: string;
        exam_date: string;
        exam_cycle: string | null;
        last_login_at: string;
      }
      ```
      
      b. Add state near existing state declarations:
      ```ts
      const [expiredActive, setExpiredActive] = useState<ExpiredActiveStudent[]>([]);
      const [expiredLoading, setExpiredLoading] = useState(false);
      const [expiredError, setExpiredError] = useState('');
      const [showExpired, setShowExpired] = useState(false);
      const [expiredFetched, setExpiredFetched] = useState(false);
      ```
      
      c. Add fetch function:
      ```ts
      const loadExpiredActive = async () => {
        setExpiredLoading(true);
        setExpiredError('');
        try {
          const res = await fetch('/api/admin/data?type=expired-exam-active');
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? 'Failed to load');
          setExpiredActive(data.students ?? []);
        } catch (err) {
          setExpiredError(err instanceof Error ? err.message : 'Failed to load');
        } finally {
          setExpiredLoading(false);
          setExpiredFetched(true);
        }
      };
      ```
      
      d. Add a toggle handler that lazy-loads on first open:
      ```ts
      const toggleExpiredSection = () => {
        const next = !showExpired;
        setShowExpired(next);
        if (next && !expiredFetched) loadExpiredActive();
      };
      ```
      
      e. In the JSX return, **after** the main student table section and **before** the plan modal, add:
      ```tsx
      {/* ── Recently Active — Expired Exam Date ── */}
      <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <button
          onClick={toggleExpiredSection}
          className="w-full flex items-center justify-between px-5 py-4 bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-amber-600 text-xl">⚠️</span>
            <div className="text-left">
              <p className="font-heading font-semibold text-amber-900 dark:text-amber-100 text-sm">
                Recently Active — Expired Exam Date
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300/70">
                Students who logged in within the last 30 days but have a past exam date
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expiredFetched && (
              <span className="bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-xs font-bold px-2 py-0.5 rounded-full">
                {expiredActive.length}
              </span>
            )}
            <svg className={`w-4 h-4 text-amber-600 transition-transform ${showExpired ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {showExpired && (
          <div className="p-4">
            {expiredLoading ? (
              <div className="flex items-center justify-center py-8"><Spinner size="lg" color="primary" /></div>
            ) : expiredError ? (
              <div className="text-center py-6">
                <p className="text-error text-sm mb-3">{expiredError}</p>
                <Button variant="outline" size="sm" onClick={loadExpiredActive}>Retry</Button>
              </div>
            ) : expiredActive.length === 0 ? (
              <p className="text-center py-6 text-neutral-mid text-sm">
                No recently-active students with a past exam date. ✅
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                <table className="w-full text-sm">
                  <thead className="bg-amber-50 dark:bg-amber-900/10">
                    <tr>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Student</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Exam Date (Passed)</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Cycle</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Last Login</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiredActive.map((s, i) => (
                      <tr key={s.id} className={`border-t border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-amber-50/30 dark:bg-amber-900/5'}`}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-[var(--color-text)]">{s.full_name}</p>
                          <p className="text-xs text-neutral-mid">{s.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-error font-semibold text-xs">
                            {new Date(s.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-mid">{s.exam_cycle ?? '—'}</td>
                        <td className="px-4 py-3 text-xs text-neutral-mid">
                          {new Date(s.last_login_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                          <span className="block text-[10px] text-neutral-mid/70">
                            {new Date(s.last_login_at).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm" onClick={() => openExamModal({
                            id: s.id,
                            full_name: s.full_name,
                            email: s.email,
                            cadre: '—',
                            exam_date: s.exam_date,
                            exam_cycle: s.exam_cycle,
                            plan_tier: 'free',
                            plan_expires_at: null,
                            created_at: '',
                            is_locked: false,
                          })}>
                            Fix Exam Date
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      ```
      
      Files: `app/(admin)/admin/students/page.tsx`
      Verify: `npx tsc --noEmit` — no errors on this file.

- [ ] 4. **Platform audit — run tsc and fix new errors**
      Run `npx tsc --noEmit` in `c:\Users\Administrator\Nursefiti3`. 
      
      **Audit checklist for the 7 key files:**
      
      - `app/(student)/dashboard/page.tsx` — confirm banner logic and HeroBanner still receives exam_date; no broken imports.
      - `app/(student)/settings/page.tsx` — confirm exam date validation `new Date(editForm.exam_date).getTime() <= Date.now()` still works; no conflict with the banner (settings updates exam_date; banner re-evaluates on next login).
      - `app/(admin)/admin/students/page.tsx` — confirm new ExpiredActiveStudent interface, new state, and new JSX compile cleanly; openExamModal adapter cast is correct.
      - `app/(admin)/admin/scholarships/[campaignId]/ClientManager.tsx` — check the `availableFunds` computation; verify all supabase calls compile; look for any uncast property accesses on `any` types that TypeScript might flag.
      - `app/(admin)/admin/scholarships/[campaignId]/page.tsx` — verify `premiumPrice` is a `number` (from `settings.plan_premium_price`) and passes cleanly to `<ClientManager>`.
      - `app/sponsor/[slug]/page.tsx` — verify recharts imports (BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer) are all used and types resolve; verify `SponsorCheckout` import resolves.
      - `app/scholarships/[slug]/apply/page.tsx` — verify `ApplyForm` import resolves to `app/scholarships/[slug]/apply/ApplyForm.tsx`; if this file does not exist, create a minimal stub (client component with a form that posts to `/api/scholarships/apply`).
      
      Fix any errors introduced by FEAT-001, FEAT-002, or pre-existing trivial issues. Document non-trivial pre-existing errors without fixing them.
      
      Files: any of the 7 audited files that have fixable errors.
      Verify: `npx tsc --noEmit` — zero errors introduced by this task.

---

## Risks and gotchas found during exploration

1. **`user_logins` table may not exist in all environments.** The existing analytics branch already handles this gracefully (checks for error on the query). The new `expired-exam-active` branch should similarly guard against a missing table by checking if `recentLogins` has an error and returning `{ students: [] }` instead of a 500.

2. **`exam_date` is stored as a date string (`YYYY-MM-DD`) in `student_profiles`.** The Supabase `.lt('exam_date', today)` filter compares ISO date strings lexicographically, which is correct for `YYYY-MM-DD` format.

3. **Dashboard banner dismissal is in-memory only.** Refreshing the page will show the banner again. This is intentional — the student should be nudged every session until they fix their date. If persistence is needed, `localStorage` can be added later.

4. **The `openExamModal` in the admin page validates that the new date must be in the future** (line ~163: `if (new Date(examDateInput).getTime() <= Date.now())`). This is correct behavior — the admin must set a future date.

5. **`ApplyForm.tsx`** — need to verify it exists at `app/scholarships/[slug]/apply/ApplyForm.tsx`. The import in `apply/page.tsx` assumes it does. If missing, FEAT-003 must create a stub.

6. **TypeScript `as any` casts** are used pervasively in `ClientManager.tsx` and `sponsor/[slug]/page.tsx` to bypass Supabase type inference. This is the existing pattern — do not remove them, as it would introduce more errors than it fixes.
