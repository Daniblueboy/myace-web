export default function CeoWelcomeSection() {
  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
      <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
        <div className="relative max-w-sm mx-auto w-full md:max-w-none md:mx-0">
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/10" />
          <img
            src="/images/ceo.jpg"
            alt="Dr. Endurance Cletus Agonor - CEO of Aceroyal Estates"
            className="relative rounded-3xl w-full aspect-[3/4] md:aspect-auto md:h-[360px] object-cover object-top shadow-xl"
          />
        </div>
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">A Welcome Note from Our CEO</p>
          <h2 className="text-3xl md:text-4xl font-bold">Welcome to Aceroyal Estates</h2>
          <div className="text-muted-foreground text-lg space-y-4">
            <p>
              At AceRoyal Estates, we believe that owning property should never feel like a
              gamble. It should feel like a decision you can stand behind — backed by clear
              documentation, honest guidance, and a team that treats your investment as
              seriously as you do.
            </p>
            <p>
              That belief is why we built AceRoyal on one standard: trust. From our first
              estate to every community we develop today, our goal has stayed the same — to
              give families and investors a real, secure path to property ownership, without
              the uncertainty that too often surrounds real estate in Nigeria.
            </p>
            <p>
              I&apos;m proud of what we&apos;ve built so far, and even more excited about
              what&apos;s ahead. Thank you for trusting AceRoyal with one of the most
              important decisions you&apos;ll ever make.
            </p>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-semibold text-slate-900 dark:text-white">Dr. Endurance Cletus Agonor</p>
            <p>CEO and Founder, AceRoyal Estates</p>
          </div>
        </div>
      </div>
    </section>
  );
}
