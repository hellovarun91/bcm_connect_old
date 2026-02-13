import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    {
      id: 1,
      label: 'Petrol Pump',
      icon: '/assets/navbar/petrolpump.svg',
      alt: 'Petrol Pump',
      path: '/petrol-pump'
    },
    {
      id: 2,
      label: 'Coffee',
      icon: '/assets/navbar/coffee.svg',
      alt: 'Coffee',
      path: '/petrol-pump'
    },
    {
      id: 3,
      label: 'Shopping',
      icon: '/assets/navbar/cart.svg',
      alt: 'Shopping Cart',
      path: '/shopping'
    },
    {
      id: 4,
      label: 'Healthcare',
      icon: '/assets/navbar/healthcare.svg',
      alt: 'Healthcare',
      path: '/healthcare'
    }
  ];
  
  // Set active index based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const index = navItems.findIndex(item => currentPath === item.path);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname]);

  return (
    <div className="navbar-content" style={{ background: 'transparent', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, padding: '0.5rem' }}>
      {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <div 
              className={`nav-item ${activeIndex === index ? 'active' : ''} ${hoveredIndex === index ? 'hovered' : ''}`}
              onClick={() => {
                setActiveIndex(index);
                navigate(item.path);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              title={item.label}
            >
              <img
                src={item.icon}
                alt={item.alt}
                className="nav-icon"
              />
              {activeIndex === index && (
                <div className="active-indicator" />
              )}
              {hoveredIndex === index && activeIndex !== index && (
                <div className="hover-indicator" style={{ position: 'absolute', bottom: '-0.25rem', left: '50%', transform: 'translateX(-50%)', width: '0.3rem', height: '0.3rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.5)' }} />
              )}
            </div>
            {index < navItems.length - 1 && (
              <div className="nav-separator">
                <img
                  src="/assets/navbar/nav-arrow-right.svg"
                  alt=""
                  className="separator-arrow"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
  );
};

export default Navbar;