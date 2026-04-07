import { Product, SiteContent } from '@/types';
import data from '@/data/products.json';
import blogData from '@/data/blog.json';
import carouselData from '@/data/carousel.json';

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

interface BlogData {
  posts: BlogPost[];
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

interface CarouselData {
  slides: CarouselSlide[];
}

let productsData: { products: Product[]; siteContent: SiteContent } = {
  products: data.products as Product[],
  siteContent: data.siteContent as SiteContent
};

let blogPostsData: BlogData = {
  posts: blogData.posts as BlogPost[]
};

let carouselSlidesData: CarouselData = {
  slides: carouselData.slides as CarouselSlide[]
};

export interface DataStore {
  products: Product[];
  siteContent: SiteContent;
}

export function getData(): DataStore {
  return productsData;
}

export function getProducts(): Product[] {
  return productsData.products;
}

export function getProductById(id: string): Product | undefined {
  return productsData.products.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return productsData.products.filter(p => p.isFeatured);
}

export function getProductsByCategory(category: string): Product[] {
  return category === 'all' 
    ? productsData.products 
    : productsData.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return productsData.products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

export function getSiteContent(): SiteContent {
  return productsData.siteContent;
}

export function saveProduct(product: Product): void {
  const existingIndex = productsData.products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    productsData.products[existingIndex] = product;
  } else {
    productsData.products.push(product);
  }
}

export function deleteProduct(id: string): void {
  productsData.products = productsData.products.filter(p => p.id !== id);
}

export function updateSiteContent(content: SiteContent): void {
  productsData.siteContent = content;
}

export function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Blog functions
export function getBlogPosts(): BlogPost[] {
  return blogPostsData.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPostsData.posts.find(p => p.id === id);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.posts.find(p => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPostsData.posts.filter(p => p.featured);
}

export function getLatestBlogPosts(limit: number = 3): BlogPost[] {
  return getBlogPosts().slice(0, limit);
}

export function getRelatedBlogPosts(category: string, excludeId: string, limit: number = 3): BlogPost[] {
  return getBlogPosts()
    .filter(p => p.category === category && p.id !== excludeId)
    .slice(0, limit);
}

export function saveBlogPost(post: BlogPost): void {
  const existingIndex = blogPostsData.posts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    blogPostsData.posts[existingIndex] = post;
  } else {
    blogPostsData.posts.push(post);
  }
}

export function deleteBlogPost(id: string): void {
  blogPostsData.posts = blogPostsData.posts.filter(p => p.id !== id);
}

export function getCarouselSlides(): CarouselSlide[] {
  return carouselSlidesData.slides.filter(s => s.active);
}

export function getAllCarouselSlides(): CarouselSlide[] {
  return carouselSlidesData.slides;
}

export function saveCarouselSlide(slide: CarouselSlide): void {
  const existingIndex = carouselSlidesData.slides.findIndex(s => s.id === slide.id);
  
  if (existingIndex >= 0) {
    carouselSlidesData.slides[existingIndex] = slide;
  } else {
    carouselSlidesData.slides.push(slide);
  }
}

export function deleteCarouselSlide(id: string): void {
  carouselSlidesData.slides = carouselSlidesData.slides.filter(s => s.id !== id);
}