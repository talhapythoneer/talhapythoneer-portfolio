"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const contacts = [
  {
    label: "Email",
    value: "talha.ifn@gmail.com",
    href: "mailto:talha.ifn@gmail.com",
    sublabel: "Direct email — typically replies within a few hours",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 8.586 6.293a2 2 0 0 0 2.828 0L22 7" />
      </svg>
    ),
    external: false,
  },
  {
    label: "WhatsApp",
    value: "+92 314 7514566",
    href: "https://wa.me/923147514566",
    sublabel: "Fast responses — use for urgent projects",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.449C18.245 1.16 15.24 0 12.05 0 5.465 0 .101 5.334.1 11.895c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652A11.97 11.97 0 0 0 12.05 24h.006c6.585 0 11.946-5.334 11.946-11.894a11.824 11.824 0 0 0-3.481-8.657zm-8.47 18.282h-.005a9.947 9.947 0 0 1-5.031-1.362l-.361-.214-3.742.977.998-3.634-.236-.374a9.87 9.87 0 0 1-1.528-5.273c.001-5.45 4.458-9.888 9.945-9.888a9.885 9.885 0 0 1 7.021 2.902 9.835 9.835 0 0 1 2.912 7.005c-.003 5.451-4.46 9.861-9.973 9.861zm5.453-7.388c-.3-.148-1.764-.866-2.038-.964-.273-.101-.472-.148-.671.148-.199.3-.77.964-.943 1.164-.173.198-.347.221-.647.074-.3-.148-1.263-.463-2.41-1.48-.89-.79-1.49-1.765-1.665-2.065-.173-.3-.018-.463.13-.61.134-.134.298-.347.447-.52.149-.173.199-.298.298-.497.1-.198.05-.373-.025-.52-.075-.148-.671-1.611-.919-2.206-.242-.579-.487-.5-.671-.51-.173-.008-.372-.01-.571-.01-.199 0-.522.074-.795.372-.273.3-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.572-.347z" />
      </svg>
    ),
    external: true,
  },
  {
    label: "Fiverr",
    value: "@talhapythoneer",
    href: "https://www.fiverr.com/talhapythoneer",
    sublabel: "Pro Vetted · Top Rated · 4.9★ · 625+ reviews",
    icon: (
      <svg width="24" height="24" viewBox="0 0 89 27" fill="currentColor">
        <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
        <circle cx="85.3" cy="23.3" r="3.7" fill="#1dbf73" />
      </svg>
    ),
    external: true,
  },
  {
    label: "Upwork",
    value: "talhapythoneer",
    href: "https://www.upwork.com/freelancers/~01b746699831a5bb51",
    sublabel: "Top Rated · 100% Job Success Score",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H8.559v7.082c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H1.462v7.082c0 2.282 1.862 4.158 4.17 4.158 2.282 0 4.144-1.876 4.144-4.158v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.212l1.161-5.456c1.287.856 2.761 1.341 4.114 1.341C21.318 16.364 24 13.682 24 10.45c0-3.079-2.525-5.432-5.439-5.432z" />
      </svg>
    ),
    external: true,
  },
  {
    label: "GitHub",
    value: "@talhapythoneer",
    href: "https://github.com/talhapythoneer",
    sublabel: "Open source projects and code samples",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    external: true,
  },
  {
    label: "LinkedIn",
    value: "talhapythoneer",
    href: "https://linkedin.com/in/talhapythoneer",
    sublabel: "Professional network and career history",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    external: true,
  },
];

function ContactCard({ contact, index }: { contact: (typeof contacts)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={contact.href}
      target={contact.external ? "_blank" : undefined}
      rel={contact.external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative card-glass rounded-2xl p-6 flex flex-col gap-4 hover:border-[#E11D48]/40 transition-all duration-300 block"
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E11D48]/8 to-transparent pointer-events-none"
      />

      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#171717] flex items-center justify-center text-[#A3A3A3] group-hover:text-[#E11D48] group-hover:border-[#E11D48]/40 transition-all duration-300">
          {contact.icon}
        </div>
        <motion.span
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          className="text-[#E11D48] text-lg"
        >
        </motion.span>
      </div>

      <div>
        <p className="section-label text-[0.65rem] mb-1">{contact.label}</p>
        <p className="font-mono font-semibold text-[#FAFAFA] text-sm group-hover:text-[#E11D48] transition-colors duration-300 break-all">
          {contact.value}
        </p>
        <p className="text-[#FAFAFA] text-[0.7rem] mt-1 leading-relaxed">{contact.sublabel}</p>
      </div>
    </motion.a>
  );
}

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Get In Touch"
          title="Let's Talk About Your Project"
         />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {contacts.map((contact, i) => (
            <ContactCard key={contact.label} contact={contact} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
}
