import React from 'react';

interface NavLinkProps extends React.PropsWithChildren<React.FC> {
    href: string;
    newWindow?: boolean;
}

const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const { href, newWindow, children } = props;

    return (
      <div>
        <a
            href={href}
            className="font-bold mx-4 text-gray-100"
            target={newWindow ? '_blank' : ''}
        >
            {children}
        </a>
      </div>
    );
};

export default NavLink;