import React, { useState } from "react";

const ShortenURL = () => {
  const [shortUrl, setShortUrl] = useState();

  const [longURL, setLongURL] = useState({ inputURL: "" });
  const [error, setError] = useState();

  const handleChange = (e) => {
    setLongURL({ ...longURL, [e.target.name]: e.target.value });
    setShortUrl();
  };

  const handleSubmit = async (e) => {
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

  return (
    <div>
      <div>
        <span>
          <h1>Url shortener</h1>
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
          <a href={shortUrl} rel="opener" target="_blank">
            {shortUrl}{" "}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenURL;
