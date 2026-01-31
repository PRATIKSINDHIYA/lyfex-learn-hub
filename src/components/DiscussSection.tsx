import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const discussItems = [
  {
    title: "Is AI replacing designers?",
    instructor: "Panel Discussion",
    date: "Jan 15",
    time: "6:00 PM",
    category: "Technology",
  },
  {
    title: "Work-life balance in tech",
    instructor: "Sarah & Team",
    date: "Jan 18",
    time: "7:30 PM",
    category: "Career",
  },
  {
    title: "Future of remote work",
    instructor: "Industry Experts",
    date: "Jan 20",
    time: "5:00 PM",
    category: "Business",
  },
  {
    title: "Mental health awareness",
    instructor: "Dr. Emily Chen",
    date: "Jan 22",
    time: "4:00 PM",
    category: "Wellness",
  },
];

const DiscussSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="gradient-orange text-primary-foreground border-none">
            📍 DISCUSS
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Talk, ask & <span className="gradient-orange-text">share freely</span>
        </h2>
        <p className="text-muted-foreground mb-8">Join conversations that matter</p>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {discussItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative p-[2px] rounded-full group cursor-pointer">
                  <div className="absolute inset-0 rounded-full gradient-orange opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-card rounded-full p-6 h-80 flex flex-col justify-between">
                    <div>
                      <Badge variant="outline" className="border-primary/50 text-primary mb-4">
                        {item.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{item.instructor}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar size={14} className="text-primary" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={14} className="text-primary" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 p-0">
                        Join Discussion <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
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

export default DiscussSection;
