// src/components/StatCard.js
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function StatCard({ name, stat, change }) { // IconComponent prop'u kaldırıldı
  const isIncrease = change ? change.startsWith('+') : false;
  const isDecrease = change ? change.startsWith('-') : false;

  return (
    <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 px-4 py-5 shadow-sm sm:p-6"> {/* shadow-sm veya Figma'daki gölge */}
      {/* İkonlu kutucuk bölümü tamamen kaldırıldı */}
      <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
        {name}
      </dt>
      <dd className="mt-1 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat}</p>
        {change && (
          <p
            className={classNames(
              isIncrease ? 'text-green-600 dark:text-green-400' : '',
              isDecrease ? 'text-red-600 dark:text-red-400' : '',
              'ml-2 flex items-baseline text-sm font-semibold'
            )}
          >
            {isIncrease && <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />}
            {isDecrease && <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />}
            <span className="sr-only"> {isIncrease ? 'Increased' : 'Decreased'} by </span>
            {change.replace(/[+%]/g, '')}
            <span className="ml-0.5 text-xs font-medium">%</span>
          </p>
        )}
      </dd>
    </div>
  );
}