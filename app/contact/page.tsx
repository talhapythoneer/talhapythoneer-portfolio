import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Talha Pythoneer for web scraping, data scraping, Python automation, or agentic AI projects. Available on Fiverr, Upwork, email, and WhatsApp.",
  alternates: { canonical: "https://www.talhapythoneer.com/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
