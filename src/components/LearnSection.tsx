import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const learnItems = [
  {
    title: "Mastering Figma Basics",
    instructor: "Lisa Wang",
    episodes: 12,
    category: "Graphics",
    gradient: "from-orange-500 to-amber-400",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop",
  },
  {
    title: "Python for Beginners",
    instructor: "John Smith",
    episodes: 24,
    category: "Coding",
    gradient: "from-amber-400 to-yellow-300",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
  },
  {
    title: "Marketing Fundamentals",
    instructor: "Emily Davis",
    episodes: 8,
    category: "Business",
    gradient: "from-orange-600 to-orange-400",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    title: "Photography Essentials",
    instructor: "Mark Thompson",
    episodes: 16,
    category: "Arts",
    gradient: "from-yellow-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
  },
];

const LearnSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="gradient-orange text-primary-foreground border-none">
            📍 LEARN
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Learn Casually, <span className="gradient-orange-text">one sip at a time</span>
        </h2>
        <p className="text-muted-foreground mb-8">Bite-sized learning for busy minds</p>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {learnItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-60`} />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                        {item.instructor}
                      </div>
                      <Badge variant="outline" className="border-white/50 text-white bg-white/10">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <div>
                      <Badge className="bg-white/20 text-white border-none mb-3">
                        {item.episodes} Episodes
                      </Badge>
                      <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                        {item.title}
                      </h3>
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

export default LearnSection;
