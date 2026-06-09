import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, ChevronLeft, CheckCircle2, Clock, User, Stethoscope, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { specialties } from '../data/specialties';
import { doctors } from '../data/doctors';
import { supabase } from '../lib/supabase';

const steps = [
  { num: 1, label: 'التخصص', icon: Stethoscope },
  { num: 2, label: 'الطبيب', icon: User },
  { num: 3, label: 'الموعد', icon: Calendar },
  { num: 4, label: 'البيانات', icon: Phone },
  { num: 5, label: 'التأكيد', icon: CheckCircle2 },
];

const timeSlots = [
  '9:00 ص', '9:30 ص', '10:00 ص', '10:30 ص',
  '11:00 ص', '11:30 ص', '12:00 م', '12:30 م',
  '2:00 م', '2:30 م', '3:00 م', '3:30 م',
  '4:00 م', '4:30 م', '5:00 م', '5:30 م',
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const specParam = searchParams.get('specialty');
    const docParam = searchParams.get('doctor');
    if (specParam) {
      setSelectedSpecialty(specParam);
      setCurrentStep(docParam ? 3 : 2);
      if (docParam) setSelectedDoctor(docParam);
    }
  }, [searchParams]);

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((d) => d.specialtyId === selectedSpecialty)
    : [];

  const selectedSpecialtyObj = specialties.find((s) => s.id === selectedSpecialty);
  const selectedDoctorObj = doctors.find((d) => d.id === selectedDoctor);

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const formatDisplay = (d: Date) => {
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return { dayName: dayNames[d.getDay()], day: d.getDate(), month: months[d.getMonth()] };
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!selectedSpecialty;
      case 2: return !!selectedDoctor;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return !!patientName && !!patientAddress && !!patientPhone;
      default: return true;
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const { error } = await supabase.from('bookings').insert({
        patient_name: patientName,
        patient_address: patientAddress,
        patient_phone: patientPhone,
        patient_email: patientEmail || null,
        specialty: selectedSpecialtyObj?.name || '',
        doctor: selectedDoctorObj?.name || '',
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        status: 'pending',
      });
      if (error) throw error;
      setIsConfirmed(true);
    } catch {
      setSubmitError('حدث خطأ أثناء حفظ الحجز. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-primary-600">
        <div className="container-custom relative z-10">
          <CalendarCheck className="w-12 h-12 text-white/30 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">حجز موعد</h1>
          <p className="text-white/70">احجز موعدك مع أفضل الأطباء في خطوات بسيطة</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          {/* Steps indicator */}
          <div className="flex items-center justify-between mb-10 px-2">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.num
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-gray-100 text-gray-400'
                    } ${isConfirmed && step.num === 5 ? 'bg-accent-500 shadow-accent-500/25' : ''}`}
                  >
                    {isConfirmed && step.num === 5 ? (
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1.5 font-medium ${currentStep >= step.num ? 'text-primary-600' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-6 md:w-12 h-0.5 mx-1 md:mx-2 mb-5 transition-colors duration-300 ${
                    currentStep > step.num ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Specialty */}
                {currentStep === 1 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">اختر التخصص</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {specialties.map((spec) => (
                        <button
                          key={spec.id}
                          onClick={() => setSelectedSpecialty(spec.id)}
                          className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                            selectedSpecialty === spec.id
                              ? 'border-primary-500 bg-primary-50 text-primary-600'
                              : 'border-gray-100 hover:border-gray-200 text-gray-600'
                          }`}
                        >
                          <spec.icon className={`w-6 h-6 mx-auto mb-2 ${selectedSpecialty === spec.id ? 'text-primary-500' : 'text-gray-400'}`} />
                          <span className="text-sm font-medium">{spec.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Doctor */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">اختر الطبيب</h2>
                      {selectedSpecialtyObj && (
                        <span className="text-sm text-primary-500 font-medium bg-primary-50 px-3 py-1 rounded-lg">
                          {selectedSpecialtyObj.name}
                        </span>
                      )}
                    </div>
                    {filteredDoctors.length > 0 ? (
                      <div className="space-y-3">
                        {filteredDoctors.map((doc) => (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDoctor(doc.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                              selectedDoctor === doc.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 text-right">
                              <h3 className="font-bold text-gray-900">{doc.name}</h3>
                              <p className="text-primary-500 text-sm">{doc.title}</p>
                              <p className="text-gray-400 text-xs mt-1">{doc.experience}+ سنة خبرة</p>
                            </div>
                            {selectedDoctor === doc.id && (
                              <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-8">لا يوجد أطباء في هذا التخصص حاليًا</p>
                    )}
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {currentStep === 3 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">اختر التاريخ والوقت</h2>
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">التاريخ المتاح</h3>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {getNext7Days().map((d) => {
                          const dateStr = formatDate(d);
                          const display = formatDisplay(d);
                          const isSelected = selectedDate === dateStr;
                          return (
                            <button
                              key={dateStr}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-100 hover:border-gray-200'
                              }`}
                            >
                              <div className={`text-xs font-medium ${isSelected ? 'text-primary-500' : 'text-gray-400'}`}>
                                {display.dayName}
                              </div>
                              <div className={`text-lg font-bold ${isSelected ? 'text-primary-600' : 'text-gray-700'}`}>
                                {display.day}
                              </div>
                              <div className={`text-xs ${isSelected ? 'text-primary-400' : 'text-gray-400'}`}>
                                {display.month}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {selectedDate && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">الوقت المتاح</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                                selectedTime === time
                                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                                  : 'border-gray-100 hover:border-gray-200 text-gray-600'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Patient Info */}
                {currentStep === 4 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">بيانات المريض</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2"><User className="w-4 h-4" /> الاسم الكامل</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> العنوان</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={patientAddress}
                          onChange={(e) => setPatientAddress(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                          placeholder="أدخل عنوانك"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> رقم الهاتف</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                          placeholder="أدخل رقم هاتفك"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> البريد الإلكتروني <span className="text-gray-400 font-normal">(اختياري)</span></span>
                        </label>
                        <input
                          type="email"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                          placeholder="أدخل بريدك الإلكتروني (اختياري)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">تأكيد الحجز</h2>
                    <div className="space-y-3 mb-8">
                      {selectedSpecialtyObj && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <Stethoscope className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-400">التخصص</div>
                            <div className="font-medium text-gray-900">{selectedSpecialtyObj.name}</div>
                          </div>
                        </div>
                      )}
                      {selectedDoctorObj && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <User className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-400">الطبيب</div>
                            <div className="font-medium text-gray-900">{selectedDoctorObj.name}</div>
                          </div>
                        </div>
                      )}
                      {selectedDate && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <Calendar className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-400">التاريخ</div>
                            <div className="font-medium text-gray-900">{selectedDate}</div>
                          </div>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <Clock className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-400">الوقت</div>
                            <div className="font-medium text-gray-900">{selectedTime}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <User className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="text-xs text-gray-400">اسم المريض</div>
                          <div className="font-medium text-gray-900">{patientName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="text-xs text-gray-400">العنوان</div>
                          <div className="font-medium text-gray-900">{patientAddress}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="text-xs text-gray-400">الهاتف</div>
                          <div className="font-medium text-gray-900">{patientPhone}</div>
                        </div>
                      </div>
                      {patientEmail && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <Mail className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-400">البريد الإلكتروني</div>
                            <div className="font-medium text-gray-900">{patientEmail}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {submitError && (
                      <div className="mb-4 p-4 bg-red-50 text-red-600 text-sm rounded-xl">{submitError}</div>
                    )}

                    <button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="btn-primary w-full disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {isSubmitting ? 'جاري الحجز...' : 'تأكيد الحجز'}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm text-center"
              >
                <div className="w-20 h-20 rounded-full bg-accent-50 text-accent-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">تم حجز موعدك بنجاح!</h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  سيتم إرسال تفاصيل الموعد إلى هاتفك. يرجى الحضور قبل الموعد بـ 15 دقيقة.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto mb-8 text-right space-y-3">
                  {selectedDoctorObj && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">الطبيب</span>
                      <span className="font-medium text-gray-900">{selectedDoctorObj.name}</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">التاريخ</span>
                      <span className="font-medium text-gray-900">{selectedDate}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">الوقت</span>
                      <span className="font-medium text-gray-900">{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">المريض</span>
                    <span className="font-medium text-gray-900">{patientName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الهاتف</span>
                    <span className="font-medium text-gray-900">{patientPhone}</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <a href="/" className="btn-primary">العودة للرئيسية</a>
                  <a href="/booking" onClick={() => window.location.reload()} className="btn-secondary">حجز موعد آخر</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {!isConfirmed && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              {currentStep < 5 && (
                <button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
