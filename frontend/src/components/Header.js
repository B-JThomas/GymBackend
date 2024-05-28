import React from 'react';

const Header = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <h1>Header: My Header</h1>
      <button onClick={handleLogout}>Logout</button>
      <a href='/login'>Login</a>
      <a href='/Error'>Error</a>
      <a href='/Home'>Home</a>
    </div>
  );
};

export default Header;
