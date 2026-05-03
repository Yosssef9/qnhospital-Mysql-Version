import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { ArrowRight, Mail, PhoneCall, MapPin } from "lucide-react";
import { CONTACT } from "../data/contact";

const links1 = [
  { label: "QNH History", href: "/about#history" },
  { label: "Mission & Vision", href: "/about#mission" },
  { label: "Patients Rights", href: "/patients-rights" },
  { label: "Hospital Accreditations", href: "/accreditations" },
  { label: "Staff Portal", href: "/staff" },
];

const links2 = [
  { label: "Clinics", href: "/departments#clinics" },
  { label: "Centers", href: "/departments#centers" },
  { label: "Units", href: "/departments#units" },
  { label: "Medical Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
];

const links3 = [
  { label: "Photo Gallery", href: "/media/photos" },
  { label: "Video Gallery", href: "/media/videos" },
  { label: "QNH Magazine", href: "/media/magazine" },
  { label: "Latest Achievements", href: "/achievements" },
];

export default function Footer2() {
  return (
    <footer className="mt-auto">
      {/* Top */}
      <div className="bg-white border-t border-slate-200">
        <div className="mx-auto px-6 md:px-40 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand / Contact */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/newLogo.jpg"
                  alt="Qassim National Hospital"
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <div className="text-lg font-extrabold text-slate-900">
                    Qassim National Hospital
                  </div>
                  <div className="text-sm text-slate-600">
                    Patient-first care • Modern services
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-[rgb(21,98,160)] mt-0.5" />
                  <span>Buraydah, Al-Qassim, Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-5 w-5 text-[rgb(21,98,160)]" />
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="hover:text-[rgb(21,98,160)] transition"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[rgb(21,98,160)]" />
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="transition hover:text-[rgb(21,98,160)]"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="mt-6 flex items-center gap-3">
                {[
                  { Icon: FaFacebookF, href: "#" },
                  { Icon: FaTwitter, href: "#" },
                  { Icon: FaInstagram, href: "#" },
                  { Icon: FaYoutube, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[rgb(21,98,160)] hover:border-[rgba(21,98,160,0.35)] hover:bg-[rgba(21,98,160,0.06)] transition"
                    aria-label="social"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <FooterCol title="About" links={links1} />
            <FooterCol title="Departments" links={links2} />
            <FooterCol title="Media" links={links3} />
          </div>

          {/* Newsletter */}
          {/* <motion.div
            className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="text-sm font-semibold text-[rgb(21,98,160)]">
                Newsletter
              </div>
              <div className="mt-1 text-2xl font-extrabold text-slate-900">
                Subscribe for updates
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Receive announcements, services updates, and hospital news.
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full sm:w-[280px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(21,98,160,0.25)] focus:border-[rgba(21,98,160,0.45)] transition"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(21,98,160)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div> */}
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gradient-to-b from-[rgba(0,140,255,0.12)] via-white/80 to-white backdrop-blur-md border-t border-slate-200">
        {" "}
        <div className="mx-auto px-6 md:px-40 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600 text-center md:text-left">
            © {new Date().getFullYear()} Al Qassim National Hospital. Powered by{" "}
            <span className="font-semibold ">
              {" "}
              <a className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 cursor-pointer">
                QNH Team
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Council of Health Insurance
            </span>
            <a
              href="https://www.chi.gov.sa/pages/Home.aspx"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[rgb(21,98,160)] hover:underline"
            >
              Visit
            </a>
            <img
              src="/images/chi logo.png"
              className="h-9 w-auto object-contain"
              alt="CHI Logo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm text-slate-600 hover:text-[rgb(21,98,160)] transition"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
