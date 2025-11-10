import Link from 'next/link';
import Image from 'next/image';
import FoodwagenPNG from '@/app/assets/foodwagen.png';

export const Logo = () => {
  return (
    <Link href="/">
      <figure className="flex items-center space-x-2">
        <Image alt="foodwagen.png" src={FoodwagenPNG} className="h-7 w-7" />
        <p className="text-tango text-xl font-black">
          Food<span className="text-primary">Wagen</span>
        </p>
      </figure>
    </Link>
  );
};
