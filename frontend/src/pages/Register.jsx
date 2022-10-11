import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    //check if passwords match and register users
    if (password !== password2) {
      toast.error("passwords do not match");
    } else {
      const userData = { name, email, password };

      dispatch(register(userData));
    }
  };

  
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

  if (isLoading) {
    return "loading";
  }

  return (
    <div className="register-page">
      <div className="register-background">
        <div className="register-content">
          <section>
            <h1 style={{ fontFamily: "cursive", fontWeight: "bold" }}>
              Create new account.
            </h1>
            <p>Please create an Account.</p>
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-warning"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
            </p>
          </section>

          <section className="form mt-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className="form-group mb-2">
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
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  value={password2}
                  className="form-control"
                  placeholder="Confirm password"
                  onChange={(e) => setPassword2(e.target.value)}
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
      </div>
    </div>
  );
};

export default Register;
