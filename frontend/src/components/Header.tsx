import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <img src="/icon.png" alt="Logo" />
      </Link>
    </div>
  );
};

export default Header;
