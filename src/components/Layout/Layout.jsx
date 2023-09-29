import { NavLink, Outlet } from 'react-router-dom';
import scss from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <header>
        <nav className={scss.navigation}>
          <ul className={scss.list}>
            <li className={scss.item}>
              <NavLink className={scss.link} to="/">
                Home
              </NavLink>
            </li>
            <li className={scss.item}>
              <NavLink className={scss.link} to="/Movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
