import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../helpers";
import { alertActions } from "../actions";
import { RouteData } from "../components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div
        className="jumbotron"
        style={{
          borderRadius: "500px",
          backgroundColor: "lavender",
          fill: "true"
        }}
      >
        <div className="container">
          <h2 className="col-md-6 col-md-offset-4" style={{ color: "indigo" }}>
            Welcome to Game Plaza
          </h2>

          <div
            className="col-sm-8 col-sm-offset-2"
            style={{ backgroundColor: "azure", borderRadius: "500px" }}
          >
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <div>
                <RouteData exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
