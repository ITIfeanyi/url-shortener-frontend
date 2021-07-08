import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://powerful-lake-07951.herokuapp.com/dashboardInfo"
        );
        const data = await res.json();
        if (data.status === "success") {
          setDashboardData(data.urls);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <Link to="/" className="shortnewurl">
          Go back to home
        </Link>{" "}
      </div>

      <div>{error && error} </div>
      <div>
        {dashboardData ? (
          dashboardData.map((data) => {
            return (
              <div key={data._id} className="dashboard-card">
                <p> {data.count} view</p>
                <p className="longurl">Long URL: {data.inputURL} </p>
                <a
                  href={`https://powerful-lake-07951.herokuapp.com/${data.randomValue}`}
                >
                  Short URL{" "}
                  {`https://powerful-lake-07951.herokuapp.com/${data.randomValue}`}{" "}
                </a>
                <h3>Analytics </h3>
                {data.userAgent.map((userData) => {
                  return (
                    <div key={userData._id} className="card">
                      <p>Device Type {userData.os} </p>
                      <p>Browser type: {userData.family} </p>
                      <p>Visitor's device: {userData.device} </p>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
