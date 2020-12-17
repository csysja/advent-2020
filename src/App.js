import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import DayOne from "./pages/DayOne/";
import DayTwo from "./pages/DayTwo/";
import DayThree from "./pages/DayThree/";
import DayFour from "./pages/DayFour/";
import DayFive from "./pages/DayFive/";

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
        <Route path="/days/3">
          <DayThree />
        </Route>
        <Route path="/days/4">
          <DayFour />
        </Route>
        <Route path="/days/5">
          <DayFive />
        </Route>
      </main>
    </Router>
  );
}

export default App;
