'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getProducts,
  getSiteContent,
  saveProduct,
  deleteProduct,
  generateId,
  generateSlug,
  updateSiteContent,
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  getAllCarouselSlides,
  saveCarouselSlide,
  deleteCarouselSlide
} from '@/lib/data';
import { Product, SiteContent } from '@/types';

const ADMIN_PASSWORD = 'hondaadmin123';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
}

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  category: string;
  active: boolean;
}

const AUTH_EXPIRY_HOURS = 2;

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'carousel' | 'content'>('products');
  const [isEditing, setIsEditing] = useState<Product | BlogPost | CarouselSlide | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const loadData = useCallback(() => {
    setProducts(getProducts());
    setBlogPosts(getBlogPosts());
    setCarouselSlides(getAllCarouselSlides());
    setSiteContent(getSiteContent());
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem('admin_auth');
    if (storedAuth) {
      try {
        const { expiry } = JSON.parse(storedAuth);
        if (new Date(expiry) > new Date()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_auth');
        }
      } catch {
        localStorage.removeItem('admin_auth');
      }
    }
    loadData();
    setIsLoading(false);
  }, [loadData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      const expiry = new Date(Date.now() + AUTH_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();
      localStorage.setItem('admin_auth', JSON.stringify({ expiry }));
      setIsAuthenticated(true);
    } else {
      alert('Password salah!');
    }
  };

  const handleSaveProduct = (product: Product) => {
    const productToSave = {
      ...product,
      id: product.id || generateId(),
    };
    saveProduct(productToSave);
    loadData();
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus motor ini?')) {
      deleteProduct(id);
      loadData();
    }
  };

  const handleSaveBlogPost = (post: BlogPost) => {
    const postToSave = {
      ...post,
      id: post.id || generateId(),
      slug: post.slug || generateSlug(post.title),
      date: post.date || new Date().toISOString().split('T')[0],
    };
    saveBlogPost(postToSave);
    loadData();
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleDeleteBlogPost = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      deleteBlogPost(id);
      loadData();
    }
  };

  const handleSaveCarouselSlide = (slide: CarouselSlide) => {
    const slideToSave = {
      ...slide,
      id: slide.id || generateId(),
    };
    saveCarouselSlide(slideToSave);
    loadData();
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleDeleteCarouselSlide = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus slide ini?')) {
      deleteCarouselSlide(id);
      loadData();
    }
  };

  const handleSaveSiteContent = (content: SiteContent) => {
    updateSiteContent(content);
    setSiteContent(content);
    alert('Konten berhasil disimpan!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e31837]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <img
              src="https://www.astra-honda.com/assets/images/logo/honda.svg"
              alt="Honda"
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500">Masukkan password untuk mengakses</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-[#e31837]"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#e31837] text-white font-bold rounded-xl hover:bg-[#c41230] transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-500">Kelola konten e-catalog</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
              setPassword('');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-bold transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'text-[#e31837] border-b-2 border-[#e31837]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Produk
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-4 font-bold transition-colors whitespace-nowrap ${
                activeTab === 'blog'
                  ? 'text-[#e31837] border-b-2 border-[#e31837]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('carousel')}
              className={`px-6 py-4 font-bold transition-colors whitespace-nowrap ${
                activeTab === 'carousel'
                  ? 'text-[#e31837] border-b-2 border-[#e31837]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Carousel
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-4 font-bold transition-colors whitespace-nowrap ${
                activeTab === 'content'
                  ? 'text-[#e31837] border-b-2 border-[#e31837]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Konten Situs
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Daftar Produk</h2>
              <button
                onClick={() => {
                  setIsEditing(null);
                  setIsAdding(true);
                }}
                className="px-4 py-2 bg-[#e31837] text-white font-bold rounded-lg hover:bg-[#c41230] transition-colors"
              >
                + Tambah Produk
              </button>
            </div>

            {(isEditing || isAdding) && activeTab === 'products' && (
              <ProductForm
                product={isEditing as Product | null}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setIsEditing(null);
                  setIsAdding(false);
                }}
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Gambar</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Nama</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Harga</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{product.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditing(product)}
                            className="px-3 py-1 text-sm text-[#0066b1] hover:underline font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-3 py-1 text-sm text-[#e31837] hover:underline font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Daftar Artikel Blog</h2>
              <button
                onClick={() => {
                  setIsEditing(null);
                  setIsAdding(true);
                }}
                className="px-4 py-2 bg-[#e31837] text-white font-bold rounded-lg hover:bg-[#c41230] transition-colors"
              >
                + Tambah Artikel
              </button>
            </div>

            {(isEditing || isAdding) && activeTab === 'blog' && (
              <BlogForm
                post={isEditing as BlogPost | null}
                onSave={handleSaveBlogPost}
                onCancel={() => {
                  setIsEditing(null);
                  setIsAdding(false);
                }}
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Gambar</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Judul</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={64}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900 line-clamp-1">{post.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(post.date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditing(post)}
                            className="px-3 py-1 text-sm text-[#0066b1] hover:underline font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="px-3 py-1 text-sm text-[#e31837] hover:underline font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'carousel' && (
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Kelola Carousel Hero</h2>
              <button
                onClick={() => {
                  setIsEditing(null);
                  setIsAdding(true);
                }}
                className="px-4 py-2 bg-[#e31837] text-white font-bold rounded-lg hover:bg-[#c41230] transition-colors"
              >
                + Tambah Slide
              </button>
            </div>

            {(isEditing || isAdding) && activeTab === 'carousel' && (
              <CarouselForm
                slide={isEditing as CarouselSlide | null}
                onSave={handleSaveCarouselSlide}
                onCancel={() => {
                  setIsEditing(null);
                  setIsAdding(false);
                }}
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Gambar</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Judul</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {carouselSlides.map((slide) => (
                    <tr key={slide.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            width={96}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="font-semibold text-gray-900">{slide.title}</span>
                          <p className="text-sm text-gray-500">{slide.subtitle}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          {slide.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${slide.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {slide.active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditing(slide)}
                            className="px-3 py-1 text-sm text-[#0066b1] hover:underline font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCarouselSlide(slide.id)}
                            className="px-3 py-1 text-sm text-[#e31837] hover:underline font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'content' && siteContent && (
          <ContentForm
            content={siteContent}
            onSave={handleSaveSiteContent}
          />
        )}
      </div>
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: product?.id || '',
    name: product?.name || '',
    category: product?.category || 'Sport',
    price: product?.price || 0,
    image: product?.image || '',
    description: product?.description || '',
    specs: product?.specs || {
      engine: '',
      power: '',
      transmission: '',
      fuelCapacity: '',
      weight: '',
    },
    features: product?.features || [],
    isFeatured: product?.isFeatured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Motor</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            >
              <option value="Sport">Sport</option>
              <option value="Scooter">Scooter</option>
              <option value="Matic">Matic</option>
              <option value="Bebek">Bebek</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/gambar.jpg"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Upload gambar ke image hosting, lalu paste URL-nya di sini</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mesin</label>
            <input
              type="text"
              value={formData.specs?.engine}
              onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs!, engine: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Power</label>
            <input
              type="text"
              value={formData.specs?.power}
              onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs!, power: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmisi</label>
            <input
              type="text"
              value={formData.specs?.transmission}
              onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs!, transmission: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas Tangki</label>
            <input
              type="text"
              value={formData.specs?.fuelCapacity}
              onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs!, fuelCapacity: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Berat</label>
            <input
              type="text"
              value={formData.specs?.weight}
              onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs!, weight: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-[#e31837] border-gray-300 rounded focus:ring-[#e31837]"
              />
              <span className="text-sm text-gray-600">Tampilkan di halaman utama</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fitur (pisahkan dengan baris baru)</label>
          <textarea
            value={formData.features?.join('\n')}
            onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
            rows={4}
            placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#e31837] text-white font-medium rounded-lg hover:bg-[#c41230]"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

function BlogForm({
  post,
  onSave,
  onCancel,
}: {
  post?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    author: post?.author || 'Devie Honda',
    date: post?.date || new Date().toISOString().split('T')[0],
    category: post?.category || 'Tips',
    featured: post?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as BlogPost);
  };

  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            >
              <option value="Tips">Tips</option>
              <option value="Review">Review</option>
              <option value="Berita">Berita</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/gambar.jpg"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Upload gambar ke image hosting, lalu paste URL-nya di sini</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Ringkasan)</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Konten Artikel</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Gunakan ## untuk heading, ### untuk subheading, - untuk list</p>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-[#e31837] border-gray-300 rounded focus:ring-[#e31837]"
              />
              <span className="text-sm text-gray-600">Tampilkan di artikel pilihan</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#e31837] text-white font-medium rounded-lg hover:bg-[#c41230]"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

function CarouselForm({
  slide,
  onSave,
  onCancel,
}: {
  slide?: CarouselSlide | null;
  onSave: (slide: CarouselSlide) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<CarouselSlide>>({
    id: slide?.id || '',
    image: slide?.image || '',
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    cta: slide?.cta || 'Lihat Produk',
    link: slide?.link || '/products',
    category: slide?.category || 'Sport',
    active: slide?.active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as CarouselSlide);
  };

  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjudul</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
            >
              <option value="Sport">Sport</option>
              <option value="Scooter">Scooter</option>
              <option value="Matic">Matic</option>
              <option value="Bebek">Bebek</option>
              <option value="Promo">Promo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teks Tombol (CTA)</label>
            <input
              type="text"
              value={formData.cta}
              onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link Tujuan</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="/products atau /products?category=sport"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/gambar.jpg"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Gunakan gambar landscape (16:9) dengan resolusi tinggi</p>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-[#e31837] border-gray-300 rounded focus:ring-[#e31837]"
              />
              <span className="text-sm text-gray-600">Tampilkan di carousel</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#e31837] text-white font-medium rounded-lg hover:bg-[#c41230]"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

function ContentForm({
  content,
  onSave,
}: {
  content: SiteContent;
  onSave: (content: SiteContent) => void;
}) {
  const [formData, setFormData] = useState<SiteContent>(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Kelola Konten Situs</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
              <input
                type="text"
                value={formData.hero.title}
                onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, title: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subjudul</label>
              <input
                type="text"
                value={formData.hero.subtitle}
                onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Footer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.footer.contactEmail}
                onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, contactEmail: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
              <input
                type="text"
                value={formData.footer.contactPhone}
                onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, contactPhone: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
              <input
                type="text"
                value={formData.footer.address}
                onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, address: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e31837]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-[#e31837] text-white font-medium rounded-lg hover:bg-[#c41230]"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
