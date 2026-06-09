import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { doctors } from '../data/doctors';

export default function Doctors() {
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
            <span className="text-primary-200 font-semibold text-sm">فريقنا</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">أطباؤنا المتميزون</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              فريق من أمهر الأطباء المتخصصين ذوي الخبرة الواسعة والكفاءة العالية، يجمعون بين العلم والممارسة
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Doctors grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <ScrollReveal key={doc.id} delay={i * 0.05}>
                <Link to={`/doctors/${doc.id}`} className="card group overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-primary-500 text-sm font-medium mb-1">{doc.title}</p>
                    <p className="text-gray-400 text-xs">{doc.experience}+ سنة خبرة</p>
                    <span className="inline-flex items-center gap-1 text-primary-500 text-sm font-medium mt-3">
                      عرض الملف
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
