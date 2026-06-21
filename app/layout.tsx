import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { featuredReviews } from "@/data/reviews";
import { getAllReviews } from "@/data/reviewsServer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.talhapythoneer.com"),
  title: {
    default: "Talha Pythoneer — Expert Python Web Scraping & Agentic AI Developer",
    template: "%s | Talha Pythoneer",
  },
  description:
    "Talha Pythoneer is a professional Python developer with 6+ years of experience and 1500+ completed projects. Expert in web scraping, data scraping, browser automation, and agentic AI solutions using LangChain, CrewAI, Selenium, and Playwright.",
  keywords: [
    "Talha Pythoneer",
    "Python web scraping",
    "data scraping",
    "web scraping expert",
    "Selenium automation",
    "BeautifulSoup",
    "Scrapy",
    "Playwright",
    "agentic AI",
    "LangChain developer",
    "CrewAI",
    "AutoGen",
    "Python developer",
    "browser automation",
    "API integration",
    "data extraction",
    "web crawler",
    "freelance Python developer",
    "AI automation engineer",
  ],
  authors: [{ name: "Talha Pythoneer", url: "https://www.talhapythoneer.com" }],
  creator: "Talha Pythoneer",
  publisher: "Talha Pythoneer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.talhapythoneer.com",
    siteName: "Talha Pythoneer Portfolio",
    title: "Talha Pythoneer — Expert Python Web Scraping & Agentic AI Developer",
    description:
      "Professional Python developer with 1500+ completed projects. Expert in web scraping, data scraping, browser automation, and agentic AI solutions.",
    images: [
      {
        url: "/assets/img/porifle_v1.png",
        width: 200,
        height: 200,
        alt: "Talha Pythoneer — Python Developer and Web Scraping Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Pythoneer — Python Web Scraping Expert",
    description:
      "Expert Python developer specializing in web scraping, data scraping, and AI automation. 6+ years experience, 1500+ projects.",
    images: ["/assets/img/porifle_v1.png"],
  },
  alternates: {
    canonical: "https://www.talhapythoneer.com",
  },
  verification: {
    google: "uQg4mm3he0dJnOB3R8aiRvxNvTNJFVMZ6baDKa5dSwo",
  },
  category: "technology",
  other: {
    "geo.region": "PK",
    "geo.placename": "Pakistan",
    "theme-color": "#E11D48",
  },
};

// Real client reviews surfaced as structured data so search engines can show
// review snippets. Loaded from the full CSV at build time; falls back to the
// curated set. Picks the most substantial comments and caps the count to keep
// page weight reasonable.
const allReviews = getAllReviews();
const reviewSource = allReviews.length > 0 ? allReviews : featuredReviews;
const reviewSchema = reviewSource
  .filter((r) => r.comment && r.comment.trim().length > 40)
  .sort((a, b) => b.comment.length - a.comment.length)
  .slice(0, 30)
  .map((r) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    author: { "@type": "Person", name: r.username },
    reviewBody: r.comment,
    ...(r.reviewer_country ? { locationCreated: { "@type": "Place", name: r.reviewer_country } } : {}),
  }));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Talha Pythoneer",
      alternateName: ["TalhaPythoneer", "Talha"],
      description:
        "Expert Python developer specializing in web scraping, data scraping, browser automation, and agentic AI solutions with 6+ years of experience and 1500+ completed projects.",
      url: "https://www.talhapythoneer.com",
      image: "https://www.talhapythoneer.com/assets/img/porifle_v1.png",
      email: "talha.ifn@gmail.com",
      telephone: "+923147514566",
      jobTitle: [
        "Python Developer",
        "Web Scraping Expert",
        "Data Scraping Engineer",
        "AI Automation Engineer",
        "Agentic AI Developer",
      ],
      sameAs: [
        "https://www.fiverr.com/talhapythoneer",
        "https://www.upwork.com/freelancers/~01b746699831a5bb51",
        "https://github.com/talhapythoneer",
        "https://linkedin.com/in/talhapythoneer",
      ],
      address: { "@type": "PostalAddress", addressCountry: "PK" },
      nationality: { "@type": "Country", name: "Pakistan" },
      knowsAbout: [
        "Web Scraping",
        "Data Scraping",
        "Data Extraction",
        "Python",
        "Selenium",
        "Playwright",
        "Scrapy",
        "BeautifulSoup",
        "Browser Automation",
        "Anti-bot Bypass",
        "LangChain",
        "CrewAI",
        "AutoGen",
        "Agentic AI",
        "LLM Applications",
        "API Integration",
        "Data Pipelines",
      ],
      knowsLanguage: ["en"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Python Developer & Web Scraping Expert",
        occupationLocation: { "@type": "Country", name: "Pakistan" },
        skills:
          "Web scraping, data scraping, browser automation, anti-bot bypass, agentic AI, LangChain, CrewAI, Selenium, Playwright, Scrapy",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "625",
        reviewCount: "625",
      },
      review: reviewSchema,
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.talhapythoneer.com/#service",
      name: "Talha Pythoneer — Python Web Scraping & Data Scraping Services",
      description:
        "Professional web scraping, data scraping, browser automation, and AI automation services for businesses worldwide.",
      url: "https://www.talhapythoneer.com",
      image: "https://www.talhapythoneer.com/assets/img/porifle_v1.png",
      priceRange: "$$",
      provider: { "@type": "Person", name: "Talha Pythoneer" },
      areaServed: { "@type": "Place", name: "Worldwide" },
      serviceType: [
        "Web Scraping",
        "Data Scraping",
        "Data Extraction",
        "Python Development",
        "Browser Automation",
        "API Integration",
        "AI Agent Development",
        "Agentic AI Solutions",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Python & AI Automation Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Scraping & Data Extraction" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Browser Automation & Anti-bot Bypass" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic AI & LLM Pipelines" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Pipelines & API Integration" } },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "625",
        bestRating: "5",
      },
      review: reviewSchema,
    },
    {
      "@type": "WebSite",
      name: "Talha Pythoneer Portfolio",
      url: "https://www.talhapythoneer.com",
      inLanguage: "en-US",
      author: { "@type": "Person", name: "Talha Pythoneer" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
