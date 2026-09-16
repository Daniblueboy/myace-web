// Only states where an active or previously delivered estate actually
// exists — do not list aspirational/unconfirmed coverage.
const states = ['Lagos', 'Abuja (FCT)', 'Oyo', 'Enugu', 'Edo'];

export function StatesSection() {
  return (
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl font-bold mb-3">States We Operate In</h2>
          <p className="text-muted-foreground">
            Nationwide coverage with strong local presence.
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {states.map((state) => (
            <div
              key={state}
              className="shrink-0 w-[45%] snap-center rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-4 text-center font-medium text-slate-700 dark:text-slate-100 shadow-sm lg:w-auto lg:shrink"
            >
              {state}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
