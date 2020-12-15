import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import DayOne from "./pages/DayOne/";
import DayTwo from "./pages/DayTwo/";

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
        <Route path="/days/2">
          <DayTwo />
        </Route>
      </main>
    </Router>
  );
}

export default App;
