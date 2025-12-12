import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Mes recettes </p>
        <p>Fait avec delicatesse pour vous</p>
      </div>
    </footer>
  );
}

export default Footer;