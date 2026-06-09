import ScrollReveal from './ScrollReveal';

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, light = false }: Props) {
  return (
    <ScrollReveal className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-white/70' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1 rounded-full mx-auto mt-6 ${light ? 'bg-white/40' : 'bg-primary-500/30'}`}>
        <div className={`w-10 h-1 rounded-full mx-auto -mt-0 ${light ? 'bg-white' : 'bg-primary-500'}`} />
      </div>
    </ScrollReveal>
  );
}
