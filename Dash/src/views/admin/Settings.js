import React from "react";

// components
import { Chart } from "react-google-charts";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export const data = [
  ["Country", "Latitude"],
  ["Algeria", 36],
  ["Angola", -8],
  ["Benin", 6],
  ["Botswana", -24],
  ["Burkina Faso", 12],
  ["Burundi", -3],
  ["Cameroon", 3],
  ["Canary Islands", 28],
  ["Cape Verde", 15],
  ["Central African Republic", 4],
  ["Ceuta", 35],
  ["Chad", 12],
  ["Comoros", -12],
  ["Cote d'Ivoire", 6],
  ["Democratic Republic of the Congo", -3],
  ["Djibouti", 12],
  ["Egypt", 26],
  ["Equatorial Guinea", 3],
  ["Eritrea", 15],
  ["Ethiopia", 9],
  ["Gabon", 0],
  ["Gambia", 13],
  ["Ghana", 5],
  ["Guinea", 10],
  ["Guinea-Bissau", 12],
  ["Kenya", -1],
  ["Lesotho", -29],
  ["Liberia", 6],
  ["Libya", 32],
  ["Madagascar", null],
  ["Madeira", 33],
  ["Malawi", -14],
  ["Mali", 12],
  ["Mauritania", 18],
  ["Mauritius", -20],
  ["Mayotte", -13],
  ["Melilla", 35],
  ["Morocco", 32],
  ["Mozambique", -25],
  ["Namibia", -22],
  ["Niger", 14],
  ["Nigeria", 8],
  ["Republic of the Congo", -1],
  ["Réunion", -21],
  ["Rwanda", -2],
  ["Saint Helena", -16],
  ["São Tomé and Principe", 0],
  ["Senegal", 15],
  ["Seychelles", -5],
  ["Sierra Leone", 8],
  ["Somalia", 2],
  ["Sudan", 15],
  ["South Africa", -30],
  ["South Sudan", 5],
  ["Swaziland", -26],
  ["Tanzania", -6],
  ["Togo", 6],
  ["Tunisia", 34],
  ["Uganda", 1],
  ["Western Sahara", 25],
  ["Zambia", -15],
  ["Zimbabwe", -18],
];

export const options = {
  region: "002", // Africa
  colorAxis: { colors: ["#e31b23", "black", "#00853f"] },
  backgroundColor: "#81d4fa",
  datalessRegionColor: "#f8bbd0",
  defaultColor: "#f5f5f5",
};

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">My Data</h6>
              </div>
            </div>
            <Chart
              chartType="GeoChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
