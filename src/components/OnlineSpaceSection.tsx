import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face",
];

const OnlineSpaceSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          In the <span className="gradient-orange-text">Online Space</span>
        </h2>

        <Carousel opts={{ align: "center", loop: true }} className="w-full max-w-4xl mx-auto">
          <CarouselContent className="-ml-4">
            {avatars.map((avatar, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div 
                  className="relative group"
                  style={{
                    transform: `perspective(1000px) rotateY(${(index - 3) * 10}deg)`,
                  }}
                >
                  <div className="p-[3px] rounded-full gradient-orange opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-background">
                      <img
                        src={avatar}
                        alt={`User ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-primary text-primary-foreground hover:bg-primary/90" />
          <CarouselNext className="hidden md:flex -right-12 bg-primary text-primary-foreground hover:bg-primary/90" />
        </Carousel>

        <p className="text-center text-muted-foreground mt-8">
          Join <span className="text-primary font-semibold">2,547</span> learners online right now
        </p>
      </div>
    </section>
  );
};

export default OnlineSpaceSection;
