import { useState, Fragment, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') { 
      return 'dark'; 
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
             <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
             <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
               <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                 <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                   <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                     <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                       <span className="sr-only">Close sidebar</span>
                       <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                     </button>
                   </div>
                 </Transition.Child>
                 <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-slate-900 ring-1 ring-white/10 w-60">
                    <Sidebar /> 
                 </div>
               </Dialog.Panel>
             </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden md:fixed md:inset-y-0 md:z-40 md:flex md:w-60 md:flex-col">
        <Sidebar /> 
      </div>

      <div className="md:pl-60 flex flex-col flex-1 min-h-screen">
        <Header
          onMobileMenuToggle={() => setSidebarOpen(true)}
          currentTheme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="flex-1 py-4 md:py-6 px-4 md:px-6 bg-gray-50 dark:bg-slate-950 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}