import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "../../assets/canvasjs.react";
import Axios from "axios";
// components
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ColStatics({ color }) {
  const [StatList, setStatList] = useState([]);
  const [Element1, setElement1] = useState([]);
  const [Element2, setElement2] = useState([]);
  var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//let  options = {};
React.useEffect(() => {
  const elements = []
 // let elements = [];

  let Res1 = [];
Axios
.get("http://localhost:5000/api/test2")
.then((response) => {
  Res1 = response.data;
 console.log( Res1)
   
  //console.log(response.data);
  for(let i =0; i< Res1.length; i++){
    elements.push({x: new Date(Res1[i].date), y:Res1[i].forecast});
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
  exportEnabled: true,
  theme: "light2", //"light1", "dark1", "dark2"
  title:{
    text: "Arrivals forecast "
  },
  axisY: {
    includeZero: true
  },
  data: [{
    type: "column", //change type to bar, line, area, pie, etc
    //indexLabel: "{y}", //Shows y value on all Data Points
    indexLabelFontColor: "#5A5757",
    indexLabelPlacement: "outside",
    dataPoints:  Element1
  } ],
}
React.useEffect(() => {
  const elements = []
 // let elements = [];

  let Res1 = [];


Axios
.get("http://localhost:5000/api/test7")
.then((response) => {
  Res1 = response.data;
 console.log( Res1)

   
  //console.log(response.data);
  for(let i =0; i< Res1.length; i++){
    elements.push({x: new Date(Res1[i].year), y:Res1[i].arrivals});
  //  elements.push(Res1[i].arrivals);
  }
 
console.log ( "elements ", elements)
//console.log ("elements", elements)

 setElement2 (elements)
}).catch(err => {
console.log(err);
});
// console.log("hihiihihi:", element2s, element2);

},);
const option = {
  animationEnabled: true,
  theme: "light1",
  title: {
    text: "Arrivals Year"
  },
  axisY: {
  title: "Active Installations",
    scaleBreaks: {
      autoCalculate: true,
      type: "wavy",
      lineColor: "white"
    }
  },
  data: [{
    type: "column",
    indexLabel: "{y}",		
    indexLabelFontColor: "white",
    dataPoints: Element2
  }]
}



return (
<div>
  <CanvasJSChart options = {options} 
    /* onRef={ref => this.chart = ref} */
  />
  <br>
  </br>
  <br>
  </br>
  		<CanvasJSChart options = {option} 
				/* onRef={ref => this.chart = ref} */
			/>

  {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
</div>

);
}
ColStatics.defaultProps = {
  color: "light",
};

