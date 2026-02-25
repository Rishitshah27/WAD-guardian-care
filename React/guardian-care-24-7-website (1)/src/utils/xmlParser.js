export const parseFooterXML = async () => {
  try {
    const response = await fetch('/footer-data.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Failed to parse XML');
    }

    const company = xmlDoc.getElementsByTagName('company')[0]?.textContent || 'Guardian Care 24/7';
    const tagline = xmlDoc.getElementsByTagName('tagline')[0]?.textContent || '';

    const sectionsElements = xmlDoc.getElementsByTagName('section');
    const sections = Array.from(sectionsElements).map((section) => ({
      title: section.getElementsByTagName('title')[0]?.textContent || '',
      links: Array.from(section.getElementsByTagName('link')).map((link) => ({
        label: link.textContent,
        href: link.getAttribute('href'),
      })),
    }));

    const socialElements = xmlDoc.getElementsByTagName('platform');
    const social = Array.from(socialElements).map((platform) => ({
      name: platform.getAttribute('name'),
      url: platform.getAttribute('url'),
    }));

    const contactElement = xmlDoc.getElementsByTagName('contact')[0];
    const contact = {
      email: contactElement?.getElementsByTagName('email')[0]?.textContent || '',
      phone: contactElement?.getElementsByTagName('phone')[0]?.textContent || '',
      address: contactElement?.getElementsByTagName('address')[0]?.textContent || '',
    };

    return {
      company,
      tagline,
      sections,
      social,
      contact,
    };
  } catch (error) {
    console.error('Error parsing footer XML:', error);
    return {
      company: 'Guardian Care 24/7',
      tagline: 'Professional Services At Your Doorstep',
      sections: [],
      social: [],
      contact: {},
    };
  }
};
