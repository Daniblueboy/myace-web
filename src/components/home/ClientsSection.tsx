export function ClientsSection() {
  const partners = [
    { name: 'Dangote', logo: 'https://logo.clearbit.com/dangote.com' },
    { name: 'FirstBank', logo: 'https://logo.clearbit.com/firstbanknigeria.com' },
    { name: 'Julius Berger', logo: 'https://logo.clearbit.com/julius-berger.com' },
    { name: 'MTN', logo: 'https://logo.clearbit.com/mtn.com' },
    { name: 'Shell', logo: 'https://logo.clearbit.com/shell.com' },
  ];

  return (
    <section className="container py-20 md:py-28 border-t border-slate-100">
      <h3 className="text-center font-medium text-slate-400 mb-8 uppercase tracking-widest text-sm">Trusted By Leading Companies</h3>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        {partners.map((p, i) => (
          <img key={i} src={p.logo} alt={p.name} className="h-12 w-auto object-contain" />
        ))}
      </div>
    </section>
  );
}
