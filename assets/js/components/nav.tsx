import React from 'react';
import NavLink from './nav-link';

const Nav: React.FC<{}> = () => {
  const logoutRef = React.createRef<HTMLAnchorElement>();

  React.useEffect(() => {
    logoutRef.current.addEventListener('click', logout);
  });

  const logout = (e: Event = null) => {
    if (e) {
      e.preventDefault();
    }

    window
      .fetch('/session', {
        method: 'DELETE',
        headers: {
          'x-csrf-token': window.csrfToken,
        },
      })
      .then(() => {
        window.location = '/';
      });
  };

  return (
    <nav className="absolute py-3 mb-3 pr-2 top-0 left-0 flex w-screen bg-gray-800">
      <div className="flex flex-row">
        <NavLink newWindow={true} href="https://github.com/abryrath/phx_chat">
          Source
        </NavLink>
        <NavLink href="/about">About</NavLink>
      </div>
      <div className="flex flex-row ml-auto">
        <NavLink href="/registration/edit">Change Password</NavLink>
        <NavLink href="/" localRef={logoutRef}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
