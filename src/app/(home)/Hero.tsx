'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import Image from 'next/image';
import HeroImage from '@/app/assets/bowl-of-noodles.png';
import HeroShadow from '@/app/assets/Shadow.png';
import OrderCard from './OrderCard';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadedState = useEffectEvent(() => {
    setIsLoaded(true);
  });

  useEffect(() => {
    handleLoadedState();
  }, []);

  return (
    <section className="bg-primary h-[1000px] w-full overflow-y-hidden px-4 py-24 md:h-[725px] lg:h-[628px] xl:px-0">
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col lg:justify-center">
        <figure
          data-loaded={isLoaded}
          className="absolute right-0 -bottom-40 z-10 hidden translate-y-8 opacity-0 transition-all delay-300 duration-700 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 lg:block"
        >
          <Image alt="bowl-of-noddles.png" src={HeroImage} className="w-full" priority />
        </figure>

        <figure
          data-loaded={isLoaded}
          className="absolute -bottom-40 z-10 translate-y-8 opacity-0 transition-all delay-300 duration-700 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 sm:left-[50%] sm:-translate-x-[50%] lg:hidden"
        >
          <Image alt="bowl-of-noddles.png" src={HeroImage} className="w-full" priority />
        </figure>

        <figure
          data-loaded={isLoaded}
          className="absolute right-0 -bottom-40 hidden translate-y-8 opacity-0 mix-blend-multiply transition-all delay-500 duration-800 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 lg:block"
        >
          <Image alt="shadow.png" src={HeroShadow} className="w-full" priority />
        </figure>

        <figure
          data-loaded={isLoaded}
          className="absolute bottom-0 translate-y-8 opacity-0 mix-blend-multiply transition-all delay-500 duration-800 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 sm:left-[50%] sm:-translate-x-[50%] lg:hidden"
        >
          <Image alt="shadow.png" src={HeroShadow} className="w-full" priority />
        </figure>

        <div
          data-loaded={isLoaded}
          className="z-20 flex h-auto w-full translate-y-6 flex-col space-y-8 opacity-0 transition-all delay-100 duration-600 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 lg:max-w-[650px]"
        >
          <div className="w-full text-center lg:text-left">
            <h1 className="text-5xl leading-[1.2] font-black text-white md:text-6xl lg:text-7xl">
              Are you starving?
            </h1>
            <p
              data-loaded={isLoaded}
              className="mt-4 translate-y-4 text-white opacity-0 transition-all delay-700 duration-700 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100"
            >
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>

          <div
            data-loaded={isLoaded}
            className="translate-y-6 opacity-0 transition-all delay-900 duration-700 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100"
          >
            <OrderCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
