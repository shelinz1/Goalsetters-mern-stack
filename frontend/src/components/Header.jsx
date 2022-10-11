import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle, BiUserPlus, BiLogOutCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onlogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header ">
      <nav className="navbar navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <div className="logo text-white">
            <Link to="/" className="text-white nav-link">
              Goals
            </Link>
          </div>
          <div>
            <ul className="nav">
              {user ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={onlogout}>
                    <BiLogOutCircle /> Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-success mx-1 text-white"
                      to="/login"
                    >
                      <BiLogInCircle /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-secondary mx-1 text-white"
                      to="/register"
                    >
                      <BiUserPlus /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
