const states = [
  'Lagos',
  'Abuja (FCT)',
  'Ogun',
  'Oyo',
  'Rivers',
  'Cross River',
  'Enugu',
  'Kaduna',
];

export function StatesSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">States We Operate In</h2>
          <p className="text-muted-foreground">
            Nationwide coverage with strong local presence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {states.map((state) => (
            <div
              key={state}
              className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-4 text-center font-medium text-slate-700 dark:text-slate-100 shadow-sm"
            >
              {state}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
