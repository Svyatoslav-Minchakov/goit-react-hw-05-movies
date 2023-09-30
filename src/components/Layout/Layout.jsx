import { NavLink, Outlet } from 'react-router-dom';
import scss from './Layout.module.scss';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      <header className={scss.header}>
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
        <h1 className={scss.title}>movie finder</h1>
      </header>

      <Suspense fallback={<h1>Loading...</h1>}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Layout;
