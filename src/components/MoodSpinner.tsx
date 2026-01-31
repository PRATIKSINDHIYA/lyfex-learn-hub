import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const segments = [
  { label: "Observe", color: "hsl(24, 95%, 53%)", description: "Watch and learn from real journeys" },
  { label: "Learn", color: "hsl(38, 92%, 50%)", description: "Casual learning, one sip at a time" },
  { label: "Discuss", color: "hsl(30, 90%, 52%)", description: "Talk, ask & share freely" },
  { label: "Support", color: "hsl(20, 95%, 50%)", description: "Get help, give help" },
  { label: "Pause", color: "hsl(35, 88%, 48%)", description: "Refresh, relax, and reset" },
];

const MoodSpinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const finalRotation = spins * 360 + (randomSegment * segmentAngle) + (segmentAngle / 2);
    
    setRotation(rotation + finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIndex(randomSegment);
    }, 4000);
  };

  const createSegmentPath = (index: number, total: number) => {
    const angle = 360 / total;
    const startAngle = index * angle - 90;
    const endAngle = startAngle + angle;
    
    const start = polarToCartesian(150, 150, 140, endAngle);
    const end = polarToCartesian(150, 150, 140, startAngle);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M 150 150 L ${start.x} ${start.y} A 140 140 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const getLabelPosition = (index: number, total: number) => {
    const angle = (360 / total) * index + (360 / total / 2) - 90;
    return polarToCartesian(150, 150, 90, angle);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What's Your <span className="gradient-orange-text">Mood</span>?
          </h2>
          <p className="text-muted-foreground text-lg">Spin the wheel and discover your learning path</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Wheel */}
          <div className="relative">
            {/* Arrow Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-primary" />
            </div>

            <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px]">
              <svg
                ref={wheelRef}
                viewBox="0 0 300 300"
                className="w-full h-full drop-shadow-2xl"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                }}
              >
                {segments.map((segment, index) => (
                  <g key={segment.label}>
                    <path
                      d={createSegmentPath(index, segments.length)}
                      fill={segment.color}
                      stroke="hsl(222, 47%, 11%)"
                      strokeWidth="2"
                    />
                    <text
                      x={getLabelPosition(index, segments.length).x}
                      y={getLabelPosition(index, segments.length).y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(222, 47%, 11%)"
                      fontSize="14"
                      fontWeight="bold"
                      style={{
                        transform: `rotate(${(360 / segments.length) * index + (360 / segments.length / 2)}deg)`,
                        transformOrigin: `${getLabelPosition(index, segments.length).x}px ${getLabelPosition(index, segments.length).y}px`,
                      }}
                    >
                      {segment.label}
                    </text>
                  </g>
                ))}
                {/* Center Circle */}
                <circle cx="150" cy="150" r="40" fill="hsl(222, 47%, 14%)" stroke="hsl(24, 95%, 53%)" strokeWidth="3" />
              </svg>

              {/* Spin Button */}
              <Button
                onClick={spin}
                disabled={isSpinning}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full gradient-orange text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50"
              >
                {isSpinning ? "..." : "SPIN"}
              </Button>
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid gap-4 max-w-md">
            {segments.map((segment, index) => (
              <div
                key={segment.label}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedIndex === index
                    ? "border-primary bg-primary/10 scale-105"
                    : "border-border/50 bg-card/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="font-semibold text-foreground">{segment.label}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{segment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodSpinner;
