import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Shield, Users, Award, ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionTitle from '../components/SectionTitle';
import { hospitalInfo } from '../data/content';

const values = [
  { icon: <Heart className="w-6 h-6" />, title: 'الرعاية والشفاء', desc: 'نضع صحة المريض ومصلحته في المقام الأول دائمًا' },
  { icon: <Shield className="w-6 h-6" />, title: 'الجودة والسلامة', desc: 'نلتزم بأعلى معايير الجودة والسلامة العالمية' },
  { icon: <Users className="w-6 h-6" />, title: 'العمل الجماعي', desc: 'نؤمن بروح الفريق والتعاون لتحقيق أفضل النتائج' },
  { icon: <Award className="w-6 h-6" />, title: 'التميز والابتكار', desc: 'نسعى للتطوير المستمر وتبني أحدث التقنيات' },
];

const leadership = [
  { name: 'د. عبدالرحمن الفارس', role: 'المدير العام', image: 'https://images.pexels.com/photos/8460123/pexels-photo-8460123.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'د. منى السعيد', role: 'مدير الشؤون الطبية', image: 'https://images.pexels.com/photos/5722156/pexels-photo-5722156.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'م. فهد العتيبي', role: 'مدير الشؤون الإدارية', image: 'https://images.pexels.com/photos/8460228/pexels-photo-8460228.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'د. هند القحطاني', role: 'مدير التمريض', image: 'https://images.pexels.com/photos/34185202/pexels-photo-34185202.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function About() {
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
            <span className="text-primary-200 font-semibold text-sm">من نحن</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">المستشفى العربي</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              صرح طبي متكامل يقدم خدماته منذ أكثر من {hospitalInfo.stats.years} عامًا، بحلم ورؤية واضحة
              لأن نكون الخيار الأول للرعاية الصحية في المنطقة.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img
                src="https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="المستشفى"
                className="rounded-2xl shadow-2xl shadow-gray-200/50 w-full object-cover aspect-[4/3]"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <span className="text-primary-500 font-semibold text-sm">قصتنا</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                رحلة تميز بدأت منذ عقود
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                تأسس المستشفى العربي عام 2005 برؤية طموحة لتقديم رعاية صحية عالية الجودة متاحة للجميع.
                بدأنا بمبنى صغير وعدد محدود من الأطباء، لكن بحماسة وإصرار استثنائيين.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                على مدار السنين، توسعنا وأضفنا تخصصات جديدة وأحدث الأجهزة الطبية،
                حتى أصبحنا اليوم من أبرز المستشفيات في المنطقة، يثق بنا أكثر من {hospitalInfo.stats.patients.toLocaleString()} مريض.
              </p>
              <p className="text-gray-500 leading-relaxed">
                نحن فخورون بما حققناه، لكننا لا نتوقف عند هذا الحد.
                نسعى دائمًا للتطوير والتحسين لنقدم لكم أفضل تجربة طبية ممكنة.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-10 h-full border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
                <p className="text-gray-500 leading-relaxed">
                  أن نكون المستشفى الرائد في تقديم الرعاية الصحية المتكاملة في المنطقة،
                  وأن نضع معايير جديدة للتميز الطبي من خلال الابتكار والتعليم والبحث العلمي،
                  لنكون الخيار الأول لكل أسرة تبحث عن أفضل رعاية طبية.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="bg-white rounded-2xl p-8 md:p-10 h-full border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
                <p className="text-gray-500 leading-relaxed">
                  تقديم خدمات طبية متكاملة وعالية الجودة في بيئة آمنة ومريحة،
                  مع الالتزام بأعلى معايير السلامة والشفافية، وتمكين المرضى من اتخاذ
                  قرارات صحية واعية من خلال التواصل الفعال والتعليم المستمر.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <SectionTitle
            title="قيمنا"
            subtitle="المبادئ التي تضبط مسيرتنا وتوجه قراراتنا يوميًا"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCounter target={hospitalInfo.stats.doctors} suffix="+" label="طبيب متخصص" icon={<Users className="w-7 h-7" />} />
            <AnimatedCounter target={hospitalInfo.stats.specialties} suffix="+" label="تخصص طبي" icon={<Award className="w-7 h-7" />} />
            <AnimatedCounter target={hospitalInfo.stats.patients} suffix="+" label="مريض سعيد" icon={<Heart className="w-7 h-7" />} />
            <AnimatedCounter target={hospitalInfo.stats.years} suffix="+" label="سنة خبرة" icon={<Shield className="w-7 h-7" />} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <SectionTitle
            title="صور من المستشفى"
            subtitle="نظرة على مرافقنا الحديثة وبيئتنا المريحة"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/8460228/pexels-photo-8460228.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/5722156/pexels-photo-5722156.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/7089017/pexels-photo-7089017.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/6129879/pexels-photo-6129879.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/5203594/pexels-photo-5203594.jpeg?auto=compress&cs=tinysrgb&w=600',
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <img
                  src={img}
                  alt={`صورة ${i + 1}`}
                  className="rounded-2xl w-full object-cover aspect-[4/3] hover:shadow-xl transition-shadow duration-300"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="فريق الإدارة"
            subtitle="قيادة محترفة تقود المستشفى نحو التميز"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card text-center p-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-primary-500 text-sm font-medium">{person.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="bg-primary-600 rounded-3xl p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">هل تريد زيارتنا؟</h3>
              <p className="text-white/70 max-w-md mx-auto mb-8">احجز موعدك الآن أو تواصل معنا لأي استفسار</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/booking" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  حجز موعد
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-secondary border-white/30 text-white hover:bg-white/10">
                  تواصل معنا
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
