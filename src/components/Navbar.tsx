import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Clock, MessageCircle } from 'lucide-react';
import { hospitalInfo, getWhatsAppUrl } from '../data/content';

const navLinks = [
  { label: 'الرئيسية', path: '/' },
  { label: 'من نحن', path: '/about' },
  { label: 'التخصصات', path: '/specialties' },
  { label: 'الأطباء', path: '/doctors' },
  { label: 'المدونة', path: '/blog' },
  { label: 'تواصل معنا', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-sm hidden md:block">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              واتساب: {hospitalInfo.phone}
            </a>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {hospitalInfo.workingHours}
            </span>
          </div>
          <div className="text-white/70">الطوارئ: {hospitalInfo.emergencyPhone}</div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50'
            : 'bg-white'
        }`}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">ر</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-lg leading-tight">{hospitalInfo.name}</div>
              <div className="text-xs text-gray-400">رعاية طبية متكاملة</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/booking" className="btn-primary text-sm hidden sm:inline-flex">
              حجز موعد
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="container-custom py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/booking" className="btn-primary w-full mt-4">
                  حجز موعد
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-2 bg-accent-50 text-accent-600 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-accent-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل عبر واتساب
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
