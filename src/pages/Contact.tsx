import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { hospitalInfo, getWhatsAppUrl } from '../data/content';

const contactInfo = [
  { icon: <MessageCircle className="w-6 h-6" />, title: 'واتساب', value: hospitalInfo.phone, sub: `طوارئ: ${hospitalInfo.emergencyPhone}`, link: getWhatsAppUrl() },
  { icon: <Mail className="w-6 h-6" />, title: 'البريد الإلكتروني', value: hospitalInfo.email, sub: 'نرد خلال 24 ساعة' },
  { icon: <MapPin className="w-6 h-6" />, title: 'العنوان', value: hospitalInfo.address, sub: '' },
  { icon: <Clock className="w-6 h-6" />, title: 'ساعات العمل', value: hospitalInfo.workingHours, sub: `طوارئ: ${hospitalInfo.emergencyHours}` },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-12 md:py-28 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20" />
        </div>
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <MessageCircle className="w-8 h-8 md:w-12 md:h-12 text-white/30 mb-3 md:mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-3 md:mb-6">تواصل معنا</h1>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl leading-relaxed">
              نحن هنا لمساعدتك والإجابة على جميع استفساراتكم. لا تتردد في التواصل معنا
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-10 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {contactInfo.map((info, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card p-4 md:p-6 text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-primary-600 hover:text-primary-700 mb-1 block font-medium">{info.value}</a>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-600 mb-1">{info.value}</p>
                  )}
                  {info.sub && <p className="text-[10px] md:text-xs text-gray-400">{info.sub}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-10 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Form */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">أرسل لنا رسالة</h2>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-5 h-5" />
                      إرسال الرسالة
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-50 text-accent-500 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">تم إرسال رسالتك بنجاح</h3>
                    <p className="text-gray-500 text-sm mb-6">سنتواصل معك في أقرب وقت ممكن</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', message: '' }); }}
                      className="btn-secondary"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                )}
              </div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full min-h-[300px] md:min-h-[400px]">
                <iframe
                  src={hospitalInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع المستشفى"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
