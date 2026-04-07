import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, getRelatedBlogPosts, getBlogPosts } from '@/lib/data';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return { title: 'Artikel Tidak Ditemukan | Devie Honda' };
  }

  return {
    title: `${post.title} | Devie Honda`,
    description: post.excerpt,
    keywords: `honda, ${post.title}, ${post.category}, blog honda`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.category, post.id, 3);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#e31837] transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#e31837] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
        </nav>

        <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative aspect-[16/9] bg-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#e31837] text-white text-sm font-bold rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
              <div className="w-8 h-8 bg-[#e31837] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{post.author.charAt(0)}</span>
              </div>
              <span className="text-gray-700 font-medium">{post.author}</span>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700">{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\.\s/)) {
                  const items = paragraph.split('\n').filter(line => line.match(/^\d+\.\s/));
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700">{item.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={index} className="my-4 leading-relaxed">{paragraph}</p>;
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-[#e31837] font-semibold hover:gap-3 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Blog
              </Link>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-[#e31837] rounded-full" />
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#e31837] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(related.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}