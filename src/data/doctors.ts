export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
  title: string;
  experience: number;
  image: string;
  bio: string;
  qualifications: string[];
  schedule: { day: string; time: string }[];
}

export const doctors: Doctor[] = [
  {
    id: 'ahmed-hassan',
    name: 'د. أحمد حسن',
    specialty: 'أمراض القلب',
    specialtyId: 'cardiology',
    title: 'استشاري أمراض القلب',
    experience: 18,
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'استشاري أمراض القلب والقسطرة التداخلية، حاصل على البورد العربي في أمراض القلب، وخبرة تزيد عن 18 عامًا في تشخيص وعلاج أمراض القلب والأوعية الدموية.',
    qualifications: ['بكالوريوس الطب - جامعة القاهرة', 'ماجستير أمراض القلب - جامعة عين شمس', 'البورد العربي في أمراض القلب', 'زمالة الكلية الأمريكية لأمراض القلب'],
    schedule: [
      { day: 'الأحد', time: '9:00 ص - 1:00 م' },
      { day: 'الاثنين', time: '9:00 ص - 1:00 م' },
      { day: 'الأربعاء', time: '2:00 م - 6:00 م' },
      { day: 'الخميس', time: '9:00 ص - 1:00 م' },
    ],
  },
  {
    id: 'fatima-ali',
    name: 'د. فاطمة علي',
    specialty: 'طب الأعصاب',
    specialtyId: 'neurology',
    title: 'استشاري طب الأعصاب',
    experience: 15,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'متخصصة في أمراض الجهاز العصبي والدماغ، حاصلة على الزمالة البريطانية في طب الأعصاب، مع خبرة واسعة في علاج الصرع والصداع النصفي.',
    qualifications: ['بكالوريوس الطب - جامعة دمشق', 'ماجستير طب الأعصاب - جامعة لندن', 'الزمالة البريطانية في طب الأعصاب', 'دبلوم علاج الصرع المتقدم'],
    schedule: [
      { day: 'الأحد', time: '10:00 ص - 2:00 م' },
      { day: 'الثلاثاء', time: '10:00 ص - 2:00 م' },
      { day: 'الأربعاء', time: '10:00 ص - 2:00 م' },
      { day: 'الخميس', time: '4:00 م - 8:00 م' },
    ],
  },
  {
    id: 'mohammed-saeed',
    name: 'د. محمد سعيد',
    specialty: 'جراحة العظام',
    specialtyId: 'orthopedics',
    title: 'استشاري جراحة العظام',
    experience: 20,
    image: 'https://images.pexels.com/photos/8460123/pexels-photo-8460123.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'خبير في جراحة المفاصل والعمود الفقري، حاصل على البورد الألماني في جراحة العظام، وأجرى أكثر من 3000 عملية ناجحة.',
    qualifications: ['بكالوريوس الطب - جامعة الأزهر', 'دكتوراه جراحة العظام - جامعة برلين', 'البورد الألماني في جراحة العظام', 'زمالة جراحة المنظار المفصلي'],
    schedule: [
      { day: 'الأحد', time: '8:00 ص - 12:00 م' },
      { day: 'الاثنين', time: '8:00 ص - 12:00 م' },
      { day: 'الثلاثاء', time: '8:00 ص - 12:00 م' },
      { day: 'الخميس', time: '2:00 م - 6:00 م' },
    ],
  },
  {
    id: 'layla-ibrahim',
    name: 'د. ليلى إبراهيم',
    specialty: 'طب الأطفال',
    specialtyId: 'pediatrics',
    title: 'استشاري طب الأطفال',
    experience: 12,
    image: 'https://images.pexels.com/photos/5722156/pexels-photo-5722156.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'متخصصة في صحة الأطفال وحديثي الولادة، حاصلة على الزمالة الكندية في طب الأطفال، مع شغف برعاية صحة الأطفال وتطويرهم.',
    qualifications: ['بكالوريوس الطب - جامعة الإسكندرية', 'ماجستير طب الأطفال - جامعة تورنتو', 'الزمالة الكندية في طب الأطفال', 'دبلوم حديثي الولادة'],
    schedule: [
      { day: 'الأحد', time: '9:00 ص - 1:00 م' },
      { day: 'الاثنين', time: '3:00 م - 7:00 م' },
      { day: 'الأربعاء', time: '9:00 ص - 1:00 م' },
      { day: 'الخميس', time: '9:00 ص - 1:00 م' },
    ],
  },
  {
    id: 'omar-khalil',
    name: 'د. عمر خليل',
    specialty: 'الباطنة العامة',
    specialtyId: 'internal-medicine',
    title: 'استشاري الباطنة العامة',
    experience: 22,
    image: 'https://images.pexels.com/photos/8460228/pexels-photo-8460228.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'من أقدم استشاريي الباطنة في المنطقة، متخصص في أمراض الجهاز الهضمي والسكري، مع سجل حافل في علاج الأمراض المزمنة.',
    qualifications: ['بكالوريوس الطب - جامعة عين شمس', 'ماجستير الباطنة - جامعة القاهرة', 'دكتوراه أمراض الجهاز الهضمي', 'البورد المصري في الباطنة'],
    schedule: [
      { day: 'الأحد', time: '9:00 ص - 12:00 م' },
      { day: 'الاثنين', time: '9:00 ص - 12:00 م' },
      { day: 'الثلاثاء', time: '9:00 ص - 12:00 م' },
      { day: 'الأربعاء', time: '9:00 ص - 12:00 م' },
    ],
  },
  {
    id: 'sara-mahmoud',
    name: 'د. سارة محمود',
    specialty: 'طب العيون',
    specialtyId: 'ophthalmology',
    title: 'استشاري طب العيون',
    experience: 14,
    image: 'https://images.pexels.com/photos/6749757/pexels-photo-6749757.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'متخصصة في جراحات تصحيح النظر وعلاج أمراض الشبكية، حاصلة على زمالة الكلية الملكية البريطانية لطب العيون.',
    qualifications: ['بكالوريوس الطب - جامعة المنصورة', 'ماجستير طب العيون - جامعة لندن', 'زمالة الكلية الملكية لطب العيون', 'دبلوم تصحيح النظر بالليزر'],
    schedule: [
      { day: 'الأحد', time: '10:00 ص - 2:00 م' },
      { day: 'الثلاثاء', time: '10:00 ص - 2:00 م' },
      { day: 'الأربعاء', time: '4:00 م - 8:00 م' },
      { day: 'الخميس', time: '10:00 ص - 2:00 م' },
    ],
  },
  {
    id: 'khaled-nabil',
    name: 'د. خالد نبيل',
    specialty: 'الجراحة العامة',
    specialtyId: 'surgery',
    title: 'استشاري الجراحة العامة',
    experience: 16,
    image: 'https://images.pexels.com/photos/32828968/pexels-photo-32828968.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'متخصص في جراحة المنظار والتدخل المحدود، حاصل على البورد الفرنسي في الجراحة العامة، وأجرى آلاف العمليات الناجحة.',
    qualifications: ['بكالوريوس الطب - جامعة أسيوط', 'ماجستير الجراحة - جامعة باريس', 'البورد الفرنسي في الجراحة', 'زمالة جراحة المنظار المتقدمة'],
    schedule: [
      { day: 'الأحد', time: '8:00 ص - 12:00 م' },
      { day: 'الاثنين', time: '8:00 ص - 12:00 م' },
      { day: 'الأربعاء', time: '8:00 ص - 12:00 م' },
    ],
  },
  {
    id: 'nadia-hussein',
    name: 'د. نادية حسين',
    specialty: 'الأمراض الجلدية',
    specialtyId: 'dermatology',
    title: 'استشاري الأمراض الجلدية',
    experience: 10,
    image: 'https://images.pexels.com/photos/7446660/pexels-photo-7446660.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'متخصصة في الأمراض الجلدية والتجميل، حاصلة على البورد العربي في الأمراض الجلدية، وخبيرة في إجراءات الليزر والحقن التجميلية.',
    qualifications: ['بكالوريوس الطب - جامعة المنيا', 'ماجستير الأمراض الجلدية - جامعة القاهرة', 'البورد العربي في الأمراض الجلدية', 'دبلوم التجميل بالليزر'],
    schedule: [
      { day: 'الأحد', time: '11:00 ص - 3:00 م' },
      { day: 'الثلاثاء', time: '11:00 ص - 3:00 م' },
      { day: 'الخميس', time: '3:00 م - 7:00 م' },
    ],
  },
];
