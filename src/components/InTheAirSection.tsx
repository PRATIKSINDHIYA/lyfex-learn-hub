import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const inTheAirItems = [
  {
    rank: 1,
    title: "Motion Graphics",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 2,
    title: "UX UI Design",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: false,
  },
  {
    rank: 3,
    title: "Full Stack Development",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 4,
    title: "Motion Graphics",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: false,
  },
];

export default function InTheAirSection() {
  return (
    <section className="py-12 sm:py-20 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-14 gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            In the <span className="text-orange">Air</span>
          </h2>

          <button className="btn-primary self-start hidden sm:inline-flex">
            View all
          </button>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="gap-6 sm:gap-8">
            {inTheAirItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 flex justify-center"
              >
                {/* OVAL CARD */}
                <div className="relative w-full max-w-[240px] sm:max-w-[260px] aspect-[2/3] rounded-[120px] sm:rounded-[140px] border border-orange/70 flex items-center justify-center card card-hover">

                  {/* INNER */}
                  <div className="w-[90%] aspect-[2/3] rounded-[100px] sm:rounded-[120px] bg-gradient-to-b from-[#4A2E24] via-[#5A3A2E] to-[#3A241C] flex flex-col items-center text-center px-4 sm:px-6">

                    {/* NUMBER */}
                    <div className="mt-4 sm:mt-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-500/80 text-white flex items-center justify-center text-lg sm:text-xl font-semibold shadow-lg">
                      {item.rank}
                    </div>

                    {/* CATEGORY */}
                    <span className="mt-3 sm:mt-4 px-3 py-1 rounded-full bg-orange/20 text-orange-300 text-xs sm:text-sm">
                      {item.category}
                    </span>

                    {/* TITLE */}
                    <h3 className="mt-4 sm:mt-6 text-foreground text-base sm:text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
                      {item.description}
                    </p>

                    {/* LIVE */}
                    {item.isLive && (
                      <span className="mt-auto mb-4 sm:mb-6 px-3 py-1 rounded-full bg-orange text-black text-xs sm:text-sm font-medium">
                        LIVE
                      </span>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* ARROWS */}
          <CarouselPrevious className="-left-6 sm:-left-10 bg-orange text-black hover:opacity-90" />
          <CarouselNext className="-right-6 sm:-right-10 bg-orange text-black hover:opacity-90" />
        </Carousel>
      </div>
    </section>
  );
}
