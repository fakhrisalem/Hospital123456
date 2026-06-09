import { Calendar, ChevronLeft, User } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { blogPosts } from '../data/content';

export default function Blog() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20" />
        </div>
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <span className="text-primary-200 font-semibold text-sm">المدونة الطبية</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">مقالات ونصائح صحية</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              مقالات طبية متخصصة ونصائح صحية من أفضل أطبائنا لمساعدتك على الحفاظ على صحتك
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <article className="card group overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-2 text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary-500 text-sm font-medium">
                        اقرأ المزيد
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
