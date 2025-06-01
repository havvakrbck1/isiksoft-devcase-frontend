// src/pages/index.js
import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import ProductTable from '../components/ProductTable';
import Pagination from '../components/Pagination';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'; // Figma'ya göre gerekirse başka ikonlar eklenebilir

// StatCard'lar için örnek veriler (Figma'daki değerlere göre güncellenmeli)
// Figma'da StatCard'larda ikon olmadığı için IconComponent kaldırıldı.
const stats = [
  { name: 'Active Products', stat: '247,384', change: '+15%' },
  { name: 'New Products', stat: '+2,368', change: '+2%' },
  { name: 'Completed Order', stat: '33,847', change: '-4.5%' },
  { name: 'Pending Payment', stat: '1,284', change: '+5%' },
  { name: 'Canceled Order', stat: '836', change: '-2%' },
];

export default function ProductsPage() {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState([]); // Checkbox seçimi için

  useEffect(() => {
    async function fetchData(pageToFetch) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://devcase.isiksoftyazilim.com/api/products?page=${pageToFetch}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductsData(data);
        // API'den gelen mevcut sayfayı kullanmak daha doğru olabilir
        // setCurrentPage(data.meta.current_page);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch products:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (productsData?.meta?.last_page || 1) && newPage !== productsData?.meta?.current_page) {
      setCurrentPage(newPage);
      setSelectedProductIds([]); // Sayfa değişince seçimleri sıfırla
    }
  };

  const handleProductSelect = (productId, isChecked) => {
    setSelectedProductIds((prevSelectedIds) =>
      isChecked
        ? [...prevSelectedIds, productId]
        : prevSelectedIds.filter((id) => id !== productId)
    );
  };

  // TODO: handleSelectAll fonksiyonu (tüm ürünleri seç/bırak) eklenecek ve ProductTable'a prop olarak geçilecek.

  // --- Render Kontrolleri ---
  if (loading && !productsData) { // Sadece ilk yüklemede tam ekran loading
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-theme(space.16))] p-4">
        <p className="text-xl text-gray-600 dark:text-gray-300">Products Loading...</p>
        {/* Gelişmiş bir spinner eklenebilir */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-theme(space.16))] text-center p-4">
        <p className="text-xl text-red-500 font-semibold">Error Loading Products</p>
        <p className="text-md text-red-400 mt-1">{error}</p>
        <button 
          onClick={() => {setCurrentPage(1); fetchData(1);}} // fetchData'yı da çağırabiliriz veya sadece reload
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!productsData || !productsData.data) { 
    // Bu durum genellikle error tarafından yakalanır ama bir güvenlik önlemi
    return ( 
      <div className="flex justify-center items-center min-h-[calc(100vh-theme(space.16))] p-4">
        <p className="text-xl text-gray-500 dark:text-gray-400">No product data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 sm:space-y-8"> {/* Ana container için padding ve dikey boşluk */}
      {/* Sayfa Başlığı */}
      <div> {/* Ekstra sarmalayıcı div, mb-6 yerine space-y kullanıldığı için */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
          Products
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your products
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"> {/* Figma'ya göre gap ve responsive cols */}
        {stats.map((item) => (
          <StatCard
            key={item.name}
            name={item.name}
            stat={item.stat}
            change={item.change}
          />
        ))}
      </div>
      
      {/* All Products Bölümü */}
      <div className="bg-white dark:bg-slate-800 shadow-md sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4 sm:gap-x-6">
            <h2 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white whitespace-nowrap"> 
              All Products
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap w-full sm:w-auto"> {/* Mobil için w-full, sm üzeri için auto */}
              <div className="relative w-full sm:w-auto flex-grow sm:flex-grow-0 order-2 sm:order-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  name="search-products"
                  id="search-products"
                  className="block w-full min-w-[200px] sm:min-w-[250px] rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700/50 ring-1 ring-inset ring-gray-300 dark:ring-slate-600 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search item, transaction ID..."
                  // TODO: Arama işlevselliği için onChange ve state eklenecek
                />
              </div>
              {/* TODO: Figma'daki filtre/sıralama ikonları ve butonları buraya eklenecek */}
              <button
                type="button"
                className="inline-flex order-1 sm:order-2 items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap"
                // TODO: onClick ile yeni ürün ekleme modalı/sayfası
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Add New Product
              </button>
            </div>
          </div>
        </div>
        
        {/* Ürün Tablosu ve Yükleme/Boş Durum */}
        {/* Sayfa değiştirirken loading gösterimi */}
        {loading && productsData?.data?.length > 0 && (
             <div className="relative opacity-70"> {/* Hali hazırda veri varken yükleme için hafif transparanlık */}
               <ProductTable
                 products={productsData.data}
                 onProductSelect={handleProductSelect}
                 selectedProductIds={selectedProductIds}
               />
               <div className="absolute inset-0 bg-white/30 dark:bg-slate-800/30 flex items-center justify-center backdrop-blur-sm">
                 <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               </div>
             </div>
        )}

        {!loading && productsData?.data?.length > 0 && (
          <ProductTable
            products={productsData.data}
            onProductSelect={handleProductSelect}
            selectedProductIds={selectedProductIds}
          />
        )}

        {!loading && productsData?.data?.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16 px-4"> {/* Daha fazla padding */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.001c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">No Products Found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">There are no products matching your current page or filters.</p>
          </div>
        )}

        {/* Sayfalama */}
        {productsData?.meta && productsData.meta.last_page > 1 && (
          <div className="border-t border-gray-200 dark:border-slate-700">
            <Pagination
              currentPage={productsData.meta.current_page}
              totalPages={productsData.meta.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
         {productsData?.meta && (
             <div className="px-4 py-3 sm:px-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 hidden md:block bg-gray-50 dark:bg-slate-800/50 rounded-b-lg"> {/* Arka plan ve border eklendi, sadece md üstü */}
                Showing {productsData.meta.from || 0} to {productsData.meta.to || 0} of {productsData.meta.total || 0} results
             </div>
         )}
      </div>

      {/* Mobil ve Tablet Product List Alternatifi (Şimdilik yorumda, Figma'ya göre yapılacak) */}
      {/* 
      <div className="md:hidden mt-6">
          <p className="text-center text-gray-600 dark:text-gray-400">Product table is best viewed on larger screens.</p>
      </div> 
      */}
    </div>
  );
}