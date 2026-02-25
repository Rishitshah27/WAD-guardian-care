import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/storage';

// Navbar Component - Reads navigation data from XML file
function Navbar() {
  const [navData, setNavData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    // Fetch the navbar.xml file from public folder
    fetch('/navbar.xml')
      .then((response) => response.text())
      .then((xmlText) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const logo = xmlDoc.querySelector('logo').textContent;
        const menuItems = [];
        const items = xmlDoc.querySelectorAll('menu item');
        items.forEach((item) => {
          menuItems.push({
            name: item.querySelector('name').textContent,
            link: item.querySelector('link').textContent,
            type: item.querySelector('type')?.textContent || 'link',
          });
        });
        setNavData({ logo, menuItems });
      })
      .catch((error) => console.error('Error loading navbar XML:', error));
  }, []);

  if (!navData) return null;

  // Filter menu items based on auth status
  const filteredMenuItems = navData.menuItems.filter(item => {
    if (currentUser) {
      // Hide Login and Signup if logged in
      return item.name !== 'Login' && item.name !== 'Signup';
    }
    return true;
  });

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {navData.logo}
        </Link>

        <ul className="navbar-menu">
          {filteredMenuItems.map((item, index) => (
            <li key={index}>
              {item.type === 'link' ? (
                <Link to={item.link} className="navbar-link">
                  {item.name}
                </Link>
              ) : (
                <Link to={item.link} className={`btn btn-${item.type.split('-')[1]}`}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
          {currentUser && (
            <>
              <li>
                <span className="navbar-link user-name">Hi, {currentUser.name.split(' ')[0]}</span>
              </li>
              <li>
                <button onClick={logout} className="logout-btn">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
