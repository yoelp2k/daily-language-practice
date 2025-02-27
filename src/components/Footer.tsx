import React from 'react';
import packageJson from '../../package.json';

const Footer: React.FC = () => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      padding: '5px 10px',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(5px)',
      borderTopLeftRadius: '5px',
      fontSize: '12px',
      color: '#666',
      zIndex: 1000,
    }}>
      v{packageJson.version}
    </footer>
  );
};

export default Footer;
