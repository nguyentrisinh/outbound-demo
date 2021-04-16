import React, { useState } from "react";
import { Button } from "antd";

export default ({ tourMasters = [], tourSelected, setTourSelected }) => {
  const handleSelectDeparture = (tm) => {
    setTourSelected(tm);
  };

  return (
    <>
      <h2 className="card-title">Select Departure Date</h2>
      <table>
        <tbody>
          <tr>
            <th>Tour Code</th>
            <th>Departure Date</th>
            <th>Return Date</th>
            <th></th>
          </tr>
          {tourMasters.map((tm) => (
            <tr>
              <td>{tm.tourCode}</td>
              <td>{tm.departureDate}</td>
              <td>{tm.returnDate}</td>
              <td>
                <Button
                  type={
                    tourSelected?.tourCode === tm.tourCode
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleSelectDeparture(tm)}
                >
                  Select departure
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
