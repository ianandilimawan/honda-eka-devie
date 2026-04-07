'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
        return { bg: 'bg-[#fdb813]', text: 'text-gray-800' };
      default:
        return { bg: 'bg-gray-600', text: 'text-white' };
    }
  };

  const categoryStyle = getCategoryStyle(product.category);

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${categoryStyle.bg} ${categoryStyle.text}`}>
            {product.category}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#e31837] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="space-y-1 mb-3">
            <p className="text-xs text-gray-500">
              <span className="font-medium">Mesin:</span> {product.specs.engine}
            </p>
          </div>

          <p className="font-bold text-lg text-[#e31837]">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}