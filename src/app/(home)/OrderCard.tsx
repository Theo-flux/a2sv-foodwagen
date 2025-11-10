'use client';
import { useEffect, useEffectEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Bike, CircleXIcon, Search, ShoppingBag } from 'lucide-react';

const OrderCard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get('name') as string;
  const [search, setSearch] = useState(name ?? '');

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (search) query.set('name', search);
    router.push(`?${query.toString()}`);
  };

  const handleClear = () => {
    setSearch('');
    const query = new URLSearchParams(params.toString());
    query.delete('name');
    router.push(query.toString() ? `?${query.toString()}` : '?');
  };

  const updateSearch = useEffectEvent((name: string) => {
    if (!name) {
      setSearch('');
    } else {
      setSearch(name);
    }
  });

  useEffect(() => {
    updateSearch(name);
  }, [name]);

  return (
    <section className="flex w-full flex-col space-y-8 rounded-lg bg-white p-4">
      <Tabs orientation="horizontal" defaultValue="delivery">
        <TabsList className="bg-background">
          <TabsTrigger value="delivery" className="justify-start px-3 py-1.5">
            <Bike className="h-5 w-5" /> Delivery
          </TabsTrigger>

          <TabsTrigger value="pickup" className="justify-start px-3 py-1.5">
            <ShoppingBag className="h-5 w-5" /> Pickup
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center gap-2 sm:flex-row"
      >
        <InputGroup className="h-11 border-none bg-[#F5F5F5]">
          <InputGroupAddon className="h-7 w-7">
            <Search size={30} />
          </InputGroupAddon>
          <InputGroupInput
            name="name"
            type="text"
            value={search}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setSearch(value);
            }}
            placeholder="What do you like to eat today?"
          />

          <InputGroupAddon
            data-show={search ? true : false}
            align="inline-end"
            onClick={handleClear}
            className="text-tango cursor-pointer data-[show=false]:hidden"
          >
            <CircleXIcon className="h-5 w-5" />
          </InputGroupAddon>
        </InputGroup>
        <Button size="lg" className="bg-tango h-11 w-full sm:w-fit" onClick={handleSearch}>
          <Search />
          Find Meal
        </Button>
      </form>
    </section>
  );
};

export default OrderCard;
