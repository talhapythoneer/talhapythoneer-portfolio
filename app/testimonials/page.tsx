import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "500+ verified client reviews from Fiverr and Upwork. See what clients across 40+ countries say about working with Talha Pythoneer on web scraping, data scraping, and AI automation projects.",
  alternates: { canonical: "https://www.talhapythoneer.com/testimonials" },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
