import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { specialties } from '../data/specialties';

export default function Specialties() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-white/10" />
        </div>
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <span className="text-primary-200 font-semibold text-sm">التخصصات</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">تخصصاتنا الطبية</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              نقدم مجموعة واسعة من التخصصات الطبية المتكاملة، يضم كل تخصص فريقًا من أفضل الأطباء المتخصصين
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Specialties grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((spec, i) => (
              <ScrollReveal key={spec.id} delay={i * 0.05}>
                <Link to={`/specialties/${spec.id}`} className="card group overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={spec.image}
                      alt={spec.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                        <spec.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {spec.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{spec.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary-500 text-sm font-medium">
                      المزيد
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
