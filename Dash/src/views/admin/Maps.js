import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
// components

import MapExample from "components/Maps/MapExample.js";

export default function Maps() {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const addSymbols = (e) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Tourism Expenditures",
    },
    axisX: {
      title: "Country",
      reversed: true,
    },
    axisY: {
      title: "Annually Expenditures",
      includeZero: true,
      labelFormatter: addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: [
          { y: 2200000000, label: "SOUTH AFRICA" },
          { y: 1800000000, label: "ANGOLA" },
          { y: 800000000, label: "CÔTE D'IVOIRE" },
          { y: 563000000, label: "SEYCHELLES" },
          { y: 376000000, label: "TUNISIE" },
          { y: 336000000, label: "MAURITANIE" },
          { y: 330000000, label: "CAMEROON" },
        ],
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">My Data</h6>
              </div>
            </div>
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </div>
        </div>
      </div>
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
