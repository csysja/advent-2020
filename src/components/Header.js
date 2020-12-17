import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>
        <a href="https://adventofcode.com/2020">Advent of Code 2020</a>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">[/]</Link>
          </li>
          <li>
            <Link to="/days/1">[1]</Link>
          </li>
          <li>
            <Link to="/days/2">[2]</Link>
          </li>
          <li>
            <Link to="/days/3">[3]</Link>
          </li>
          <li>
            <Link to="/days/4">[4]</Link>
          </li>
          <li>
            <Link to="/days/5">[5]</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
