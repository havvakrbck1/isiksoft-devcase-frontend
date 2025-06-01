// src/components/Sidebar.js
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Disclosure, Transition, Fragment } from '@headlessui/react';
import {
  HomeIcon,
  ArchiveBoxIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  TagIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon, // EKLENDİ
  CircleStackIcon, // Categories için örnek, Figma'ya göre değiştir
  // TODO: Figma'daki TÜM ikonları buraya import et (Sales için ChartBarIcon, Orders için ShoppingCartIcon vb.)
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// TODO: Bu navigasyon yapısını Figma'daki menü hiyerarşisine göre TAMAMEN DOLDUR.
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  {
    name: 'Categories',
    icon: CircleStackIcon,
    href: '#', 
    children: [
      { name: 'All Products', href: '/', icon: Squares2X2Icon },
      { name: 'Add New Product', href: '/products/new', icon: PlusCircleIcon },
      { name: 'Tags', href: '/products/tags', icon: TagIcon },
      { name: 'Categories', href: '/products/categories', icon: CircleStackIcon },
      // ... Diğer alt menüler
    ],
  },
];

// TODO: Bu diziyi Figma'ya göre doldur VEYA kullanmayacaksan yorum satırına al/sil.
const analyticsNavigation = [
  // { name: 'Sales', href: '/analytics/sales', icon: ChartBarIcon, badge: '46' },
  // { name: 'Orders', href: '/analytics/orders', icon: ShoppingCartIcon, children: [/*...*/] },
];

// TODO: Bu diziyi Figma'ya göre doldur VEYA kullanmayacaksan yorum satırına al/sil.
const appsNavigation = [
  // { name: 'Chat', href: '/apps/chat', icon: ChatBubbleLeftEllipsisIcon, badge: '9+' },
];

const settingsNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Log Out', href: '/logout', icon: ArrowLeftOnRectangleIcon },
];

export default function Sidebar() {
  const router = useRouter();

  const isActive = (href, children = []) => {
    if (router.pathname === href) return true;
    return children.some(child => router.pathname === child.href || router.pathname.startsWith(child.href + '/'));
  };

  const renderNavItem = (item) => {
    const current = isActive(item.href, item.children);
    if (!item.children) {
      return (
        <li key={item.name}>
          <Link
            href={item.href || '#'}
            className={classNames(
              current
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              'group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md'
            )}
          >
            <div className="flex items-center">
              {item.icon && <item.icon // İkon varsa göster
                className={classNames(
                  current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-5 w-5'
                )}
                aria-hidden="true"
              />}
              {item.name}
            </div>
            {item.badge && (
              <span
                className={classNames(
                  current ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-600',
                  'ml-auto inline-block py-0.5 px-2 text-xs rounded-full'
                )}
              >
                {item.badge}
              </span>
            )}
          </Link>
        </li>
      );
    }

    return (
      <Disclosure as="li" key={item.name} defaultOpen={current}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                current
                  ? 'bg-blue-600 text-white' // Ana kategori aktifse mavi
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                'group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium'
              )}
            >
              <div className="flex items-center">
                {item.icon && <item.icon
                  className={classNames(
                    current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />}
                {item.name}
              </div>
              {open ? (
                <ChevronUpIcon className={classNames(current ? "text-white" : "text-gray-400 group-hover:text-gray-500", "ml-auto h-5 w-5 shrink-0")} />
              ) : (
                <ChevronDownIcon
                  className={classNames(current ? 'text-blue-200 group-hover:text-white' : 'text-gray-400 group-hover:text-gray-500',
                    'ml-auto h-5 w-5 shrink-0'
                  )}
                />
              )}
            </Disclosure.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel as="ul" className="mt-1 space-y-1 pl-5 pr-2 bg-gray-50 rounded-md py-1">
                {item.children.map((subItem) => {
                  const isSubActive = router.pathname === subItem.href;
                  return (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.href || '#'}
                        className={classNames(
                          isSubActive
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                          'group flex items-center rounded-md py-2 pl-4 pr-2 text-sm'
                        )}
                      >
                        {subItem.icon && (
                             <subItem.icon
                                className={classNames(
                                isSubActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-5 w-5'
                                )}
                                aria-hidden="true"
                             />
                        )}
                        {subItem.name}
                      </Link>
                    </li>
                  );
                })}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-3 pb-4 border-r border-gray-200 w-60">
    
    <div className="flex h-16 shrink-0 items-center justify-start ...">
      {/* <Image
        src="/logo-master-pos.svg" // Bu hata veriyordu
        alt="Master POS"
        width={32}
        height={32}
        className="mr-2"
      /> */}
      <span className="text-xl font-bold text-slate-800 dark:text-white">Master POS</span>
      </div>
      <div className="relative mt-4 mb-2 px-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
            type="search"
            name="sidebar-search"
            id="sidebar-search"
            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 bg-gray-100 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search here"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-5">
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-500 uppercase tracking-wider px-1">Main Menu</div>
            <ul className="mt-1 space-y-1">
              {navigation.map(renderNavItem)}
            </ul>
          </li>

          {analyticsNavigation && analyticsNavigation.length > 0 && (
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-500 uppercase tracking-wider px-1">Analytics</div>
              <ul className="mt-1 space-y-1">
                {analyticsNavigation.map(renderNavItem)}
              </ul>
            </li>
          )}
          
          {appsNavigation && appsNavigation.length > 0 && (
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-500 uppercase tracking-wider px-1">Apps</div>
              <ul className="mt-1 space-y-1">
                {appsNavigation.map(renderNavItem)}
              </ul>
            </li>
          )}

          <li className="mt-auto">
            <ul className="mt-1 space-y-1">
              {settingsNavigation.map(renderNavItem)}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}