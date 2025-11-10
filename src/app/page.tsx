import type { Metadata } from 'next';
import Hero from './(home)/Hero';
import Meals from './(home)/Meals';

export const metadata: Metadata = {
  title: 'FoodWagen - meals on wheels...',
  description: 'Within a few clicks, find meals that are accessible near you'
};
export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Meals />
    </main>
  );
}
