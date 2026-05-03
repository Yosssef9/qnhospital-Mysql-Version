import { motion } from "framer-motion";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const news = [
  {
    title: "Announcement for Board of Directors Nomination",
    image: "/images/NewsArea/WhatsApp Image 2025-04-21 at 2.16.30 PM.jpeg",
    date: "20 Apr 2025",
    to: "/news/board-nomination",
  },
  {
    title: "دعوة الجمعية العامة العادية لشركة القصيم للخدمات الطبية",
    image: "/images/NewsArea/24-04.jpg",
    date: "27 May 2025",
    to: "/news/general-assembly",
  },
  {
    title: "دعوة الجمعية العامة غير العادية لشركة القصيم الطبية",
    image: "/images/NewsArea/logomedium.jpg",
    date: "30 Aug 2023",
    to: "/news/extraordinary-assembly",
  },
];

const achievements = [
  {
    title: "Achievements of the Kidney department (second achievement)",
    image: "/images/NewsArea/thumbnail_DSC_0277.jpg",
    date: "16 Oct 2022",
    excerpt:
      "Highlights of the kidney department’s recent achievement and outcomes.",
    to: "/achievements/kidney-dept",
  },
  {
    title: "Spleen removal ends the suffering of a 34 year old patient",
    image: "/images/NewsArea/default.png",
    date: "27 Jan 2025",
    excerpt:
      "A successful case that improved the patient’s quality of life significantly.",
    to: "/achievements/spleen-removal",
  },
  {
    title: "A complicated surgery saves an eighty woman at QNH",
    image: "/images/NewsArea/default.png",
    date: "10 Oct 2019",
    excerpt:
      "The medical team successfully handled a complex surgery with excellent results.",
    to: "/achievements/complicated-surgery",
  },
  {
    title: "A lady gives birth to three twins",
    image: "/images/NewsArea/default.png",
    date: "18 Oct 2023",
    excerpt:
      "A remarkable delivery case managed by our experienced obstetrics team.",
    to: "/achievements/triplets",
  },
];

export default function NewsArea2() {
  const [active, setActive] = useState(0);

  const featured = useMemo(() => achievements[active], [active]);

  return (
    <section className="bg-white">
      <div className="mx-auto px-6 md:px-40 py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Latest News */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="Updates"
              title="Latest News"
              linkText="View all"
              linkHref="/news"
            />

            <div className="mt-5 space-y-3">
              {news.map((n, idx) => (
                <a
                  key={idx}
                  href={n.to}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={n.image}
                    alt={n.title}
                    className="h-20 w-20 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[rgb(21,98,160)]">
                      {n.date}
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-900 line-clamp-2">
                      {n.title}
                    </div>

                    <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 group-hover:text-[rgb(21,98,160)] transition">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Featured Achievement */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <SectionHeader
              label="Highlights"
              title="Latest Achievement"
              linkText="All achievements"
              linkHref="/achievements"
            />

            <div className="mt-5 grid grid-cols-1 xl:grid-cols-5 gap-4">
              {/* Featured card */}
              <div className="xl:col-span-3">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="h-[240px] md:h-[280px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs font-semibold text-white/90">
                        {featured.date}
                      </div>
                      <h3 className="mt-1 text-lg md:text-xl font-extrabold text-white leading-snug">
                        {featured.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col min-h-[160px]">
                    <p className="text-sm text-slate-600 leading-6">
                      {featured.excerpt}
                    </p>

                    {/* ALWAYS bottom */}
                    <div className="mt-auto pt-4">
                      <Button text={"Read More"} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="xl:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-extrabold text-slate-900">
                    More highlights
                  </div>

                  <div className="mt-4 space-y-3">
                    {achievements.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={[
                          "w-full text-left flex gap-3 rounded-2xl border bg-white p-3 transition",
                          i === active
                            ? "border-[rgba(21,98,160,0.45)] ring-1 ring-[rgba(21,98,160,0.20)]"
                            : "border-slate-200 hover:shadow-sm",
                        ].join(" ")}
                      >
                        <img
                          src={a.image}
                          alt={a.title}
                          className="h-14 w-14 rounded-xl object-cover border border-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-[rgb(21,98,160)]">
                            {a.date}
                          </div>
                          <div className="mt-1 text-sm font-bold text-slate-900 line-clamp-2">
                            {a.title}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ label, title, linkText, linkHref }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-[rgb(21,98,160)]">{label}</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">
          {title}
        </h2>
        <div className="mt-3 h-[3px] w-14 bg-[rgb(21,98,160)] rounded-full" />
      </div>

      <a
        href={linkHref}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
      >
        {linkText} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
