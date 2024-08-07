import { useRef, useState, useEffect, useContext } from "react";
import "../styles/pages/login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { datacontext } from "../context/Context.jsx";
import axios from "../api/axios.js";

const LOGIN_URL = "/api/user/login";

const Login = () => {
  const { setAuth, setToken } = useContext(datacontext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/amazon";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      }
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const token = response?.data?.token;
      setAuth({ user, pwd, token });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="app">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="input"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="button">Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </section>
      </div>
    </>
  );
};

export default Login;
