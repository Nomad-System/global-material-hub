import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { productCategories } from "@/data/productCategories";
import logo from "@/assets/logo.png";

const mainLinks = [
  { label: "Home", to: "/", hash: "#home" },
  { label: "About", to: "/", hash: "#about" },
  { label: "Industries", to: "/", hash: "#industries" },
  { label: "Services", to: "/", hash: "#services" },
  { label: "Global Network", to: "/", hash: "#network" },
  { label: "Contact", to: "/", hash: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (to: string, hash: string) => {
    setOpen(false);
    if (location.pathname === to) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(to);
      // After navigation, scroll to hash
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary backdrop-blur-md border-b border-border/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Mayriads Oryktos" className="h-20 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {mainLinks.slice(0, 3).map((link) => (
            <button
              key={link.hash}
              onClick={() => handleNavClick(link.to, link.hash)}
              className="text-sm font-medium text-surface-dark-foreground/70 hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Products Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-surface-dark-foreground/70 hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
            >
              Products
              <ChevronDown size={14} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </button>

            {productsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] bg-surface-dark border border-border/20 rounded-lg shadow-2xl py-2 max-h-[70vh] overflow-y-auto">
                <button
                  onClick={() => {
                    setProductsOpen(false);
                    handleNavClick("/", "#products");
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-accent hover:bg-accent/10 transition-colors border-b border-border/10 mb-1"
                >
                  All Products Overview
                </button>
                {productCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}`}
                    onClick={() => setProductsOpen(false)}
                    className="block px-4 py-2 text-sm text-surface-dark-foreground/70 hover:text-accent hover:bg-accent/5 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {mainLinks.slice(3).map((link) => (
            <button
              key={link.hash}
              onClick={() => handleNavClick(link.to, link.hash)}
              className="text-sm font-medium text-surface-dark-foreground/70 hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <Button variant="accent" size="sm" onClick={() => handleNavClick("/", "#contact")}>
            Get a Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-surface-dark-foreground bg-transparent border-none"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-surface-dark border-t border-border/10 px-6 pb-6 max-h-[80vh] overflow-y-auto">
          {mainLinks.slice(0, 3).map((link) => (
            <button
              key={link.hash}
              onClick={() => handleNavClick(link.to, link.hash)}
              className="block w-full text-left py-3 text-sm font-medium text-surface-dark-foreground/70 hover:text-accent transition-colors border-b border-border/5 bg-transparent border-x-0 border-t-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile Products Accordion */}
          <button
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            className="flex items-center justify-between w-full py-3 text-sm font-medium text-surface-dark-foreground/70 hover:text-accent transition-colors border-b border-border/5 bg-transparent border-x-0 border-t-0 cursor-pointer"
          >
            Products
            <ChevronDown size={14} className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileProductsOpen && (
            <div className="pl-4 border-b border-border/5">
              <button
                onClick={() => {
                  setMobileProductsOpen(false);
                  handleNavClick("/", "#products");
                }}
                className="block w-full text-left py-2 text-sm font-semibold text-accent bg-transparent border-none cursor-pointer"
              >
                All Products
              </button>
              {productCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  onClick={() => { setOpen(false); setMobileProductsOpen(false); }}
                  className="block py-2 text-sm text-surface-dark-foreground/60 hover:text-accent transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          {mainLinks.slice(3).map((link) => (
            <button
              key={link.hash}
              onClick={() => handleNavClick(link.to, link.hash)}
              className="block w-full text-left py-3 text-sm font-medium text-surface-dark-foreground/70 hover:text-accent transition-colors border-b border-border/5 bg-transparent border-x-0 border-t-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <Button variant="accent" size="sm" className="mt-4 w-full" onClick={() => handleNavClick("/", "#contact")}>
            Get a Quote
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
