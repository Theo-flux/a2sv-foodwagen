'use client';
import { Separator } from '@/components/ui/separator';
import { IoMail } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

const footerSections = [
  {
    title: 'Company',
    links: [
      {
        title: 'About us',
        href: '#'
      },
      {
        title: 'Teams',
        href: '#'
      },
      {
        title: 'Careers',
        href: '#'
      },
      {
        title: 'Blog',
        href: '#'
      }
    ]
  },
  {
    title: 'Contact',
    links: [
      {
        title: 'Help & Support',
        href: '#'
      },
      {
        title: 'Partner with us',
        href: '#'
      },
      {
        title: 'Ride with us',
        href: '#'
      }
    ]
  },
  {
    title: 'Legal',
    links: [
      {
        title: 'Terms & Conditions',
        href: '#'
      },
      {
        title: 'Refund & Cancellation',
        href: '#'
      },
      {
        title: 'Privacy Policy',
        href: '#'
      },
      {
        title: 'Cookie Policy',
        href: '#'
      }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="flex flex-col bg-black text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-4 py-12 lg:flex-row xl:px-0">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-bold">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="hover:text-tango whitespace-nowrap text-white/80"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-96 flex-col space-y-8">
            <h6 className="text-silver font-black">FOLLOW US</h6>
            <div className="text-silver flex items-center justify-start space-x-4 text-lg">
              <FaInstagram className="cursor-pointer" />
              <FaFacebook className="cursor-pointer" />
              <FaTwitter className="cursor-pointer" />
            </div>
            <h6 className="text-silver font-semibold">Receive exclusive offers in your mailbox</h6>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col items-center gap-2 sm:flex-row"
            >
              <InputGroup className="h-11 border-none bg-[#424242]">
                <InputGroupAddon className="h-7 w-7">
                  <IoMail size={30} />
                </InputGroupAddon>
                <InputGroupInput placeholder="Enter Your email" />
              </InputGroup>
              <Button size="lg" className="h-11 w-full sm:w-fit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-tundora" />
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          <span className="text-muted-foreground">
            All rights reserved. &copy;{' '}
            <Link href="/" target="_blank">
              Your company, {new Date().getFullYear()}
            </Link>
          </span>

          <div className="text-muted-foreground flex items-center gap-2">
            <span>Made with 💛 by</span>
            <span className="font-black">Themewagon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
