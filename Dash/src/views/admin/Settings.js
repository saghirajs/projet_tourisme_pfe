import React from "react";

// components
import { Chart } from "react-google-charts";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export const data = [
  ["Country", "PIB"],
  ["Algeria", 41047619.047619],
  ["Angola", 551047619.047619],
  ["Benin", 661047619.047619],
  ["Botswana", 991047619.047619],
  ["Burkina Faso", 99047619.047619],
  ["Burundi", 991047619.047619],
  ["Cameroon", 991047619.047619],
  ["Canary Islands", 991047619.047619],
  ["Cape Verde", 991047619.047619],
  ["Central African Republic", 991047619.047619],
  ["Ceuta", 991047619.047619],
  ["Chad", 991047619.047619],
  ["Comoros", 9104769.047619],
  ["Cote d'Ivoire", 991047619.047619],
  ["Democratic Republic of the Congo", 991047619.047619],
  ["Djibouti", 991047619.047619],
  ["Egypt", 991047619.047619],
  ["Equatorial Guinea", 991047619.047619],
  ["Eritrea", 991047619.047619],
  ["Ethiopia", 991047619.047619],
  ["Gabon", 991047619.047619],
  ["Gambia", 991047619.047619],
  ["Ghana", 991047619.047619],
  ["Guinea", 991047619.047619],
  ["Guinea-Bissau", 991047619.047619],
  ["Kenya", 991047619.047619],
  ["Lesotho", 991047619.047619],
  ["Liberia", 991047619.047619],
  ["Libya", 991047619.047619],
  ["Madagascar", 991047619.047619],
  ["Madeira", 991047619.047619],
  ["Malawi", 991047619.047619],
  ["Mali", 991047619.047619],
  ["Mauritania", 991047619.047619],
  ["Mauritius", 991047619.047619],
  ["Mayotte", 991047619.047619],
  ["Melilla", 991047619.047619],
  ["Morocco", 991047619.047619],
  ["Mozambique", 991047619.047619],
  ["Namibia", 991047619.047619],
  ["Niger", 991047619.047619],
  ["Nigeria", 991047619.047619],
  ["Republic of the Congo", 991047619.047619],
  ["Réunion", 991047619.047619],
  ["Rwanda", 991047619.047619],
  ["Saint Helena", 991047619.047619],
  ["São Tomé and Principe", 991047619.047619],
  ["Senegal", 991047619.047619],
  ["Seychelles", 991047619.047619],
  ["Sierra Leone", 991047619.047619],
  ["Somalia", 991047619.047619],
  ["Sudan", 991047619.047619],
  ["South Africa", 991047619.047619],
  ["South Sudan", 991047619.047619],
  ["Swaziland", 991047619.047619],
  ["Tanzania", 991047619.047619],
  ["Togo", 991047619.047619],
  ["Tunisia", 991047619.047619],
  ["Uganda", 991047619.047619],
  ["Western Sahara", 991047619.047619],
  ["Zambia", 991047619.047619],
  ["Zimbabwe", 991047619.047619],
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
