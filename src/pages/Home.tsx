import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Stethoscope,
  Users, Award, CalendarCheck, Clock,
  ChevronLeft, Star, ArrowLeft,
  Shield, Ambulance, FlaskConical, MessageCircle,
  ChevronDown, Check, Play, X,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionTitle from '../components/SectionTitle';
import { specialties } from '../data/specialties';
import { doctors } from '../data/doctors';
import { testimonials, hospitalInfo, getWhatsAppUrl } from '../data/content';

const topSpecialties = specialties.slice(0, 6);
const topDoctors = doctors.slice(0, 4);

const services = [
  { icon: <Shield className="w-7 h-7" />, title: 'جودة وسلامة', desc: 'معايير جودة عالمية في جميع الخدمات الطبية' },
  { icon: <Ambulance className="w-7 h-7" />, title: 'طوارئ 24/7', desc: 'فريق طوارئ متخصص على مدار الساعة' },
  { icon: <FlaskConical className="w-7 h-7" />, title: 'مختبرات متقدمة', desc: 'أحدث الأجهزة والتقنيات المخبرية' },
  { icon: <Clock className="w-7 h-7" />, title: 'حجز إلكتروني', desc: 'احجز موعدك بسهولة من أي مكان' },
];

const steps = [
  { num: '١', title: 'اختر التخصص', desc: 'تصفح التخصصات المتاحة واختر ما يناسبك' },
  { num: '٢', title: 'اختر الطبيب', desc: 'اختر من بين أفضل الأطباء المتخصصين' },
  { num: '٣', title: 'حدد الموعد', desc: 'اختر التاريخ والوقت المناسب لك' },
  { num: '٤', title: 'تأكيد الحجز', desc: 'تأكد من بياناتك واحجز موعدك فورًا' },
];

const faqs = [
  {
    q: 'ما هي خدمات العيادة المتاحة؟',
    a: 'نقدم أكثر من 20 تخصص طبي شامل يشمل أمراض القلب، الأعصاب، العظام، الأطفال، العيون، الجلدية، والجراحة العامة، بالإضافة إلى خدمات المختبرات والأشعة والطوارئ على مدار الساعة.',
  },
  {
    q: 'كيف يمكنني حجز موعد؟',
    a: 'يمكنك حجز موعدك بسهولة من خلال الموقع الإلكتروني عن طريق صفحة حجز المواعد، أو عبر الواتساب، أو الاتصال بنا مباشرة. اختر التخصص والطبيب وحدد الوقت المناسب لك.',
  },
  {
    q: 'هل يمكنني تقسيط مبلغ العلاج؟',
    a: 'نعم، نوفر أنظمة تقسيط مرنة على العلاجات والعمليات الجراحية. يمكنك الاستفسار عن خطط التقسيط المتاحة من خلال التواصل مع خدمة العملاء أو زيارة المستشفى.',
  },
  {
    q: 'هل التأمين الصحي مقبول؟',
    a: 'نعم، نتعامل مع معظم شركات التأمين الصحي المعتمدة في مصر. يمكنك التواصل معنا للتأكد من قبول شركتك التأمينية قبل الزيارة.',
  },
  {
    q: 'ما أوقات العمل لديكم؟',
    a: `نعمل ${hospitalInfo.workingHours}، وقسم الطوارئ يعمل ${hospitalInfo.emergencyHours} لخدمتكم في أي وقت.`,
  },
];

