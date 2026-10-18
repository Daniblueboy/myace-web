import { WhyChooseAceroyal } from '@/components/home/WhyChooseAceroyal';

// Image-led split: real team photography carries the "people you can
// trust" point that a grid of icon cards could only state.
export default function WhyChooseSection() {
  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
      <div className="container grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <img
          src="/images/brand/advisory-team.jpg"
          alt="Members of the Aceroyal Estates team"
          width={1000}
          height={1250}
          loading="lazy"
          className="mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl object-cover object-top shadow-xl md:max-w-none"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why Aceroyal</p>
          <h2 className="mt-2 mb-8 text-3xl md:text-4xl font-bold">Why Choose Aceroyal</h2>
          <WhyChooseAceroyal />
        </div>
      </div>
    </section>
  );
}
