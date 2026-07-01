export type ProjectType = "Web Scraping" | "Agentic AI" | "Web Development";

export interface Project {
  id: number;
  projectType: ProjectType;
  title: string;
  imagePath: string;
  shortDescription: string;
  toolsStack: string[];
  features: string[];
  businessBenefits: string[];
}

export const projects: Project[] = [

  // AGENTIC AI

  {
    id: 1,
    projectType: "Agentic AI",
    title: "Pima County Legal AI Agent",
    imagePath: "/assets/img/projects/pima-county.png",
    shortDescription: "Daily automated agent pulling distressed property signals from county public records",
    toolsStack: ["Python", "Playwright", "Groq API", "GPT-OSS-120B", "Pandas", "Google Sheets API"],
    features: [
      "Pulls from 6 document types daily: liens, judgments, notices of sale, lis pendens, death certificates, AHCCCS liens",
      "Extracts structured fields per document: names, addresses, claim amounts, plaintiffs, defendants, filing dates",
      "Organises output into separate sheets per document type automatically",
      "Runs on a daily schedule with no manual intervention required",
      "Surfaces everything in a dashboard the client checks every morning",
    ],
    businessBenefits: [
      "Real estate teams spot motivated seller signals before they hit the open market",
      "Eliminates hours of manual county portal research every day",
      "Legal teams get clean structured data instead of raw document dumps",
      "Reusable across any US county portal with minimal reconfiguration",
    ],
  },

  {
    id: 2,
    projectType: "Agentic AI",
    title: "Multi-County Government Records Scraper",
    imagePath: "/assets/img/projects/county.png",
    shortDescription: "Reusable agentic framework deployed across 50+ county government websites to extract and monitor public records",
    toolsStack: ["Python", "Scrapy", "Playwright", "Pandas", "Modular Architecture"],
    features: [
      "Covers permit records, zoning classifications, tax lien data, and ownership history",
      "Modular architecture with shared core logic and per-county configuration",
      "Handles structural and formatting differences across every county portal",
      "Reused across different clients and industries throughout the year",
      "Built-in exception handling for portal downtime and format changes",
    ],
    businessBenefits: [
      "Real estate investors get structured due diligence data without manual portal research",
      "Legal teams receive cross-county public records in one consistent output format",
      "Framework reduces build time significantly for each new county added",
      "Works for any industry that depends on public government data",
    ],
  },

  {
    id: 3,
    projectType: "Agentic AI",
    title: "Verbatim Document Extraction Agent",
    imagePath: "/assets/img/projects/doc-extraction.png",
    shortDescription: "LLM-powered agent extracting bio and experience data from complex mixed-content documents",
    toolsStack: ["Python", "Groq API", "GPT-OSS-120B", "PyMuPDF", "Prompt Engineering"],
    features: [
      "Extracts person-level bio and experience data scattered across multi-page documents",
      "Handles pages where target data is mixed with unrelated financial and stock content",
      "Heavy prompt engineering enforces verbatim extraction with zero summarising or reformatting",
      "Uses Groq for speed and cost efficiency on large document batches",
      "Outputs structured field-level data per person ready for downstream use",
    ],
    businessBenefits: [
      "Solves the verbatim extraction problem that generic LLM prompting fails at",
      "Processes large document batches in a fraction of manual review time",
      "Faithful to source text with no paraphrasing or dropped fields",
      "Reusable for any document type where faithfulness matters more than summarisation",
    ],
  },

  {
    id: 4,
    projectType: "Agentic AI",
    title: "AWS WAF Audio Captcha Bypass",
    imagePath: "/assets/img/projects/aws-waf.png",
    shortDescription: "Novel LLM-based technique for bypassing AWS WAF audio captcha challenges under a live deadline",
    toolsStack: ["Python", "Selenium", "Groq API", "GPT-OSS-120B", "Audio Processing"],
    features: [
      "Detects AWS WAF audio captcha challenges automatically during scraping runs",
      "Captures and parses the audio challenge through an LLM to extract the correct response",
      "Submits the solution and resumes the scraping session without manual intervention",
      "Built and tested live with a client deadline active and no existing documentation to reference",
      "Reused on similar WAF-protected sites for subsequent clients",
    ],
    businessBenefits: [
      "Unlocks data collection from sites previously blocked by AWS WAF audio captcha",
      "No human-in-the-loop needed for captcha resolution during scraping runs",
      "Technique developed from scratch under real production pressure, not a tutorial rehash",
    ],
  },

  // LEGAL AND PROFESSIONAL SERVICES

  {
    id: 5,
    projectType: "Web Scraping",
    title: "400+ Law Firm Websites Pipeline",
    imagePath: "/assets/img/projects/law-firms.png",
    shortDescription: "Structured data extraction pipeline across 400 individual law firm websites for a legal intelligence company",
    toolsStack: ["Python", "BeautifulSoup", "Scrapy", "Proxy Rotation", "Pandas", "Excel"],
    features: [
      "Scraped 400 law firm websites each with a different structure, security layer, and data format",
      "Handled missing fields, inconsistent layouts, and varying anti-bot measures per site",
      "Single pipeline producing one consistent output format across all 400 sources",
      "Built-in QA and data validation before final export",
    ],
    businessBenefits: [
      "Legal intelligence companies get a clean queryable dataset across the full market",
      "Cuts weeks of manual research down to a single automated pipeline run",
      "Client returned with additional projects after delivery",
      "Scales to any number of additional firm websites with minimal reconfiguration",
    ],
  },

  {
    id: 6,
    projectType: "Web Scraping",
    title: "IMDB Contact Data Scraper",
    imagePath: "/assets/img/projects/imdb.png",
    shortDescription: "Filtered extraction of director, producer and writer contact data from IMDB for selected projects",
    toolsStack: ["Python", "BeautifulSoup", "Requests", "Conditional Filtering", "Pandas"],
    features: [
      "Filters projects by genre, year, rating, and type before extraction",
      "Extracts contact data for directors, producers, and writers where publicly available",
      "Handles missing contact fields gracefully without breaking the run",
      "Deduplicates individuals appearing across multiple project credits",
    ],
    businessBenefits: [
      "Production companies build targeted outreach lists for creative talent",
      "Entertainment lawyers identify key personnel attached to optioned projects",
      "Film financiers track which directors and writers are currently active on new work",
    ],
  },

  // COMMERCIAL REAL ESTATE

  {
    id: 7,
    projectType: "Web Scraping",
    title: "LoopNet Commercial Property Scraper",
    imagePath: "/assets/img/projects/loopnet.png",
    shortDescription: "Commercial real estate listing extraction from LoopNet including pricing, size and broker data",
    toolsStack: ["Python", "Playwright", "BeautifulSoup", "Pandas", "PostgreSQL"],
    features: [
      "Extracts listing price, price per sqft, property type, size, and location",
      "Captures broker contact details and listing age",
      "Handles paginated search results across any market or filter combination",
      "Runs on a schedule to track new listings and price changes over time",
    ],
    businessBenefits: [
      "CRE investors monitor new deal flow without manually checking the platform",
      "Attorneys get market comp data before advising on acquisition transactions",
      "Brokers track competitor listing activity across their target markets",
      "Asset managers benchmark asking rents against their existing portfolio",
    ],
  },

  {
    id: 8,
    projectType: "Web Scraping",
    title: "Auction Websites Scraper",
    imagePath: "/assets/img/projects/auctions.png",
    shortDescription: "Multi-platform auction listing and result extraction across real estate, industrial and government auctions",
    toolsStack: ["Python", "Playwright", "Scrapy", "Pandas", "PostgreSQL"],
    features: [
      "Covers multiple auction platforms in a single pipeline run",
      "Extracts lot details, starting bids, reserve prices, and final sale results",
      "Monitors new listings by asset type and location",
      "Tracks historical price data across auction cycles for the same asset categories",
    ],
    businessBenefits: [
      "CRE investors track distressed property pricing before it surfaces on listing platforms",
      "Procurement teams monitor industrial equipment auctions to reduce acquisition costs",
      "Real estate attorneys use auction result data for comps in dispute and valuation cases",
    ],
  },

  // RESIDENTIAL REAL ESTATE

  {
    id: 9,
    projectType: "Web Scraping",
    title: "Airbnb 60-Day Forward Pricing Scraper",
    imagePath: "/assets/img/projects/airbnb.png",
    shortDescription: "Scraper pulling 60 days of forward calendar pricing per Airbnb property for seasonal demand analysis",
    toolsStack: ["Python", "Playwright", "Pandas", "Cron Scheduling"],
    features: [
      "Pulls nightly pricing across a 60-day forward calendar per property",
      "Captures date-range specific pricing, not just today's rate",
      "Runs on a schedule to track price changes over time",
      "Structures output for time-series analysis by property and date",
    ],
    businessBenefits: [
      "Short-term rental investors analyse seasonal demand patterns before buying",
      "Hosts identify competitor pricing gaps across any 60-day window",
      "Revenue managers spot event-driven price spikes in advance",
      "Replaces expensive third-party STR data tools with direct source data",
    ],
  },

  {
    id: 10,
    projectType: "Web Scraping",
    title: "Apartments.com Rental Listings Scraper",
    imagePath: "/assets/img/projects/apartments.png",
    shortDescription: "Large-scale rental listing extraction covering pricing, amenities and availability across US cities",
    toolsStack: ["Python", "Playwright", "Scrapy", "PostgreSQL", "Pandas"],
    features: [
      "Extracts unit pricing, bedroom count, amenities, and availability per listing",
      "Captures neighbourhood-level data for market aggregation",
      "Handles pagination and lazy-loaded listing content",
      "Tracks listing changes over time when run on a schedule",
    ],
    businessBenefits: [
      "Property managers benchmark competitor pricing before setting rents",
      "Multifamily investors analyse vacancy trends by neighbourhood",
      "Landlord-tenant attorneys access real market data for dispute cases",
      "Developers identify underserved rental submarkets using availability data",
    ],
  },

  {
    id: 11,
    projectType: "Web Scraping",
    title: "Real Estate Scraper",
    imagePath: "/assets/img/projects/redfin.png",
    shortDescription: "Property listing extraction from Redfin with price history, geographic coordinates and status tracking",
    toolsStack: ["Python", "Scrapy", "Selenium", "PostgreSQL", "GeoPandas"],
    features: [
      "Extracts price, square footage, bedrooms, bathrooms, and lot size per listing",
      "Captures historical price data and property tax information",
      "Maps property locations with geographic coordinates",
      "Tracks listing status changes: active, pending, sold",
    ],
    businessBenefits: [
      "Real estate investors identify undervalued properties using price history and market trends",
      "Appraisal companies access comprehensive property data for accurate valuations",
      "Financial institutions assess property values for lending decisions",
      "Property developers identify land acquisition opportunities by location and price",
    ],
  },

  // HR AND JOBS

  {
    id: 12,
    projectType: "Web Scraping",
    title: "Indeed, LinkedIn and ZipRecruiter Jobs Scraper",
    imagePath: "/assets/img/projects/indeed.png",
    shortDescription: "Multi-platform job aggregation scraper with keyword filtering and deduplication across three major job boards",
    toolsStack: ["Python", "Playwright", "Keyword Filtering", "Deduplication Logic", "Pandas"],
    features: [
      "Pulls job listings from Indeed, LinkedIn, and ZipRecruiter simultaneously",
      "Filters by a configurable keyword set before output",
      "Cross-platform deduplication removes the same job appearing on multiple boards",
      "Extracts job title, company, location, salary range, and posting date",
      "Runs on a schedule for a daily fresh job feed",
    ],
    businessBenefits: [
      "Workforce analysts monitor hiring demand trends across multiple platforms at once",
      "HR teams spot competitor hiring patterns before they become public knowledge",
      "Job seekers get a filtered deduplicated feed without visiting three sites manually",
    ],
  },

  {
    id: 13,
    projectType: "Web Scraping",
    title: "Glassdoor Reviews Scraper",
    imagePath: "/assets/img/projects/glassdoor.png",
    shortDescription: "Structured extraction of employee reviews, ratings and salary data from Glassdoor at scale",
    toolsStack: ["Python", "Playwright", "Pandas", "Proxy Rotation"],
    features: [
      "Extracts reviews, overall ratings, pros, cons, and reviewer role per company",
      "Pulls salary data by role and location where available",
      "Handles authentication flows and dynamic content loading",
      "Covers multiple companies in a single pipeline run",
    ],
    businessBenefits: [
      "HR teams benchmark competitor employer reputation before hiring campaigns",
      "Investors use employee sentiment trend data as part of pre-acquisition due diligence",
      "Compensation analysts get real salary data without paying for premium tools",
      "Employer branding teams identify the exact complaints candidates are reading online",
    ],
  },

  // BUSINESS LEADS AND DIRECTORIES

  {
    id: 14,
    projectType: "Web Scraping",
    title: "Yellow Pages Business Leads Scraper",
    imagePath: "/assets/img/projects/yellowpages.png",
    shortDescription: "Local business lead extraction from Yellow Pages by category and geography",
    toolsStack: ["Python", "Requests", "BeautifulSoup", "Pandas", "Excel"],
    features: [
      "Extracts business name, phone, address, website, and category",
      "Filters by business type and geographic area before output",
      "Validates contact data and removes duplicates",
      "Covers any city and category combination",
    ],
    businessBenefits: [
      "Field sales teams get targeted local business lists without buying lead databases",
      "Franchise development teams identify candidate markets by business density",
      "Trade service platforms build supplier directories from verified local listings",
    ],
  },

  {
    id: 15,
    projectType: "Web Scraping",
    title: "Clutch Agency Directory Scraper",
    imagePath: "/assets/img/projects/clutch.png",
    shortDescription: "B2B agency extraction from Clutch including ratings, reviews, specialisations and contact data",
    toolsStack: ["Python", "Playwright", "Pagination Handling", "Pandas", "CSV Export"],
    features: [
      "Extracts agency name, ratings, review count, hourly rate, team size, and specialisations",
      "Captures individual review text and client details where available",
      "Handles full pagination across thousands of agency profiles",
      "Filters by category, location, and company size during extraction",
    ],
    businessBenefits: [
      "Sales teams build targeted B2B outreach lists from verified agency data",
      "Companies benchmark competitors by rating, pricing, and specialisation",
      "Legal tech vendors identify law firm technology partners for outreach",
    ],
  },

  // HOSPITALITY AND EVENTS

  {
    id: 16,
    projectType: "Web Scraping",
    title: "Booking.com Listing Reviews Scraper",
    imagePath: "/assets/img/projects/booking.png",
    shortDescription: "Large-scale guest review extraction from Booking.com listings structured by property",
    toolsStack: ["Python", "Playwright", "Pagination Handling", "Pandas", "CSV Export"],
    features: [
      "Extracts review text, score, reviewer nationality, and date per listing",
      "Handles deeply paginated review sections per property",
      "Maintains correct property attribution across multi-property scraping runs",
      "Outputs a clean review dataset ready for sentiment analysis",
    ],
    businessBenefits: [
      "Hotel teams identify recurring guest complaints before they compound into rating drops",
      "Hospitality investors detect undisclosed operational issues during property due diligence",
      "OTA account managers benchmark client review scores against direct competitors",
    ],
  },

  {
    id: 17,
    projectType: "Web Scraping",
    title: "RA.co Events Data Scraper",
    imagePath: "/assets/img/projects/ra.png",
    shortDescription: "Global electronic music event extraction from Resident Advisor covering artists, venues and dates",
    toolsStack: ["Python", "Playwright", "BeautifulSoup", "PostgreSQL", "Pandas"],
    features: [
      "Extracts event name, date, venue, city, artist lineup, and ticket price",
      "Covers multiple cities simultaneously in a single pipeline run",
      "Tracks artist booking frequency across markets over time",
      "Captures venue metadata including capacity and event history",
    ],
    businessBenefits: [
      "Booking agents track artist appearance frequency across global markets",
      "Event promoters monitor competitor lineups before announcing their own",
      "Venue investors analyse event density and footfall patterns by city",
      "Music festival curators identify underbooked artists in specific regions",
    ],
  },

  // ECOMMERCE AND RETAIL

  {
    id: 18,
    projectType: "Web Scraping",
    title: "Medical Products Bulk Asset Downloader",
    imagePath: "/assets/img/projects/medical-assets.png",
    shortDescription: "Asynchronous pipeline for downloading 1TB of medical product images and PDF spec sheets",
    toolsStack: ["Python", "aiohttp", "Async Queue", "Retry Logic", "File System Management"],
    features: [
      "Asynchronous downloading for maximum throughput across large asset libraries",
      "Retry and backoff logic handles failed downloads without breaking the full run",
      "Integrity checks verify each file after download",
      "Structured file organisation by product category and SKU",
      "Full logging captures every success, failure, and retry for post-run review",
    ],
    businessBenefits: [
      "Medical ecommerce companies migrate full product asset libraries without manual downloads",
      "Regulatory teams archive product documentation at scale for compliance records",
      "Platform migrations preserve every product image and spec sheet with no data loss",
    ],
  },

  {
    id: 19,
    projectType: "Web Scraping",
    title: "Crypto Market Scraper",
    imagePath: "/assets/img/projects/coinmarketcap.png",
    shortDescription: "Cryptocurrency price, market cap and volume tracking from CoinMarketCap",
    toolsStack: ["Python", "Requests", "BeautifulSoup", "SQLite", "Matplotlib"],
    features: [
      "Extracts prices, market caps, and trading volumes across all listed tokens",
      "Tracks 24h, 7d, and 30d price changes per asset",
      "Monitors circulating supply, max supply, and fully diluted valuation",
      "Captures exchange listings and trading pairs",
      "Generates historical price charts and volatility summaries",
    ],
    businessBenefits: [
      "Traders access real-time market data without relying on rate-limited APIs",
      "Blockchain projects track their own token performance and market position",
      "Financial news teams pull accurate cryptocurrency data for reporting",
      "Investment firms monitor portfolio performance and market trends",
    ],
  },

  {
    id: 20,
    projectType: "Web Scraping",
    title: "AllRecipes Scraper",
    imagePath: "/assets/img/projects/allrecipes.png",
    shortDescription: "Recipe extraction from AllRecipes including ingredients, nutrition, ratings and cook time",
    toolsStack: ["Python", "Scrapy", "BeautifulSoup", "PostgreSQL", "NLTK"],
    features: [
      "Extracts ingredients, instructions, nutrition info, and cook time per recipe",
      "Captures user ratings, review counts, and dietary category tags",
      "Categorises recipes by cuisine, meal type, and dietary restriction",
      "Analyses ingredient substitution patterns and recipe variations",
    ],
    businessBenefits: [
      "Meal kit companies analyse trending recipes to build their weekly menus",
      "Nutrition apps populate their databases with structured recipe content",
      "Supermarkets run targeted promotions based on ingredient demand signals",
      "Food delivery services suggest recipes based on available local inventory",
    ],
  },

  // CONTENT AND MEDIA

  {
    id: 21,
    projectType: "Web Scraping",
    title: "Grantland Full Site Archive",
    imagePath: "/assets/img/projects/grantland.png",
    shortDescription: "Complete static archive of the Grantland blog website including all posts, assets and site structure",
    toolsStack: ["Python", "Site Mirroring", "Asset Downloading", "Sitemap Parsing", "File Structuring"],
    features: [
      "Mirrored the full site structure including all internal links and navigation",
      "Downloaded and relinked every asset: images, stylesheets, and scripts",
      "Preserved the original layout as a fully functional standalone static copy",
      "Captured the complete site before the original went permanently offline",
    ],
    businessBenefits: [
      "Publishers preserve years of editorial content before a domain expires",
      "Media companies package archived content as licensed datasets",
      "Legal teams retain original site copies as evidence in intellectual property disputes",
    ],
  },

  {
    id: 22,
    projectType: "Web Scraping",
    title: "DANOS - Wix Blog Migration Pipeline",
    imagePath: "/assets/img/projects/wix.png",
    shortDescription: "Automated pipeline extracting and republishing a full blog from a legacy CMS to a new Wix website",
    toolsStack: ["Python", "Web Scraping", "Wix API", "Metadata Preservation", "Bulk Upload"],
    features: [
      "Extracted all posts, images, tags, and metadata from the legacy site",
      "Re-published each post to the new Wix site preserving title tags, slugs, and meta descriptions",
      "Zero manual copy-paste across the full migration",
      "Handled image rehosting and internal link rewriting automatically",
    ],
    businessBenefits: [
      "Content teams migrate years of blog content without disrupting their publishing schedule",
      "SEO metadata is preserved end to end with no loss",
      "Cuts migration timelines from weeks to hours",
    ],
  },

  // WEB DEVELOPMENT

  {
    id: 23,
    projectType: "Web Development",
    title: "Pima County Dashboard",
    imagePath: "/assets/img/projects/pima-county-dashboard.png",
    shortDescription: "Interactive dashboard for visualising Pima County public records data extracted by the legal AI agent",
    toolsStack: ["Python", "Playwright", "Groq API", "GPT-OSS-120B", "Pandas", "Google Sheets API"],
    features: [
      "Displays daily extracted records across 6 document types in separate organised sheets",
      "Structured fields per document: names, addresses, claim amounts, plaintiffs, defendants, filing dates",
      "Refreshes automatically each morning from the overnight agent run",
      "Built for a non-technical real estate client to review without any manual steps",
    ],
    businessBenefits: [
      "Real estate teams open one dashboard instead of navigating multiple county portals",
      "Eliminates hours of manual data review every morning",
      "Clean structured output that legal teams can act on immediately",
    ],
  },

];
