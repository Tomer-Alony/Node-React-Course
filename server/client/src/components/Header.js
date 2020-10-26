import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StriperWrapper from './StripeWrapper';

const Header = () => {
  const user = useSelector((state) => state.auth);
  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href='/auth/google'>Login With Google</a>;
          </li>
        );
      default:
        return [
          <li key='1'>
            <StriperWrapper />
          </li>,
          <li key='3' style={{ margin: '0 10px' }}>
            Credits: {user.credits}
          </li>,
          <li key='2'>
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  };

  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to={user ? '/surveys' : '/'} className='left brand-logo'>
          Emaily
        </Link>
        <ul className='right'>{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;
