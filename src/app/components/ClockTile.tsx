import { useState, useEffect } from "react";

export function ClockTile() {
  const [time, setTime] = useState(new Date());
  
  // Custom Date Logic to separate parts
  const hours = time.getHours() % 12 || 12; // Converts 24h to 12h format
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  const lastUpdateDate = "Feb 15, 2026"; 

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-card border border-border rounded-[2rem] p-6 flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
      
      {/* Top Row: Labels & Status Dot */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
            IST / Local
            </span>
            <span className="text-[10px] font-bold text-primary/80 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                Updated: {lastUpdateDate}
            </span>
        </div>

        {/* ALWAYS TEA GREEN DOT */}
        <div className="relative flex h-3 w-3 sm:h-4 sm:w-4">
          {/* Outer Ping Ring (Tea Green Hex: #d8ffc7) */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ffc7] opacity-75"></span>
          
          {/* Inner Solid Dot (Tea Green Hex) with matching Glow */}
          <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-[#d8ffc7] shadow-[0_0_8px_#d8ffc7]"></span>
        </div>
      </div>
      
      {/* Time Display: HH:MM -> SS -> AM/PM */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-1 text-card-foreground group-hover:text-primary transition-colors duration-300">
            {/* Hour & Minute */}
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                {hours}:{minutes}
            </span>
            
            {/* Seconds */}
            <span className="text-xl sm:text-2xl font-bold text-muted-foreground/60 w-[30px] tabular-nums">
                {seconds}
            </span>

            {/* AM/PM */}
            <span className="text-lg sm:text-xl font-black uppercase tracking-widest ml-1">
                {ampm}
            </span>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
    </div>
  );
}