import { useEffect, useState } from 'react';
import { PlusIcon, PencilSquareIcon, TrashIcon, TagIcon } from '@heroicons/react/20/solid';

const initialCategories = [
  { id: 1, name: 'Electronics', productCount: 120, description: 'Gadgets, devices, and more.' },
  { id: 2, name: 'Fashion', productCount: 350, description: 'Apparel, shoes, and accessories.' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
            Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your product categories
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add New Category
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow sm:rounded-lg">
        <div className="overflow-x-auto">
          {categories.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-300 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Category Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white hidden md:table-cell">Description</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Product Count</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-28">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-800 bg-white dark:bg-slate-800">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <TagIcon className="h-5 w-5 text-gray-400 dark:text-slate-500 mr-2 hidden sm:block" />
                        <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-400 max-w-xs truncate hidden md:table-cell">
                      {category.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-400">
                      {category.productCount}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-8 text-center text-gray-500 dark:text-gray-400">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}