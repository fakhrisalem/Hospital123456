import { useParams, Link } from 'react-router-dom';
import { CalendarCheck, ChevronLeft, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { specialties } from '../data/specialties';
import { doctors } from '../data/doctors';

export default function SpecialtyDetails() {
  const { id } = useParams();
  const specialty = specialties.find((s) => s.id === id);

  if (!specialty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">التخصص غير موجود</h2>
          <Link to="/specialties" className="btn-primary">العودة للتخصصات</Link>
        </div>
      </div>
    );
  }

  const specialtyDoctors = doctors.filter((d) => d.specialtyId === specialty.id);

  return (
    <div>
      {/* Banner */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={specialty.image} alt={specialty.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-primary-900/90 via-primary-800/80 to-primary-900/70" />
        </div>
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <Link to="/specialties" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              جميع التخصصات
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm text-white flex items-center justify-center">
                <specialty.icon className="w-7 h-7" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{specialty.name}</h1>
            </div>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{specialty.description}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Full description */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">نبذة عن القسم</h2>
                <p className="text-gray-500 leading-relaxed mb-8">{specialty.fullDescription}</p>

                {/* Conditions */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">الحالات التي يتم علاجها</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {specialty.conditions.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                      <span className="text-sm">{c}</span>
                    </div>
                  ))}
                </div>

                {/* Services */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">خدمات القسم</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialty.services.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                      <span className="text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar - CTA */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="sticky top-24 space-y-6">
                  <div className="bg-primary-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-3">هل تحتاج استشارة؟</h3>
                    <p className="text-sm text-gray-500 mb-4">احجز موعدك مع أحد أطباء قسم {specialty.name}</p>
                    <Link to={`/booking?specialty=${specialty.id}`} className="btn-primary w-full">
                      <CalendarCheck className="w-5 h-5" />
                      حجز موعد
                    </Link>
                  </div>

                  <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                    <img
                      src={specialty.image}
                      alt={specialty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors in this specialty */}
      {specialtyDoctors.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">أطباء قسم {specialty.name}</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialtyDoctors.map((doc, i) => (
                <ScrollReveal key={doc.id} delay={i * 0.1}>
                  <Link to={`/doctors/${doc.id}`} className="card group text-center p-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{doc.name}</h3>
                    <p className="text-primary-500 text-sm font-medium mb-1">{doc.title}</p>
                    <p className="text-gray-400 text-xs">{doc.experience}+ سنة خبرة</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
