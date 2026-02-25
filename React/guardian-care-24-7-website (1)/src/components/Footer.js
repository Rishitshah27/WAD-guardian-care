import React, { useEffect, useState } from 'react';

// Footer Component - Reads footer data from XML file
function Footer() {
  const [footerData, setFooterData] = useState(null);

  // useEffect hook to fetch and parse XML data when component mounts
  useEffect(() => {
    // Fetch the footer.xml file from public folder
    fetch('/footer.xml')
      .then((response) => response.text())
      .then((xmlText) => {
        // Parse the XML string using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Extract company info
        const companyName = xmlDoc.querySelector('company name').textContent;
        const tagline = xmlDoc.querySelector('company tagline').textContent;

        // Extract sections (Quick Links, Contact, Follow Us)
        const sections = [];
        const sectionElements = xmlDoc.querySelectorAll('sections section');

        sectionElements.forEach((section) => {
          const title = section.querySelector('title').textContent;
          const links = [];
          const linkElements = section.querySelectorAll('links link, social link');

          linkElements.forEach((link) => {
            links.push({
              text: link.textContent,
              href: link.getAttribute('href'),
            });
          });

          // Extract contact info if present
          const contactElement = section.querySelector('contact');
          if (contactElement) {
            const email = contactElement.querySelector('email')?.textContent || '';
            const phone = contactElement.querySelector('phone')?.textContent || '';
            const address = contactElement.querySelector('address')?.textContent || '';

            sections.push({
              title,
              type: 'contact',
              contact: { email, phone, address },
            });
          } else {
            sections.push({
              title,
              type: 'links',
              links,
            });
          }
        });

        // Extract copyright text
        const copyright = xmlDoc.querySelector('copyright').textContent;

        // Store parsed data in state
        setFooterData({ companyName, tagline, sections, copyright });
      })
      .catch((error) => console.error('Error loading footer XML:', error));
  }, []); // Empty dependency array = run only once on mount

  // If data is still loading, show nothing
  if (!footerData) return null;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-company-name">{footerData.companyName}</div>
            <p className="footer-tagline">{footerData.tagline}</p>
          </div>

          {/* Dynamic Sections from XML */}
          {footerData.sections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>

              {/* Contact Section */}
              {section.type === 'contact' && (
                <div className="footer-contact">
                  <a href={`mailto:${section.contact.email}`}>{section.contact.email}</a>
                  <a href={`tel:${section.contact.phone}`}>{section.contact.phone}</a>
                  <p>{section.contact.address}</p>
                </div>
              )}

              {/* Links Section */}
              {section.type === 'links' && (
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href ? (
                        <a href={link.href}>{link.text}</a>
                      ) : (
                        <span>{link.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
