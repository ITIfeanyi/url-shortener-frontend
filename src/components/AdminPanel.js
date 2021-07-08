import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      setError("");
      e.preventDefault();
      const { email, password } = admin;

      const res = await fetch(
        "https://powerful-lake-07951.herokuapp.com/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (data.adminID) {
        setIsAdmin(true);
        setLoading(false);
      } else if (data.status === "error") {
        setLoading(false);
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  return (
    <div>
      {isAdmin && <Redirect to="/dashboard" />}
      <h3>Admin Panel</h3>
      <Link to="/" className="shortnewurl">
        <span>Go back home</span>
      </Link>{" "}
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="input-label">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-label">
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p className="error"> {error}</p>}
      {loading && <p>Loading</p>}
    </div>
  );
};

export default AdminPanel;
