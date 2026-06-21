import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#171717]/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg text-[#E11D48]">Talha</span>
            <span className="font-heading font-bold text-lg text-[#FAFAFA]">Pythoneer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
          </div>

          <p className="text-[#525252] text-xs text-center tracking-wide uppercase">
            Web Scraping &nbsp;·&nbsp; Agentic AI &nbsp;·&nbsp; Data Engineering &nbsp;·&nbsp; Python Automation
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#525252] hover:text-[#E11D48] transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#525252] hover:text-[#E11D48] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </a>
            <a
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#525252] hover:text-[#1DBF73] transition-colors duration-300"
              aria-label="Fiverr"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.506c-.54 0-.806.37-.806 1.005v2.836h-1.46V11.88h-.74c-.54 0-.807.37-.807 1.005v2.836h-1.46v-4.476h1.46v.636c.21-.462.553-.637 1.006-.637h1.54v.637c.21-.462.554-.637 1.006-.637h.807v.27zM11.24 13.88c0-.814.445-1.31 1.18-1.31.7 0 1.1.477 1.1 1.31v.22H11.24zm2.28 1.348c-.16.37-.52.57-1.04.57-.76 0-1.24-.5-1.24-1.31v-.15h3.48v-.52c0-1.548-.88-2.45-2.48-2.45-1.56 0-2.48.92-2.48 2.47 0 1.564.92 2.456 2.52 2.456.96 0 1.748-.38 2.12-1.07l-1.88.003zm-4.8-2.01h-2.28v3.505H4.98v-3.505H4v-1.12h.98v-.61c0-1.05.7-1.69 1.76-1.69h1.24v1.17H7.3c-.44 0-.66.27-.66.6v.53h1.08v1.12z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#171717]/30 text-center">
          <p className="text-[#525252] text-xs">
            © {new Date().getFullYear()} Talha Pythoneer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
