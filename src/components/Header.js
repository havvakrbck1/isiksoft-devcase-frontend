// src/components/Header.js
import { Fragment } from 'react'; // Headless UI Menu için gerekebilir
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react'; // Kullanıcı dropdown için
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon, // Mesaj ikonu için örnek
  GlobeAltIcon, // Dil ikonu için örnek
  AdjustmentsHorizontalIcon, // Ayar/Filtre ikonu için örnek
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
  // Kullanıcı menüsü için örnek item'lar
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

   return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Sol Taraf - Mobil Menü Butonu ve Tablet/Mobil Logo */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none" // Sadece lg altında göster
              onClick={onMobileMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Mobil ve Tablet için Header'da Logo (Figma'da var) */}
            <div className="flex items-center ml-2 lg:hidden"> {/* lg ve üzerinde Sidebar'da olduğu için gizle */}
              <Image
                src="/logo-master-pos.svg"
                alt="Master POS"
                width={28} // Biraz daha küçük olabilir
                height={28}
                className="mr-1.5"
              />
              <span className="text-lg font-bold text-gray-800 dark:text-white hidden sm:inline">Master POS</span> {/* sm ve üzerinde metni göster */}
            </div>
          </div>

          {/* Sağ Taraf - İkonlar ve Kullanıcı Menüsü */}
          {/* Bu bölüm mobilde tamamen, tablette kısmen gizlenecek */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2 md:space-x-3"> {/* Mobilde gizli, sm ve üzerinde görünür */}
            {/* Tema Değiştirme (Tablette var, mobilde yok gibi) */}
            <div className="hidden md:block"> {/* md (tablet) ve üzerinde göster */}
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

            {/* Dil, Bildirim, Mesaj, Ayar İkonları (Tablette yok, sadece desktop'ta var gibi duruyor Figma'da) */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2"> {/* Sadece lg (desktop) üzerinde göster */}
              <button type="button" className="rounded-full p-1.5 ..."><GlobeAltIcon className="h-5 w-5" /></button>
              <button type="button" className="relative rounded-full p-1.5 ...">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 ...">12</span>
              </button>
              <button type="button" className="rounded-full p-1.5 ..."><ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" /></button>
              <button type="button" className="rounded-full p-1.5 ..."><AdjustmentsHorizontalIcon className="h-5 w-5" /></button>
              <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" /> {/* Ayırıcı çizgi */}
            </div>

            {/* Kullanıcı Menüsü (Tablette var, mobilde yok) */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full text-sm ...">
                  {/* <Image className="h-8 w-8 rounded-full bg-gray-300" src={"/placeholder-avatar.png"} alt="User avatar" width={32} height={32}/> */}
                  {/* Avatar yerine basit bir ikon veya harf konulabilir */}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 dark:bg-gray-600">
                    <span className="text-sm font-medium leading-none text-white">PP</span> {/* Patricia Peter'ın baş harfleri */}
                  </span>
                  <div className="ml-2 hidden md:flex md:flex-col md:items-start">
                    {/* ... (kullanıcı adı ve rolü) ... */}
                  </div>
                  {/* ... */}
                </Menu.Button>
              </div>
              {/* ... (Transition ve Menu.Items aynı) ... */}
            </Menu>
          </div>
          {/* Mobil için sadece hamburger menü (zaten solda) */}
        </div>
      </div>
    </header>
  );
}