const plans = [
  {
    name: 'الباقة الأساسية',
    price: '150',
    features: [
      'كشف طبي عادي',
      'تحاليل أساسية',
      'أشعة عادية',
      'استشارة طبيب عام',
    ],
    highlight: false,
  },
  {
    name: 'الباقة المتقدمة',
    price: '350',
    features: [
      'كل مميزات الأساسية',
      'كشف استشاري',
      'تحاليل شاملة',
      'أشعة متقدمة (رنين/أشعة مقطعية)',
      'متابعة لمدة شهر',
      'خصم 10% على العمليات',
    ],
    highlight: true,
  },
  {
    name: 'باقة العائلة',
    price: '600',
    features: [
      'كل مميزات المتقدمة',
      'تشمل 4 أفراد من العائلة',
      'فحص سنوي شامل لكل فرد',
      'أولوية في الحجز',
      'خط ساخن للمتابعة',
      'خصم 15% على جميع الخدمات',
    ],
    highlight: false,
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-right gap-4"
      >
        <span className="font-semibold text-gray-900 text-sm md:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-primary-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.pexels.com/photos/2634027/pexels-photo-2634027.jpeg?auto=compress&cs=tinysrgb&w=1920"
            className="w-full h-full object-cover"
          >
            <source src="/videos/ma.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-l from-primary-900/90 via-primary-800/80 to-primary-900/70" />
        </div>
        <div className="container-custom relative z-10 py-12 md:py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                نستقبلكم على مدار الساعة
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6"
            >
              رعاية طبية متكاملة
              <br />
              <span className="text-primary-200">لعائلتك</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-white/70 mb-6 md:mb-10 leading-relaxed max-w-xl"
            >
              نقدم خدمات طبية عالية الجودة مع فريق من أفضل الأطباء المتخصصين، في بيئة آمنة ومريحة
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <Link to="/booking" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 hover:shadow-lg text-sm md:text-base">
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5" />
                حجز موعد
              </Link>
              <Link to="/specialties" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-sm md:text-base">
                عرض التخصصات
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About brief */}
      <section className="py-12 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5722156/pexels-photo-5722156.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="فريق طبي"
                  className="rounded-2xl shadow-2xl shadow-gray-200/50 w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white rounded-2xl p-4 md:p-6 shadow-xl hidden md:block">
                  <div className="text-3xl font-bold">{hospitalInfo.stats.years}+</div>
                  <div className="text-sm text-white/80">سنة خبرة</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <span className="text-primary-500 font-semibold text-sm">من نحن</span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 md:mb-6">
                مستشفى الروضة  تمتد لعقود
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                {hospitalInfo.name} هو صرح طبي متكامل يقدم خدماته منذ أكثر من {hospitalInfo.stats.years} عامًا.
                نحرص على تقديم أعلى مستويات الرعاية الصحية باستخدام أحدث التقنيات الطبية العالمية،
                مع فريق من {hospitalInfo.stats.doctors}+ طبيب متخصص في {hospitalInfo.stats.specialties} تخصص طبي.
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-50 text-accent-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-medium">معايير جودة عالمية</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-50 text-accent-500 flex items-center justify-center">
                    <Users className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-medium">فريق طبي متميز</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-50 text-accent-500 flex items-center justify-center">
                    <Award className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-medium">اعتمادات دولية</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-50 text-accent-500 flex items-center justify-center">
                    <Ambulance className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-medium">طوارئ 24 ساعة</span>
                </div>
              </div>
              <Link to="/about" className="btn-primary text-sm md:text-base">
                اقرأ المزيد
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-16 bg-primary-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <AnimatedCounter target={hospitalInfo.stats.doctors} suffix="+" label="طبيب متخصص" icon={<Users className="w-6 h-6 md:w-7 md:h-7" />} />
            <AnimatedCounter target={hospitalInfo.stats.specialties} suffix="+" label="تخصص طبي" icon={<Stethoscope className="w-6 h-6 md:w-7 md:h-7" />} />
            <AnimatedCounter target={hospitalInfo.stats.patients} suffix="+" label="مريض سعيد" icon={<Heart className="w-6 h-6 md:w-7 md:h-7" />} />
            <AnimatedCounter target={hospitalInfo.stats.years} suffix="+" label="سنة خبرة" icon={<Award className="w-6 h-6 md:w-7 md:h-7" />} />
          </div>
        </div>
      </section>

      {/* Doctors Video Section */}
      <section className="py-12 md:py-24">
        <div className="container-custom">
          <SectionTitle
            title="تعرف على أطباءنا"
            subtitle="فريق من أمهر الأطباء المتخصصين يضعون صحتكم في المقام الأول"
          />
          <ScrollReveal>
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 aspect-video max-w-4xl mx-auto group cursor-pointer" onClick={() => setShowVideo(true)}>
             
              <div className="absolute inset-0 bg-primary-900/40 flex items-center justify-center group-hover:bg-primary-900/50 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-600 mr-[-3px]" fill="currentColor" />
                </motion.div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-900/80 to-transparent p-4 md:p-8">
                <h3 className="text-white font-bold text-lg md:text-2xl mb-1">فريق أطباء مستشفى الروضة</h3>
                <p className="text-white/70 text-xs md:text-sm">شاهد كيف يقدم أطباؤنا أفضل رعاية طبية لمرضانا</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Video Modal */}
          <AnimatePresence>
            {showVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                onClick={() => setShowVideo(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <video
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/medical-bg.webm" type="video/webm" />
                  </video>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="تخصصاتنا الطبية"
            subtitle="نقدم مجموعة واسعة من التخصصات الطبية المتكاملة لتلبية جميع احتياجاتكم الصحية"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {topSpecialties.map((spec, i) => (
              <ScrollReveal key={spec.id} delay={i * 0.1}>
                <Link
                  to={`/specialties/${spec.id}`}
                  className="card group p-4 md:p-6 flex items-start gap-3 md:gap-4"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                    <spec.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base group-hover:text-primary-600 transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">{spec.description}</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-primary-400 transition-colors shrink-0 mt-1" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-8 md:mt-10">
            <Link to="/specialties" className="btn-secondary text-sm md:text-base">
              عرض جميع التخصصات
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Top Doctors */}
      <section className="py-12 md:py-24">
        <div className="container-custom">
          <SectionTitle
            title="أفضل أطبائنا"
            subtitle="فريق من أمهر الأطباء المتخصصين ذوي الخبرة الواسعة والكفاءة العالية"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topDoctors.map((doc, i) => (
              <ScrollReveal key={doc.id} delay={i * 0.1}>
                <Link to={`/doctors/${doc.id}`} className="card group text-center p-4 md:p-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden mx-auto mb-3 md:mb-4">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-xs md:text-base group-hover:text-primary-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-primary-500 text-xs md:text-sm font-medium mb-1 md:mb-2">{doc.title}</p>
                  <p className="text-gray-400 text-[10px] md:text-xs">{doc.experience}+ سنة خبرة</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-8 md:mt-10">
            <Link to="/doctors" className="btn-secondary text-sm md:text-base">
              عرض جميع الأطباء
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-24 bg-primary-600">
        <div className="container-custom">
          <SectionTitle
            title="خدماتنا الطبية"
            subtitle="نوفر لكم مجموعة متكاملة من الخدمات الطبية المتقدمة"
            light
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {services.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center border border-white/10 hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4 text-white">
                    {svc.icon}
                  </div>
                  <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">{svc.title}</h3>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed">{svc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12 md:py-24">
        <div className="container-custom">
          <SectionTitle
            title="خطط الأسعار"
            subtitle="اختر الخطة المناسبة لك - باقات متنوعة تلائم جميع الاحتياجات والميزانيات"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={`relative rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'bg-primary-500 border-primary-500 text-white shadow-xl shadow-primary-500/20'
                    : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-gray-200/50'
                }`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      الأكثر طلبًا
                    </div>
                  )}
                  <h3 className={`font-bold text-lg md:text-xl mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-5 md:mb-6">
                    <span className={`text-3xl md:text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-primary-600'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>جنيه / الزيارة</span>
                  </div>
                  <ul className="space-y-3 mb-6 md:mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-accent-400' : 'text-accent-500'}`} />
                        <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-gray-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/booking"
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-white text-primary-600 hover:bg-gray-100 hover:shadow-lg'
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white hover:shadow-lg'
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    احجز الآن
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="آراء مرضانا"
            subtitle="ماذا يقول مرضانا عن تجربتهم في مستشفانا"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <div className="card p-5 md:p-6">
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 ${si < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-xs md:text-sm">"{t.comment}"</p>
                  <div className="flex items-center gap-2 md:gap-3 pt-3 md:pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs md:text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-xs md:text-sm">{t.name}</div>
                      <div className="text-[10px] md:text-xs text-gray-400">{t.date}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-24">
        <div className="container-custom">
          <SectionTitle
            title="كيف تحجز موعدك؟"
            subtitle="4 خطوات بسيطة لحجز موعدك مع أفضل الأطباء"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative text-center p-4 md:p-6">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-primary-100" />
                  )}
                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center mx-auto mb-3 md:mb-4 text-lg md:text-2xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-8 md:mt-10">
            <Link to="/booking" className="btn-primary text-sm md:text-base">
              <CalendarCheck className="w-4 h-4 md:w-5 md:h-5" />
              احجز موعدك الآن
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="أسئلة يسألها مرضانا"
            subtitle="نجيب على أكثر الأسئلة شيوعًا بكل شفافية"
          />
          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <FAQItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contact */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="bg-primary-50 rounded-2xl md:rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="text-center md:text-right">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">هل لديك استفسار؟</h3>
                <p className="text-gray-500 max-w-md text-sm md:text-base">تواصل معنا مباشرة وسيسعدنا مساعدتك والإجابة على جميع استفساراتكم</p>
              </div>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm md:text-base">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  واتساب
                </a>
                <Link to="/contact" className="btn-secondary text-sm md:text-base">
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
