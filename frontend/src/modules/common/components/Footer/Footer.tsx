import { Link } from 'react-router';
import type { FooterConfig } from './type';

type FooterProps = {
  config: FooterConfig;
};

export function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative  overflow-hidden ${config.backgroundClass}`}
      role="contentinfo"
    >
      {/* Decorations */}
      {config.decorations?.map((Deco, i) => (
        <Deco.component
          key={`footer-deco-${i}`}
          className={Deco.className}
          delay={Deco.delay}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          {config.brand && (
            <div className="md:col-span-2">
              {config.brand.logo && (
                <img
                  src={config.brand.logo}
                  alt={config.brand.badge?.label ?? 'Brand logo'}
                  className="h-16 mb-4"
                />
              )}

              {config.brand.badge && (
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/20">
                  {config.brand.badge.icon && (
                    <config.brand.badge.icon
                      className="w-4 h-4"
                      aria-hidden
                    />
                  )}
                  <span className="text-sm font-bold">
                    {config.brand.badge.label}
                  </span>
                </div>
              )}

              {config.brand.description && (
                <p className="text-sm opacity-80">
                  {config.brand.description}
                </p>
              )}
            </div>
          )}

          {/* Sections */}
          {config.sections.map((section, i) => (
            <nav key={`footer-section-${i}`} aria-label={section.title}>
              {section.title && (
                <h3 className="font-bold mb-4">{section.title}</h3>
              )}

              <ul className="space-y-2">
                {section.links.map((link, j) => {
                  const Icon = link.icon;

                  const content = (
                    <>
                      {Icon && (
                        <Icon className="w-4 h-4" aria-hidden />
                      )}
                      <span>{link.label}</span>
                    </>
                  );

                  return (
                    <li key={`footer-link-${i}-${j}`}>
                      {link.internal ? (
                        <Link
                          to={link.href}
                          className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
                        >
                          {content}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
                        >
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-70">
          © {currentYear} {config.copyright}
        </div>
      </div>
    </footer>
  );
}
