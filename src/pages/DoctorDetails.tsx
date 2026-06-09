import { useParams, Link } from 'react-router-dom';
import { CalendarCheck, ChevronLeft, Award, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { doctors } from '../data/doctors';

export default function DoctorDetails() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الطبيب غير موجود</h2>
          <Link to="/doctors" className="btn-primary">العودة للأطباء</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <section className="relative py-20 md:py-28 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20" />
        </div>
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <Link to="/doctors" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              جميع الأطباء
            </Link>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 ring-4 ring-white/20">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{doctor.name}</h1>
                <p className="text-primary-200 font-medium mb-2">{doctor.title}</p>
                <p className="text-white/60 text-sm">{doctor.experience}+ سنة خبرة في مجال {doctor.specialty}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">نبذة عن الطبيب</h2>
                <p className="text-gray-500 leading-relaxed">{doctor.bio}</p>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">المؤهلات العلمية</h2>
                <div className="space-y-3">
                  {doctor.qualifications.map((q) => (
                    <div key={q} className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{q}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="sticky top-24 space-y-6">
                  {/* Schedule */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <h3 className="font-bold text-gray-900">مواعيد العمل</h3>
                    </div>
                    <div className="space-y-3">
                      {doctor.schedule.map((s) => (
                        <div key={s.day} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                          <span className="font-medium text-gray-700">{s.day}</span>
                          <span className="text-gray-500">{s.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/booking?doctor=${doctor.id}`} className="btn-primary w-full">
                    <CalendarCheck className="w-5 h-5" />
                    حجز موعد مع {doctor.name}
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
