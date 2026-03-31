import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="section-secondary section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img src={logo} alt="Mayriads Oryktos" className="h-40 w-auto mb-4" />
            <p className="text-sm text-surface-dark-foreground/60 leading-relaxed">
              A premier Nigerian industrial minerals and chemicals company, specializing in sourcing, processing, and distribution of high-quality mineral resources and industrial chemicals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Industries", "Products", "Services", "Global Network"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s/g, "")}`} className="text-sm text-surface-dark-foreground/60 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Industries</h4>
            <ul className="space-y-2">
              {["Construction & Infrastructure", "Cement", "Oil & Gas", "Paints & Coatings", "Plastics & Polymers", "Ceramics & Refractories"].map((ind) => (
                <li key={ind} className="text-sm text-surface-dark-foreground/60">{ind}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-surface-dark-foreground/60">
                <Mail size={16} className="text-accent shrink-0" />
                info@mayriadsoryktos.com
              </li>
              <li className="flex items-center gap-3 text-sm text-surface-dark-foreground/60">
                <Phone size={16} className="text-accent shrink-0" />
                +0000000000
              </li>
              <li className="flex items-start gap-3 text-sm text-surface-dark-foreground/60">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                Global Headquarters – To Be Announced
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-dark-foreground/10 pt-8 text-center">
          <p className="text-sm text-surface-dark-foreground/40">
            © {new Date().getFullYear()} Mayriads Oryktos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
