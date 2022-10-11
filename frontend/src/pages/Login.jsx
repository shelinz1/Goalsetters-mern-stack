import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message, isSuceess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuceess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuceess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = { email, password };
    dispatch(login(userdata));
  };

  if (isLoading) {
    return "loading"
  }

  return (
    <div className="login-page">
      <section>
        <h1 style={{ fontFamily: "cursive", fontWeight: "bold" }}>Sign In</h1>
        <p>sign in and start setting your Goals</p>
        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-warning"
            style={{ textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-dark text-white mt-2"
              style={{ width: "100%" }}
            >
              {" "}
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
