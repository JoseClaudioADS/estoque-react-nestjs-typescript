import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, LogoutButton } from './styles';
import { AuthContext } from '../../contexts/AuthContext';

export interface MenuProps {}

const Menu: React.SFC<MenuProps> = () => {
  const { handleLogout, authenticated } = useContext(AuthContext);
  return (
    <Wrapper className="pure-menu">
      <span className="pure-menu-heading">Controlde de Estoque</span>
      <ul className="pure-menu-list">
        {authenticated ? (
          <>
            <li className="pure-menu-item">
              <Link to="/" className="pure-menu-link">
                Home
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link to="/items" className="pure-menu-link">
                Itens
              </Link>
            </li>
            <li className="pure-menu-item">
              <LogoutButton
                type="button"
                className="pure-button"
                show={authenticated}
                onClick={handleLogout}
              >
                Sair
              </LogoutButton>
            </li>
          </>
        ) : (
          <>
            <li className="pure-menu-item">
              <Link to="/signup" className="pure-menu-link">
                Sign Up
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link to="/signin" className="pure-menu-link">
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </Wrapper>
  );
};

export default Menu;
