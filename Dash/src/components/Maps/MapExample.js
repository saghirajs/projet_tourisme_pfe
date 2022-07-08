import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "../../assets/canvasjs.react";
import Axios from "axios";
// components
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function MapExample() {
  const [Element1, setElement1] = useState([]);

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const addSymbols = (e) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };
  React.useEffect(() => {
    const elements = []
   // let elements = [];
  
    let Res1 = [];
  Axios
  .get("http://localhost:5000/api/test14")
  .then((response) => {
    Res1 = response.data;
   console.log( Res1)
     
    //console.log(response.data);
    for(let i =0; i< Res1.length; i++){
      elements.push({x: new Date(Res1[i].year), y:Res1[i].expenditures});
    //  elements.push(Res1[i].forecast);
    }
   
  console.log ( "elements ", elements)
  //console.log ("elements", elements)
  
   setElement1 (elements)
  }).catch(err => {
  console.log(err);
  });
  // console.log("hihiihihi:", element2s, element2);
  
  },);
  const options = {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "Most Popular Social Networking Sites"
    },
    axisX: {
      title: "Social Network",
      reversed: true,
    },
    axisY: {
      title: "Monthly Active Users",
      includeZero: true,
      labelFormatter: this.addSymbols
    },
    data: [{
      type: "bar",
      dataPoints: Element1
    }]
  }
  return (
    <>
      <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
    </>
  );
  
}


export default MapExample;
