import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Analytics = () => {
  const [shortUrl, setShortUrl] = useState({ url: "" });
  const [error, setError] = useState("");
  const [analyticData, setAnalyticData] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handlePageChange = () => {
    history.push("/");
  };

  const handleChange = (e) => {
    setShortUrl({ ...shortUrl, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      //clear off exisiting data []
      const { url } = shortUrl;
      const res = await fetch(
        "https://powerful-lake-07951.herokuapp.com/analytic",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        setLoading(false);
        setError("");
        setAnalyticData(data.analytic.userAgent);
        setCount(data.analytic.count);
      } else if (data.status === "error") {
        setError("Url not found");
        setAnalyticData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Link to="/">
          <h3 onClick={handlePageChange}>Shorten a long url</h3>{" "}
        </Link>
      </div>
      <div>
        <span>
          <h1>URL Information</h1>
        </span>
      </div>
      {error && <div> {error} </div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste a link"
          name="url"
          onChange={handleChange}
          value={shortUrl.url}
        />

        <button type="submit">Get Analytics</button>
      </form>

      <div>
        {analyticData ? (
          <div>
            <p>
              You have {count} visitors on {}{" "}
            </p>

            <div>
              <h3>Visitors details</h3>
              {analyticData.map((data) => {
                return (
                  <div key={data._id} className="card">
                    <p>Device type: {data.os}</p>
                    <p>Browser type: {data.family} </p>
                    <p>Visitor's device: {data.device} </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {loading && <p>Loading</p>}
            <h2>Paste a short url</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
