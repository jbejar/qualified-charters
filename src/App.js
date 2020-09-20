import React, { lazy, Suspense } from "react";

import ReactGA from "react-ga";
import withTracker from "./components/withTracker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent";
const SchoolPage = lazy(() => import("./components/SchoolPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MapPage = lazy(() => import("./components/MapPage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const MostQualifiedPage = lazy(() => import("./pages/MostQualifiedPage"));
const TransparencyPage = lazy(() => import("./pages/TransparencyPage"));
const MeetingsPage = lazy(() => import("./pages/MeetingsPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

function App() {
  ReactGA.initialize("UA-104442548-1", {
    debug: false,
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <NavBarComponent />
        <Suspense fallback={<div>Loading...</div>}>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about" component={withTracker(AboutPage)} />
            <Route
              path="/schools/:schoolID/:schoolName?"
              component={withTracker(SchoolPage)}
            />
            <Route
              path="/qualified"
              component={withTracker(MostQualifiedPage)}
            />
            <Route path="/meetings" component={withTracker(MeetingsPage)} />
            <Route
              path="/transparency"
              component={withTracker(TransparencyPage)}
            />
            <Route path="/reports" component={withTracker(ReportsPage)} />
            <Route path="/map" component={withTracker(MapPage)} />
            <Route path="/blog" component={withTracker(BlogPage)} />
            <Route path="/" component={withTracker(HomePage)} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
