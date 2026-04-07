import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts, getSiteContent } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const siteContent = getSiteContent();

  return (
    <div className="flex flex-col">
      <HeroCarousel />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Pilih Kategori Motor
            </h2>
            <p className="text-gray-600 text-sm">
              Temukan motor yang sesuai dengan kebutuhan dan gaya hidup Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Sport', icon: 'M', color: 'bg-[#e31837]', link: '/products?category=sport' },
              { name: 'Scooter', icon: 'S', color: 'bg-[#0066b1]', link: '/products?category=scooter' },
              { name: 'Matic', icon: 'M', color: 'bg-[#00a651]', link: '/products?category=matic' },
              { name: 'Bebek', icon: 'B', color: 'bg-[#fdb813]', link: '/products?category=bebek' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative overflow-hidden rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute top-0 left-0 w-16 h-16 rounded-br-full bg-gradient-to-br from-[#e31837]/10 to-transparent" />
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-lg">{category.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#e31837] transition-colors">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-[#e31837] rounded-full" />
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Motor Unggulan
                </h2>
                <p className="text-gray-500 text-sm">
                  Koleksi motor Honda terbaik dengan spesifikasi terkini
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-[#e31837] font-semibold hover:gap-3 transition-all text-sm"
            >
              Lihat Semua
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#e31837] font-semibold text-sm"
            >
              Lihat Semua Produk
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[#e31837] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-400 text-sm">Standar kualitas internasional Honda</p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[#e31837] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Harga Kompetitif</h3>
              <p className="text-gray-400 text-sm">Nilai terbaik untuk setiap model Honda</p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[#e31837] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Layanan Purna Jual</h3>
              <p className="text-gray-400 text-sm">Jaringan dealer & service center di seluruh Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Butuh Bantuan?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm">
            Hubungi kami untuk informasi lebih lanjut tentang produk dan layanan Honda
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white">
            <a
              href="https://wa.me/6282233060075"
              className="px-6 py-3 bg-[#00a651] text-white font-bold rounded-lg hover:bg-[#008f45] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
