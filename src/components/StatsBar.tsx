export default function StatsBar() {
  const stats = [
    { label: "Active Students", value: "500+" },
    { label: "Pass Rate", value: "98%" },
    { label: "Expert Tutors", value: "45+" },
    { label: "Curricula", value: "3 Core" },
  ];

  return (
    <div className="w-full bg-surface border-y border-border-glow overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-[200%] animate-[shimmer_30s_linear_infinite]">
        <div className="flex w-1/2 justify-around items-center py-6 px-4">
          {stats.map((stat, i) => (
            <div key={`a-${i}`} className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-bold text-foreground text-glow">{stat.value}</span>
              <span className="text-xs md:text-sm text-text-secondary uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="flex w-1/2 justify-around items-center py-6 px-4">
          {stats.map((stat, i) => (
            <div key={`b-${i}`} className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-bold text-foreground text-glow">{stat.value}</span>
              <span className="text-xs md:text-sm text-text-secondary uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
