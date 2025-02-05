// Slide.js
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '../ui/card';
import BoxSearch from '../search/BoxSearch';

const images = [
    {
        id: 1,
        url: "https://i.pinimg.com/originals/95/29/91/952991594aa478fa2232553e4eb8757d.jpg"
    },
    {
        id: 2,
        url: "https://wallpaperboat.com/wp-content/uploads/2020/10/23/57974/real-estate-10.jpg"
    },
    {
        id: 3,
        url: "https://wallpaperboat.com/wp-content/uploads/2020/10/23/57974/real-estate-10.jpg"
    }
];

const Slide = () => {
    return (
        <div className='w-full h-96 relative overflow-hidden'>
            <Carousel className='w-full h-96'>
                <CarouselContent className='w-full h-96 flex'>
                    {images.map(image => (
                        <CarouselItem key={image.id} className="w-screen h-full relative">
                            <img src={image.url} alt="image" className="w-full h-full object-cover" />
                            <BoxSearch />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30" />
                <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30" />
            </Carousel>
        </div>
    );
};

export default Slide;
