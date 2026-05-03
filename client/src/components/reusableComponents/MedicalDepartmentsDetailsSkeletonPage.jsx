export default function MedicalDepartmentsDetailsSkeletonPage() {
  return (
    <div className="bg-[#f8fbfe]">
      {/* Breadcrumb skeleton */}
      <section className="relative h-[220px] overflow-hidden bg-slate-200">
        <div className="absolute inset-0 bg-slate-300/40" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <PulseBlock className="h-4 w-56 rounded-full bg-white/60" />
          <PulseBlock className="mt-6 h-10 w-72 bg-white/70" />
        </div>
      </section>

      {/* Hero skeleton */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div>
            <PulseBlock className="h-9 w-36 rounded-full" />
            <PulseBlock className="mt-5 h-12 w-3/4" />
            <PulseBlock className="mt-3 h-12 w-2/3" />

            <div className="mt-5 space-y-3">
              <PulseBlock className="h-4 w-full max-w-2xl" />
              <PulseBlock className="h-4 w-full max-w-xl" />
              <PulseBlock className="h-4 w-5/6 max-w-2xl" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <PulseBlock className="h-10 w-44 rounded-full" />
              <PulseBlock className="h-10 w-40 rounded-full" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
            <PulseBlock className="h-[320px] w-full rounded-none md:h-[420px]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <PulseBlock className="h-8 w-40 rounded-full bg-white/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview skeleton */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <PulseBlock className="h-4 w-36" />
          <PulseBlock className="mt-3 h-10 w-80" />

          <div className="mt-6 space-y-4">
            <PulseBlock className="h-4 w-full" />
            <PulseBlock className="h-4 w-full" />
            <PulseBlock className="h-4 w-5/6" />
          </div>
        </div>
      </section>

      {/* Two cards skeleton */}
      <section className="mx-auto mb-8 max-w-7xl px-6 py-2 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((card) => (
            <div
              key={card}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <PulseBlock className="h-4 w-32" />
              <PulseBlock className="mt-2 h-10 w-72" />
              <PulseBlock className="mt-4 h-4 w-full" />
              <PulseBlock className="mt-2 h-4 w-5/6" />

              <div className="mt-8 space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <PulseBlock className="mt-1 h-7 w-7 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <PulseBlock className="h-4 w-full" />
                      <PulseBlock className="h-4 w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA skeleton */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] p-8 shadow-[0_24px_60px_rgba(21,98,160,0.22)] md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <PulseBlock className="h-8 w-72 bg-white/25" />
              <div className="mt-3 space-y-2">
                <PulseBlock className="h-4 w-full bg-white/20" />
                <PulseBlock className="h-4 w-5/6 bg-white/20" />
              </div>
            </div>

            <div className="flex flex-nowrap gap-3">
              <PulseBlock className="h-12 w-44 rounded-full bg-white/80" />
              <PulseBlock className="h-12 w-36 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function PulseBlock({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-slate-200/70 ${className}`} />
  );
}
