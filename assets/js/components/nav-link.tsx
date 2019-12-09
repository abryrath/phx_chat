import React from 'react';

interface NavLinkProps extends React.PropsWithChildren<React.FC> {
    href: string;
    newWindow?: boolean;
    localRef?: React.Ref<HTMLAnchorElement>;
}

const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const { href, newWindow, localRef, children } = props;

    return (
      <div>
        <a
            href={href}
            className="font-bold mx-4 text-gray-100"
            target={newWindow ? '_blank' : ''}
            ref={localRef ? localRef : null}
        >
            {children}
        </a>
      </div>
    );
};

export default NavLink;