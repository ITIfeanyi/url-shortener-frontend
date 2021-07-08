import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AdminPanel from "./components/AdminPanel";
import Analytics from "./components/Analytics";
import Dashboard from "./components/Dashboard";
import ShortenURL from "./components/ShortenURL";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <ShortenURL />
          </Route>
          <Route path="/analytic">
            <Analytics />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
