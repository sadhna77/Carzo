import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Cardata from "../../../Data/Cardata";
import { Card, CardContent } from "@/components/ui/card";
import { TrendCar } from "./TrendCAr";

export const MostSearch = () => {
  return (
    <div className="mt-20 font-winky flex items-center flex-col pb-20">
      <h1 className="text-center text-3xl font-winky font-bold mb-10 text-[#363cb7]">
        Most Trending Cars
      </h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-6xl mx-auto px-4"

      >
        <CarouselContent>
          {Cardata.carFake.map((car, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/4">
              <div className="p-1">
                
                  <CardContent className='w-70 h-90 ' >
                    <TrendCar data={car} />
                  </CardContent>
                
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
