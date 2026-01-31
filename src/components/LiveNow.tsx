import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const liveItems = [
  {
    title: "UX Design Masterclass",
    instructor: "Sarah Johnson",
    participants: 234,
    category: "Design",
    isLive: true,
  },
  {
    title: "Data Science with Python",
    instructor: "Michael Chen",
    participants: 187,
    category: "Technology",
    isLive: true,
  },
  {
    title: "Creative Writing Workshop",
    instructor: "Emma Williams",
    participants: 156,
    category: "Arts",
    isLive: true,
  },
  {
    title: "Business Strategy 101",
    instructor: "David Miller",
    participants: 298,
    category: "Business",
    isLive: true,
  },
];

const LiveNow = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Live <span className="gradient-orange-text">Now</span>
            </h2>
          </div>
          <a href="#" className="text-primary hover:underline">View all →</a>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {liveItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="card-glass rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-red-500 text-white border-none animate-pulse">
                      LIVE
                    </Badge>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">{item.instructor}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={16} className="text-primary" />
                    <span>{item.participants} watching</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-primary text-primary-foreground hover:bg-primary/90" />
          <CarouselNext className="hidden md:flex -right-4 bg-primary text-primary-foreground hover:bg-primary/90" />
        </Carousel>
      </div>
    </section>
  );
};

export default LiveNow;
