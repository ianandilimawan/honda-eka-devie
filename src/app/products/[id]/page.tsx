import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const allProducts = getProducts();
  const similarProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Sport':
        return { bg: 'bg-[#e31837]', text: 'text-white' };
      case 'Scooter':
        return { bg: 'bg-[#0066b1]', text: 'text-white' };
      case 'Matic':
        return { bg: 'bg-[#00a651]', text: 'text-white' };
      case 'Bebek':
        return { bg: 'bg-[#fdb813]', text: 'text-gray-900' };
      default:
        return { bg: 'bg-gray-600', text: 'text-white' };
    }
  };

  const categoryStyle = getCategoryStyle(product.category);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#e31837] transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#e31837] transition-colors">Produk</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 lg:p-8">
              <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-bold ${categoryStyle.bg} ${categoryStyle.text} mb-3`}>
                {product.category}
              </span>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              <p className="text-2xl lg:text-3xl font-bold text-[#e31837] mb-5">
                {formatPrice(product.price)}
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {product.description}
              </p>

              <div className="border-t border-b border-gray-100 py-5 mb-5">
                <h2 className="font-bold text-gray-900 mb-4 text-sm">Spesifikasi</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Mesin</p>
                    <p className="font-semibold text-gray-900 text-xs">{product.specs.engine}</p>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Power</p>
                    <p className="font-semibold text-gray-900 text-xs">{product.specs.power}</p>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Transmisi</p>
                    <p className="font-semibold text-gray-900 text-xs">{product.specs.transmission}</p>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Kapasitas Tangki</p>
                    <p className="font-semibold text-gray-900 text-xs">{product.specs.fuelCapacity}</p>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Berat</p>
                    <p className="font-semibold text-gray-900 text-xs">{product.specs.weight}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-bold text-gray-900 mb-3 text-sm">Fitur Utama</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4 text-[#00a651] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="https://wa.me/6282233060075?text=Halo%2C+saya+ingin+informasi+tentang+{product.name}"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#00a651] text-white font-bold rounded-xl hover:bg-[#008f45] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-[#e31837] rounded-full" />
              <h2 className="text-xl font-bold text-gray-900">Motor Serupa</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}