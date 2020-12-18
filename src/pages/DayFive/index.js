import React, { useState, useEffect, useCallback } from "react";

import testData from "./testData";
import finalData from "./finalData";

const DayFive = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState({ boardingPassesWithDetails: [] });

  const getRow = (boardingPass) => {
    let lower = 0;
    let upper = 127;
    for (let i = 0; i < 7; i++) {
      let middlepoint = Math.floor((upper - lower) / 2) + lower;
      if (boardingPass[i] === "B") {
        lower = middlepoint + 1;
      } else {
        upper = middlepoint;
      }
    }
    return lower;
  };

  const getColumn = (boardingPass) => {
    let lower = 0;
    let upper = 7;
    for (let i = 7; i < 10; i++) {
      let middlepoint = Math.floor((upper - lower) / 2) + lower;
      if (boardingPass[i] === "R") {
        lower = middlepoint + 1;
      } else {
        upper = middlepoint;
      }
    }
    return lower;
  };

  const getSeatDetails = useCallback((boardingPass) => {
    const row = getRow(boardingPass);
    const columm = getColumn(boardingPass);

    return {
      boardingPass,
      row,
      column: columm,
      seatId: row * 8 + columm,
    };
  }, []);

  const getMySeatId = useCallback((boardingPassesWithDetails) => {
    // sort seat ids
    let sortedBoardingPasses = boardingPassesWithDetails
      .map((b) => b.seatId)
      .sort((a, b) => a - b);
    // find first without following seatId 1 greater
    var seatWithNoFollowingNumber = sortedBoardingPasses.filter(
      (currentBoardingPass, i, passes) =>
        passes[i + 1] !== currentBoardingPass + 1
    )[0];
    return seatWithNoFollowingNumber + 1;
  }, []);

  useEffect(() => {
    const boardingPasses = data.split(/\r?\n|\s/); // split by new line or space
    const boardingPassesWithDetails = boardingPasses.map((b) => {
      return getSeatDetails(b);
    });
    const maxSeatId = boardingPassesWithDetails
      .map((b) => b.seatId)
      .reduce((p, c) => (c > p ? c : p), []);
    const mySeatId = getMySeatId(boardingPassesWithDetails);

    setResult({ boardingPassesWithDetails, maxSeatId, mySeatId });
  }, [data, getSeatDetails, getMySeatId]);
  return (
    <article>
      <h2>Day 5</h2>
      <a href="https://adventofcode.com/2020/day/5">brief</a>
      <p>
        Use <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data
      </p>
      <p>
        The highest seat ID is <em>{result.maxSeatId}</em>. My seat ID is{" "}
        <em>{result.mySeatId}</em>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Boarding Pass</th>
            <th>Row</th>
            <th>Column</th>
            <th>Seat ID</th>
          </tr>
        </thead>
        <tbody>
          {result.boardingPassesWithDetails.map((pass) => (
            <tr key={pass.boardingPass}>
              <td>{pass.boardingPass}</td>
              <td>{pass.row}</td>
              <td>{pass.column}</td>
              <td>{pass.seatId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default DayFive;
