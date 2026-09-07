import type { ReactNode, MouseEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SmartLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
}

/**
 * Renders a plain <a href="#hash"> for same-page hash links (so the browser's
 * native, always-fires anchor-jump behavior applies, matching the original
 * static-HTML site) and an app <Link> for anything that changes route.
 */
export function SmartLink({ to, className, children, onClick, ...rest }: SmartLinkProps) {
  const { pathname } = useLocation();
  const hashIndex = to.indexOf('#');
  const path = hashIndex === -1 ? to : to.slice(0, hashIndex) || '/';
  const hash = hashIndex === -1 ? null : to.slice(hashIndex + 1);

  if (hash && path === pathname) {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
