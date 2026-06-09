import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Heart, MessageCircle } from 'lucide-react';
import { hospitalInfo, getWhatsAppUrl } from '../data/content';

const quickLinks = [
  { label: 'الرئيسية', path: '/' },
  { label: 'من نحن', path: '/about' },
  { label: 'التخصصات', path: '/specialties' },
  { label: 'الأطباء', path: '/doctors' },
  { label: 'حجز موعد', path: '/booking' },
  { label: 'المدونة', path: '/blog' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-primary-600">
        <div className="container-custom py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-right">
            <h3 className="text-2xl font-bold mb-2">هل تحتاج إلى استشارة طبية؟</h3>
            <p className="text-white/70">احجز موعدك الآن مع أفضل الأطباء المتخصصين</p>
          </div>
          <Link to="/booking" className="btn-secondary shrink-0">
            احجز موعدك الآن
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ر</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg">{hospitalInfo.name}</div>
                <div className="text-xs text-gray-400">رعاية طبية متكاملة</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              مستشفى رائد يقدم خدمات طبية متكاملة بأعلى معايير الجودة والسلامة، مع فريق من أفضل الأطباء والمتخصصين.
            </p>
            <div className="flex gap-3">
              {Object.entries(hospitalInfo.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  <span className="text-sm font-bold">{platform[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-white mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MessageCircle className="w-4 h-4 text-primary-400 mt-1 shrink-0" />
                <div>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-400 transition-colors">
                    واتساب: {hospitalInfo.phone}
                  </a>
                  <div className="text-gray-500 text-xs">طوارئ: {hospitalInfo.emergencyPhone}</div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary-400 mt-1 shrink-0" />
                <span className="text-gray-300">{hospitalInfo.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 mt-1 shrink-0" />
                <span className="text-gray-300">{hospitalInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h4 className="font-bold text-white mb-6">ساعات العمل</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary-400 mt-1 shrink-0" />
                <div>
                  <div className="text-gray-300">{hospitalInfo.workingHours}</div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                <div>
                  <div className="text-gray-300">{hospitalInfo.emergencyHours}</div>
                  <div className="text-gray-500 text-xs">قسم الطوارئ</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 {hospitalInfo.name}. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنع بـ <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> لخدمة صحتكم
          </p>
        </div>
      </div>
    </footer>
  );
}
