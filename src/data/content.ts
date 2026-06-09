export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    rating: 5,
    comment: 'تجربة ممتازة في المستشفى، الطاقم الطبي محترف والتعامل راقي جدًا. شكرًا لكم على الرعاية المتميزة.',
    date: '2025-01-15',
  },
  {
    id: '2',
    name: 'فاطمة حسن',
    rating: 5,
    comment: 'زرت قسم العيون وكانت التجربة رائعة، الدكتورة سارة محمود طبيبة ممتازة والنتائج فاقت توقعاتي.',
    date: '2025-02-20',
  },
  {
    id: '3',
    name: 'خالد عبدالرحمن',
    rating: 4,
    comment: 'خدمة مميزة وسرعة في الاستجابة، حجزت موعد بسهولة وكانت الزيارة مرتبة ومنظمة. أنصح الجميع بزيارة المستشفى.',
    date: '2025-03-10',
  },
  {
    id: '4',
    name: 'نورة السيد',
    rating: 5,
    comment: 'أفضل مستشفى زرتها، النظافة والترتيب والاهتمام بالتفاصيل يعكس احترافية عالية. الحجز الإلكتروني سهل جدًا.',
    date: '2025-04-05',
  },
  {
    id: '5',
    name: 'سلطان عادل',
    rating: 5,
    comment: 'شكرًا لفريق الطوارئ على سرعة الاستجابة والتعامل المحترف. أنقذتم حياة والدي وكلنا امتنان لكم.',
    date: '2025-05-12',
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'أهمية الفحص الدوري للقلب',
    excerpt: 'تعرف على أهمية إجراء فحص دوري للقلب وكيف يمكن أن ينقذ حياتك',
    content: 'الفحص الدوري للقلب من أهم الإجراءات الوقائية التي يجب على كل شخص الاهتمام بها، خاصة بعد سن الأربعين...',
    category: 'صحة القلب',
    date: '2025-05-20',
    image: 'https://images.pexels.com/photos/8460228/pexels-photo-8460228.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'د. أحمد حسن',
  },
  {
    id: '2',
    title: '10 نصائح لصحة العيون',
    excerpt: 'نصائح بسيطة يومية تحافظ على صحة عينيك وتقيك من الأمراض',
    content: 'صحة العيون تتطلب اهتمامًا يوميًا بسيطًا، من ارتداء النظارات الشمسية إلى أخذ فترات راحة من الشاشات...',
    category: 'صحة العيون',
    date: '2025-05-15',
    image: 'https://images.pexels.com/photos/6749757/pexels-photo-6749757.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'د. سارة محمود',
  },
  {
    id: '3',
    title: 'السكري عند الأطفال: دليل شامل',
    excerpt: 'كل ما تحتاج معرفته عن مرض السكري لدى الأطفال وطرق التعامل معه',
    content: 'السكري من النوع الأول يصيب الأطفال بشكل متزايد، والكشف المبكر يساعد في التحكم بالمرض بشكل أفضل...',
    category: 'صحة الأطفال',
    date: '2025-05-10',
    image: 'https://images.pexels.com/photos/8460049/pexels-photo-8460049.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'د. ليلى إبراهيم',
  },
  {
    id: '4',
    title: 'العناية بالبشرة في فصل الصيف',
    excerpt: 'نصائح طبية متخصصة لحماية بشرتك من أشعة الشمس الحارقة',
    content: 'مع ارتفاع درجات الحرارة، تحتاج بشرتك لعناية خاصة تشمل واقي الشمس والترطيب المستمر...',
    category: 'صحة الجلد',
    date: '2025-05-05',
    image: 'https://images.pexels.com/photos/7446660/pexels-photo-7446660.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'د. نادية حسين',
  },
];

export const hospitalInfo = {
  name: 'مستشفى الروضة',
  tagline: 'رعاية طبية متكاملة لعائلتك',
  phone: '+201234567890',
  whatsappNumber: '201234567890',
  emergencyPhone: '+201234567891',
  email: 'info@rawda-hospital.com',
  address: 'الجيزة، مصر',
  workingHours: 'السبت - الخميس: 8:00 ص - 10:00 م',
  emergencyHours: '24 ساعة / 7 أيام',
  stats: {
    doctors: 50,
    specialties: 20,
    patients: 30000,
    years: 15,
  },
  socialLinks: {
    twitter: '#',
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.123456!2d31.2!3d29.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU4JzQ4LjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sar!2seg!4v1234567890',
};

export function getWhatsAppUrl(prefilledMessage?: string) {
  const base = `https://wa.me/${hospitalInfo.whatsappNumber}`;
  return prefilledMessage ? `${base}?text=${encodeURIComponent(prefilledMessage)}` : base;
}
