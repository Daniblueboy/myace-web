import { WhyChooseAceroyal } from '@/components/home/WhyChooseAceroyal';

export default function WhyChooseSection() {
  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Why Aceroyal</p>
          <h2 className="text-3xl font-bold mt-2">Why Choose Aceroyal</h2>
        </div>
        <WhyChooseAceroyal />
      </div>
    </section>
  );
}
