import Image from 'next/image';
import HeroImage from '@/app/assets/bowl-of-noodles.png';
import HeroShadow from '@/app/assets/Shadow.png';
import OrderCard from './OrderCard';

const Hero = () => {
  return (
    <section className="bg-primary h-[1000px] w-full overflow-y-hidden px-4 py-24 md:h-[725px] lg:h-[628px] xl:px-0">
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col lg:justify-center">
        <figure className="absolute right-0 -bottom-40 z-10 hidden lg:block">
          <Image alt="bowl-of-noddles.png" src={HeroImage} className="w-full" />
        </figure>
        <figure className="absolute -bottom-40 z-10 sm:left-[50%] sm:-translate-x-[50%] lg:hidden">
          <Image alt="bowl-of-noddles.png" src={HeroImage} className="w-full" />
        </figure>
        <figure className="absolute right-0 -bottom-40 hidden mix-blend-multiply lg:block">
          <Image alt="shadow.png" src={HeroShadow} className="w-full" />
        </figure>
        <figure className="absolute bottom-0 mix-blend-multiply sm:left-[50%] sm:-translate-x-[50%] lg:hidden">
          <Image alt="shadow.png" src={HeroShadow} className="w-full" />
        </figure>
        <div className="z-20 flex h-auto w-full flex-col space-y-8 lg:max-w-[650px]">
          <div className="w-full text-center lg:text-left">
            <h1 className="text-5xl leading-[1.2] font-black text-white md:text-6xl lg:text-7xl">
              Are you starving?
            </h1>
            <p className="text-white">
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>
          <OrderCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
