import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <div className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/login">Login/Register</Link>
    </div>
  );
}