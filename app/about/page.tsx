import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Talha Pythoneer — a Python developer with 6+ years of experience specializing in web scraping, data scraping, browser automation, and agentic AI. 1500+ completed projects on Fiverr and Upwork.",
  alternates: { canonical: "https://www.talhapythoneer.com/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
