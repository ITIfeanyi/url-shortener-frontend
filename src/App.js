import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [shortUrl, setShortUrl] = useState();
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("RedirectCount")) || 0
  );
  const [longURL, setLongURL] = useState({ inputURL: "" });
  const [error, setError] = useState();

  useEffect(() => {
    localStorage.setItem("RedirectCount", JSON.stringify(count));
  }, [count]);

  const handleChange = (e) => {
    setLongURL({ ...longURL, [e.target.name]: e.target.value });
    setShortUrl();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { inputURL } = longURL;
      const res = await fetch("http://localhost:3001", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputURL }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setLongURL({ inputURL: "" });
        setShortUrl(data.url);
      } else if (data.status === "error") {
        setError(data.error);
        setLongURL({ inputURL: "" });
        setShortUrl();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <div>
        <span>
          <h1>Url shortener</h1>
        </span>
        <span>
          <h1>
            Visited {count} {count > 1 ? "times" : "time"}
          </h1>{" "}
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <div> {error} </div>}
        <input
          type="text"
          placeholder="Paste a link"
          name="inputURL"
          onChange={handleChange}
          value={longURL.inputURL}
        />

        <button type="submit">Shorten a URL.</button>
      </form>

      {shortUrl && (
        <div>
          <a
            href={shortUrl}
            rel="noreferrer"
            target="_blank"
            onClick={handleCountIncrement}
          >
            {shortUrl}{" "}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
