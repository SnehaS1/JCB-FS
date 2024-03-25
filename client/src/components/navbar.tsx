import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { GiTowTruck } from "react-icons/gi";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <GiTowTruck color="yellow" />
      </Link>
      <ul>
        <CustomLink to="/vehicle">Vehicles</CustomLink>
        <CustomLink to="/track">Track</CustomLink>
        <CustomLink to="/maintenance">Maintenance</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({
  to,
  children,
  ...props
}: {
  to: string;
  children: React.ReactNode;
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
