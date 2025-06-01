
import { Fragment } from 'react'; 
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react'; 
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon, 
  GlobeAltIcon, 
  AdjustmentsHorizontalIcon, 
} from '@heroicons/react/24/outline';
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ onMobileMenuToggle, currentTheme, onToggleTheme }) {
  
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

   return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none" // Sadece lg altında göster
              onClick={onMobileMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex items-center ml-2 lg:hidden"> 
              <Image
                src="/logo-master-pos.svg"
                alt="Master POS"
                width={28}
                height={28}
                className="mr-1.5"
              />
              <span className="text-lg font-bold text-gray-800 dark:text-white hidden sm:inline">Master POS</span> {/* sm ve üzerinde metni göster */}
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-2 md:space-x-3"> 
            <div className="hidden md:block"> 
              <button
                onClick={onToggleTheme}
                type="button"
                className="rounded-full p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label="Toggle theme"
              >
                {currentTheme === 'dark' ? (
                  <SunIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-2"> 
              <button type="button" className="rounded-full p-1.5 ..."><GlobeAltIcon className="h-5 w-5" /></button>
              <button type="button" className="relative rounded-full p-1.5 ...">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 ...">12</span>
              </button>
              <button type="button" className="rounded-full p-1.5 ..."><ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" /></button>
              <button type="button" className="rounded-full p-1.5 ..."><AdjustmentsHorizontalIcon className="h-5 w-5" /></button>
              <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" /> 
            </div>

            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full text-sm ...">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 dark:bg-gray-600">
                    <span className="text-sm font-medium leading-none text-white">PP</span>
                  </span>
                  <div className="ml-2 hidden md:flex md:flex-col md:items-start">
                  </div>
                </Menu.Button>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}