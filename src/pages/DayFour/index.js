import React, { useState, useEffect } from "react";

import testData from "./testData";
import finalData from "./finalData";

const DayFour = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    const validEyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    const lines = data.split(/\r?\n|\s/); // split by new line or space
    const passports = lines
      .reduce(
        (p, c) => {
          if (c === "") {
            // empty so new passport
            p.push([]);
          } else {
            p[p.length - 1].push(c); // keep adding to current passpost
          }
          return p;
        },
        [[]]
      )
      .map((p) => p.map((f) => f.split(":"))); // split fields into key values
    const validPassports = passports.filter(
      (p) =>
        requiredFields.every((r) => p.map((f) => f[0]).includes(r)) &&
        p.every(
          (f) =>
            // (Birth Year) - four digits; at least 1920 and at most 2002.
            ((f[0] === "byr" &&
              parseInt(f[1]) >= 1920 &&
              parseInt(f[1]) <= 2002) ||
              f[0] !== "byr") &&
            // (Issue Year) - four digits; at least 2010 and at most 2020.
            ((f[0] === "iyr" &&
              parseInt(f[1]) >= 2010 &&
              parseInt(f[1]) <= 2020) ||
              f[0] !== "iyr") &&
            // (Expiration Year) - four digits; at least 2020 and at most 2030.
            ((f[0] === "eyr" &&
              parseInt(f[1]) >= 2020 &&
              parseInt(f[1]) <= 2030) ||
              f[0] !== "eyr") &&
            // (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
            ((f[0] === "hgt" &&
              ((f[1].includes("cm") &&
                parseInt(f[1]) >= 150 &&
                parseInt(f[1]) <= 193) ||
                (f[1].includes("in") &&
                  parseInt(f[1]) >= 59 &&
                  parseInt(f[1]) <= 76))) ||
              f[0] !== "hgt") &&
            // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            ((f[0] === "hcl" && f[1].match(/#[0-9a-f]{6}/)) ||
              f[0] !== "hcl") &&
            // (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
            ((f[0] === "ecl" && validEyeColours.includes(f[1])) ||
              f[0] !== "ecl") &&
            // (Passport ID) - a nine-digit number, including leading zeroes.
            ((f[0] === "pid" && f[1].match(/^[0-9]{9}$/)) || f[0] !== "pid")
        )
    );
    setResult({ passports, validPassports });
  }, [data]);
  return (
    <article>
      <h2>Day 1</h2>
      <a href="https://adventofcode.com/2020/day/4">brief</a>
      <p>
        Would you like to use the{" "}
        <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data...
      </p>
      <p>
        The number of valid passpost is{" "}
        <em>{result?.validPassports?.length}</em> out of{" "}
        <em>{result?.passports?.length}</em>.
      </p>
    </article>
  );
};

export default DayFour;
