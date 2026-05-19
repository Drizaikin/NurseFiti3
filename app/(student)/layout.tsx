import { Sidebar } from '@/components/student/Sidebar';
import { Topbar } from '@/components/student/Topbar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
