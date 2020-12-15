import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import DayOne from "./pages/DayOne";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/days/1">
          <DayOne />
        </Route>
      </main>
    </Router>
  );
}

export default App;
