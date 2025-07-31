import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const MechanicsLayout = () => {
  const navLinkClasses =
    'px-4 py-2 rounded-md text-slate-200 hover:bg-slate-700';
  const activeNavLinkClasses = 'bg-slate-700';

  return (
    <div>
      <nav className="mb-8 flex justify-center space-x-4">
        <NavLink
          to="/mechanics/camp-upgrades"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
        >
          Camp Upgrades
        </NavLink>
        <NavLink
          to="/mechanics/tech-tree"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
        >
          Tech Tree
        </NavLink>
        <NavLink
          to="/mechanics/traits"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
        >
          Traits
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MechanicsLayout;
