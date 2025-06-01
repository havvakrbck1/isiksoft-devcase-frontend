import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100 dark:bg-slate-700';
  let textColor = 'text-gray-700 dark:text-slate-200';
  let ringColor = 'ring-gray-300 dark:ring-slate-600';
  const statusString = typeof status === 'string' ? status : String(status || 'Unknown').trim();
  const lowerStatus = statusString.toLowerCase();
   if (lowerStatus === 'published' || lowerStatus === 'completed') {
    bgColor = 'bg-green-100 dark:bg-green-700/20';
    textColor = 'text-green-700 dark:text-green-300';
    ringColor = 'ring-green-600/20 dark:ring-green-600/30';
  } else if (lowerStatus === 'pending') {
    bgColor = 'bg-yellow-100 dark:bg-yellow-600/20';
    textColor = 'text-yellow-700 dark:text-yellow-300';
    ringColor = 'ring-yellow-600/20 dark:ring-yellow-500/30';
  } else if (['archived', 'canceled', 'draft'].includes(lowerStatus)) {
    bgColor = 'bg-red-100 dark:bg-red-600/20';
    textColor = 'text-red-700 dark:text-red-300';
    ringColor = 'ring-red-600/20 dark:ring-red-500/30';
  } else if (lowerStatus === 'scheduled') {
    bgColor = 'bg-blue-50 dark:bg-blue-400/10';
    textColor = 'text-blue-700 dark:text-blue-400';
    ringColor = 'ring-blue-600/20 dark:ring-blue-400/20';
  } else if (lowerStatus === 'unknown' && statusString === 'Unknown')

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        bgColor,
        textColor,
        ringColor
      )}
    >
      {statusString ? statusString.charAt(0).toUpperCase() + statusString.slice(1) : 'N/A'}
    </span>
  );
};

export default function ProductTable({ products, onProductSelect, selectedProductIds }) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="relative">
            {/* 
            {selectedProductIds && selectedProductIds.length > 0 && (
              <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white dark:bg-slate-800 sm:left-12">
                <button type="button" className="...">Bulk Action 1</button>
                <button type="button" className="...">Bulk Action 2</button>
              </div>
            )}
            */}
            <table className="min-w-full table-fixed divide-y divide-gray-300 dark:divide-slate-700">
              <thead>
                <tr>
                  <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-600 dark:checked:bg-blue-600"
                      // onChange={handleSelectAll}
                      // checked={selectedProductIds.length === products.length && products.length > 0}
                      // indeterminate={selectedProductIds.length > 0 && selectedProductIds.length < products.length}
                    />
                  </th>
                  <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Transaction ID</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-16">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {products.map((product) => {
                  const isSelected = selectedProductIds && selectedProductIds.includes(product.id);
                  return (
                    <tr key={product.id} className={isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : undefined}>
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        {isSelected && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-600 dark:checked:bg-blue-600"
                          checked={isSelected || false}
                          onChange={(e) => onProductSelect(product.id, e.target.checked)}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-md object-cover bg-gray-200 dark:bg-slate-700"
                              src={product.thumbnail || "https://via.placeholder.com/40x40/e2e8f0/94a3b8?text=N/A"}
                              alt={product.name || 'Product'}
                              width={40}
                              height={40}
                              onError={(e) => { e.target.src = "https://via.placeholder.com/40x40/f8fafc/cbd5e1?text=Err"; }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{product.name || 'N/A'}</div>
                            <div className="mt-1 text-gray-500 dark:text-slate-400 text-xs truncate max-w-[200px]">{product.category?.name || 'Uncategorized'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-400">{product.sku || `TR-00${product.id}`}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-400">
                        {product.created_at ? new Date(product.created_at).toLocaleDateString('tr-TR') : 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white font-medium">
                        ${parseFloat(product.price || 0).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <StatusBadge status={product.status || 'Published'} />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                        <Menu as="div" className="relative inline-block text-left">
                          <div>
                            <Menu.Button className="p-1 rounded-full text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                              <span className="sr-only">Open options</span>
                              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a href="#" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200')}>
                                    <EyeIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                                    View
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a href="#" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200')}>
                                    <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                                    Edit
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a href="#" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'group flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300')}>
                                    <TrashIcon className="mr-3 h-5 w-5 text-red-400 dark:text-red-500" />
                                    Delete
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
