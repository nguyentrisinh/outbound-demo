import React, { Fragment } from "react";

export default ({ tourMaster }) => {
  return (
    <Fragment>
      <h2 className="card-title">Tour Master</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Single</th>
            <th>Twin</th>
            <th>Triple</th>
            <th>Quad</th>
            <th>Child Without Bed</th>
            <th>Child Half Twin</th>
            <th>Child With Bed</th>
            <th>Infant</th>
          </tr>
          <tr>
            <th>Package</th>
            <td>{tourMaster.singleFare}</td>
            <td>{tourMaster.twinFare}</td>
            <td>{tourMaster.tripleFare}</td>
            <td>{tourMaster.quadFare}</td>
            <td>{tourMaster.childWithoutBedFare}</td>
            <td>{tourMaster.childHalfTwinFare}</td>
            <td>{tourMaster.childWithBedFare}</td>
            <td>{tourMaster.infantFare}</td>
          </tr>
          <tr>
            <th>Ground</th>
            <td>{tourMaster.groundSingleFare}</td>
            <td>{tourMaster.groundTwinFare}</td>
            <td>{tourMaster.groundTripleFare}</td>
            <td>{tourMaster.groundQuadFare}</td>
            <td>{tourMaster.groundChildWithoutBedFare}</td>
            <td>{tourMaster.groundChildHalfTwinFare}</td>
            <td>{tourMaster.groundChildWithBedFare}</td>
            <td>{tourMaster.groundInfantFare}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
