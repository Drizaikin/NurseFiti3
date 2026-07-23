export default function CommunityLinks() {
  return (
    <div className="bg-primary-xlight/50 border border-primary/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 mb-12">
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-heading font-bold text-[var(--color-text)] mb-2">Join the NurseFiti Community</h3>
        <p className="text-neutral-mid text-sm leading-relaxed">
          Get real-time updates, study tips, and exclusive NCK exam strategies. Follow us on X to stay updated and connect with thousands of other nursing students.
        </p>
      </div>
      <div className="flex flex-col gap-3 min-w-[160px]">
        <a 
          href="https://x.com/NurseFiti" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl font-bold transition-colors w-full"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          Follow on X
        </a>
      </div>
    </div>
  );
}
