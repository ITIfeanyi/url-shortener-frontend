import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const ShortenURL = () => {
  const [shortUrl, setShortUrl] = useState();

  const [longURL, setLongURL] = useState({ inputURL: "" });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handlePageChange = () => {
    history.push("/analytic");
  };

  const handleChange = (e) => {
    setLongURL({ ...longURL, [e.target.name]: e.target.value });
    setShortUrl();
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    try {
      const { inputURL } = longURL;
      const res = await fetch("https://powerful-lake-07951.herokuapp.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputURL }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setLoading(false);
        setLongURL({ inputURL: "" });
        setShortUrl(data.url);
      } else if (data.status === "error") {
        setError(data.error);
        setLongURL({ inputURL: "" });
        setShortUrl();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Link to="/analytic">
          <h3 onClick={handlePageChange}> View URL Analytics</h3>{" "}
        </Link>
        <Link to="/admin" className="shortnewurl">
          <span>Login</span>
        </Link>{" "}
      </div>
      <div>
        <span>
          <h1>Url shortener</h1>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <p className="error"> {error} </p>}
        <input
          type="text"
          placeholder="Paste a link"
          name="inputURL"
          onChange={handleChange}
          value={longURL.inputURL}
        />

        <button type="submit">Shorten a URL.</button>
      </form>

      {loading && <p>Loading</p>}
      {shortUrl && (
        <div>
          <a href={`${shortUrl}`} referrerPolicy="origin">
            {shortUrl}{" "}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenURL;
