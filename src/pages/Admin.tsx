import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, User, Phone, MapPin, Calendar, Clock, MessageCircle, Search, Filter, RefreshCw, ChevronDown, ChevronUp, Mail, Stethoscope } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getWhatsAppUrl } from '../data/content';

interface Booking {
  id: string;
  patient_name: string;
  patient_address: string;
  patient_phone: string;
  patient_email: string | null;
  specialty: string;
  doctor: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled';

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(id);
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (!updateError) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    }
    setUpdatingStatus(null);
  };

  const filtered = bookings.filter(b => {
    const matchesSearch =
      b.patient_name.includes(searchQuery) ||
      b.patient_phone.includes(searchQuery) ||
      b.specialty.includes(searchQuery) ||
      b.doctor.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: 'قيد الانتظار', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    confirmed: { label: 'مؤكد', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    cancelled: { label: 'ملغي', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  };

  const statCards = [
    { label: 'إجمالي الحجوزات', value: bookings.length, icon: <ClipboardList className="w-6 h-6" />, color: 'bg-primary-50 text-primary-600' },
    { label: 'قيد الانتظار', value: bookings.filter(b => b.status === 'pending').length, icon: <Clock className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600' },
    { label: 'مؤكد', value: bookings.filter(b => b.status === 'confirmed').length, icon: <ClipboardList className="w-6 h-6" />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'ملغي', value: bookings.filter(b => b.status === 'cancelled').length, icon: <ClipboardList className="w-6 h-6" />, color: 'bg-red-50 text-red-600' },
  ];

  const getWhatsAppMessage = (booking: Booking) => {
    return `مرحبًا ${booking.patient_name}، هذه رسالة من مستشفى الروضة بخصوص حجزك مع ${booking.doctor} في تخصص ${booking.specialty} يوم ${booking.appointment_date} الساعة ${booking.appointment_time}.`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-700 text-white">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">لوحة تحكم الإدارة</h1>
              <p className="text-white/60 text-sm">إدارة حجوزات المرضى والمتابعة</p>
            </div>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-2 text-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              تحديث
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                {card.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="بحث بالاسم أو الهاتف أو التخصص أو الطبيب..."
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as StatusFilter)}
                className="appearance-none pr-10 pl-8 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm bg-white cursor-pointer"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="confirmed">مؤكد</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading && bookings.length === 0 ? (
            <div className="py-20 text-center">
              <RefreshCw className="w-8 h-8 text-gray-300 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">جاري تحميل البيانات...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={fetchBookings} className="btn-primary text-sm">إعادة المحاولة</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-400 mb-2">لا توجد حجوزات</h3>
              <p className="text-sm text-gray-400">لم يتم العثور على حجوزات مطابقة للبحث</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">المريض</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">التخصص</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">الطبيب</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">الموعد</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">الحالة</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((booking) => {
                      const sc = statusConfig[booking.status] || statusConfig.pending;
                      const isExpanded = expandedRow === booking.id;
                      return (
                        <>
                        <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm shrink-0">
                                {booking.patient_name[0]}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{booking.patient_name}</div>
                                <div className="text-xs text-gray-400">{booking.patient_phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{booking.specialty}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{booking.doctor}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-medium">{booking.appointment_date}</div>
                            <div className="text-xs text-gray-400">{booking.appointment_time}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${sc.bg} ${sc.color}`}>
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={getWhatsAppUrl(getWhatsAppMessage(booking))}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                                title="إرسال واتساب"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              {booking.status === 'pending' && (
                                <button
                                  onClick={() => updateStatus(booking.id, 'confirmed')}
                                  disabled={updatingStatus === booking.id}
                                  className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 flex items-center justify-center transition-colors disabled:opacity-50"
                                  title="تأكيد الحجز"
                                >
                                  <ClipboardList className="w-4 h-4" />
                                </button>
                              )}
                              {booking.status !== 'cancelled' && (
                                <button
                                  onClick={() => updateStatus(booking.id, 'cancelled')}
                                  disabled={updatingStatus === booking.id}
                                  className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
                                  title="إلغاء الحجز"
                                >
                                  <span className="text-sm font-bold">✕</span>
                                </button>
                              )}
                              <button
                                onClick={() => setExpandedRow(isExpanded ? null : booking.id)}
                                className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors"
                                title="التفاصيل"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${booking.id}-detail`}>
                            <td colSpan={6} className="px-6 py-4 bg-gray-50/50">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                <div className="flex items-center gap-2 text-sm">
                                  <User className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">الاسم:</span>
                                  <span className="text-gray-900 font-medium">{booking.patient_name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">الهاتف:</span>
                                  <a href={getWhatsAppUrl(getWhatsAppMessage(booking))} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium">{booking.patient_phone}</a>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">العنوان:</span>
                                  <span className="text-gray-900 font-medium">{booking.patient_address}</span>
                                </div>
                                {booking.patient_email && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-500">البريد:</span>
                                    <span className="text-gray-900 font-medium">{booking.patient_email}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-sm">
                                  <Stethoscope className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">التخصص:</span>
                                  <span className="text-gray-900 font-medium">{booking.specialty}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">التاريخ:</span>
                                  <span className="text-gray-900 font-medium">{booking.appointment_date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">الوقت:</span>
                                  <span className="text-gray-900 font-medium">{booking.appointment_time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">تاريخ الحجز:</span>
                                  <span className="text-gray-900 font-medium">{new Date(booking.created_at).toLocaleDateString('ar-EG')}</span>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {filtered.map((booking) => {
                  const sc = statusConfig[booking.status] || statusConfig.pending;
                  const isExpanded = expandedRow === booking.id;
                  return (
                    <div key={booking.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                            {booking.patient_name[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{booking.patient_name}</div>
                            <div className="text-xs text-gray-400">{booking.patient_phone}</div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Stethoscope className="w-3.5 h-3.5" />{booking.specialty}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{booking.appointment_date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={getWhatsAppUrl(getWhatsAppMessage(booking))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 rounded-xl py-2.5 text-sm font-medium hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          واتساب
                        </a>
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            disabled={updatingStatus === booking.id}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary-50 text-primary-600 rounded-xl py-2.5 text-sm font-medium hover:bg-primary-100 transition-colors disabled:opacity-50"
                          >
                            تأكيد
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            disabled={updatingStatus === booking.id}
                            className="px-4 bg-red-50 text-red-600 rounded-xl py-2.5 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            إلغاء
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => setExpandedRow(isExpanded ? null : booking.id)}
                        className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 transition-colors"
                      >
                        {isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-sm"
                          >
                            <div className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /><span className="text-gray-500">الاسم:</span><span className="text-gray-900">{booking.patient_name}</span></div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /><span className="text-gray-500">العنوان:</span><span className="text-gray-900">{booking.patient_address}</span></div>
                            <div className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-gray-400" /><span className="text-gray-500">الطبيب:</span><span className="text-gray-900">{booking.doctor}</span></div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /><span className="text-gray-500">الوقت:</span><span className="text-gray-900">{booking.appointment_time}</span></div>
                            {booking.patient_email && (
                              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><span className="text-gray-500">البريد:</span><span className="text-gray-900">{booking.patient_email}</span></div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
