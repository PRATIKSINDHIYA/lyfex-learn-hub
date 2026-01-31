import { Badge } from "@/components/ui/badge";

const inTheAirItems = [
  {
    rank: 1,
    title: "Future of AI in Education",
    description: "Exploring how artificial intelligence is reshaping learning",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 2,
    title: "Remote Work Culture",
    description: "Building effective teams in a distributed world",
    category: "Discussion",
    isLive: false,
  },
  {
    rank: 3,
    title: "Climate Tech Innovation",
    description: "Startups leading the green revolution",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 4,
    title: "Mental Wellness Tips",
    description: "Daily practices for a healthier mind",
    category: "Wellness",
    isLive: false,
  },
];

const InTheAirSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          In the <span className="gradient-orange-text">Air</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {inTheAirItems.map((item) => (
            <div
              key={item.rank}
              className="relative p-[2px] rounded-[2rem] group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 gradient-orange opacity-30 group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-card rounded-[2rem] p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {item.rank}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                      {item.category}
                    </Badge>
                    {item.isLive && (
                      <Badge className="bg-red-500 text-white border-none text-xs animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InTheAirSection;
