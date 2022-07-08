import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "../../assets/canvasjs.react";
import Axios from "axios";
// components
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function PieStatics({ color }) {
  const [StatList, setStatList] = useState([]);
  const [Element1, setElement1] = useState([]);
  const [Element2, setElement2] = useState([]);
  const [Elementss, setElementss] = useState([]);
  const [Element1s, setElement1s] = useState([]);
  var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

React.useEffect(() => {
  const elements = []
 // let elements = [];

  let Res1 = [];


Axios
.get("http://localhost:5000/api/test")
.then((response) => {
  Res1 = response.data;
 console.log( Res1)

   
  //console.log(response.data);
  for(let i =0; i< Res1.length; i++){
    elements.push({label:new Date(Res1[i]._id), y:Res1[i].arrivals});
  //  elements.push(Res1[i].forecast);
  }
 
console.log ( "elements ", elements)
//console.log ("elements", elements)

 setElement2 (elements)
}).catch(err => {
console.log(err);
});
// console.log("hihiihihi:", element2s, element2);

},[]);

const options = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light", // "light1", "dark1", "dark2"
  title:{
    text: "Total Arrivals per year"
  },
  data: [{
    type: "pie",
    indexLabel: "Total Arrivals per Year {y}",//"<b>{elements.UnitPrice}</b>: {y} ({elements._id})"		
    startAngle: -90,
    dataPoints: Element2
  }]
}

React.useEffect(() => {
  const elements = []
  const element1s = []
 // let elements = [];

  let Res1 = [];
  let Res2 = [];

Axios
.get("http://localhost:5000/api/test22")
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

 setElementss (elements)
}).catch(err => {
console.log(err);
});
// console.log("hihiihihi:", element2s, element2);

Axios
.get("http://localhost:5000/api/test3")
.then((response) => {
  Res2 = response.data;
 console.log( Res2)

   
  //console.log(response.data);
  for(let i =0; i< Res2.length; i++){
    element1s.push({x: new Date(Res2[i].year), y:Res2[i].arrivals});
  //  element1s.push(Res1[i].forecast);
  }
 
console.log ( "element1s ", element1s)
//console.log ("elements", elements)

 setElement1s (element1s)
}).catch(err => {
console.log(err);
});
},);
const option = {
  animationEnabled: true,	
  exportEnabled: true,
  title:{
    text: "Actual & Forecast Arrivals Comparision"
  },
  axisY : {
    title: "Actual & Forecast Arrivals Values"
  },
  toolTip: {
    shared: true
  },
  data: [{
    type: "spline",
    name: "Forecast",
    showInLegend: true,
    dataPoints: Elementss
  },
  {
    type: "spline",
    name: "Arrivals",
    showInLegend: true,
    dataPoints: Element1s
  }]
}



React.useEffect(() => {
  const element13s = []
 // let elements = [];

  let Res1 = [];


Axios
.get("http://localhost:5000/api/test13")
.then((response) => {
  Res1 = response.data;
 console.log( Res1)

   
  //console.log(response.data);
  for(let i =0; i< Res1.length; i++){
    element13s.push({x: new Date(Res1[i].year), y:Res1[i].employment});
  //  element13s.push(Res1[i].arrivals);
  }
 
console.log ( "element13s ", element13s)
//console.log ("element13s", element13s)

 setElement1 (element13s)
}).catch(err => {
console.log(err);
});
// console.log("hihiihihi:", element2s, element2);

},);

const optionss = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2",
  title:{
    text: "Employments statistics Tourism"
  },
  axisX:{
    valueFormatString: "DD MMM YYYY",
    crosshair: {
      enabled: true,
      snapToDataPoint: true
    }
  },
  axisY: {
    title: "Value",
    valueFormatString: "##0.00",
    crosshair: {
      enabled: true,
      snapToDataPoint: true,
      labelFormatter: function(e) {
        return "€" + CanvasJS.formatNumber(e.value, "##0.00");
      }
    }
  },
  data: [{
    type: "area",
    xValueFormatString: "DD MMM YYYY",
    yValueFormatString: "##0.00",
    dataPoints:Element1
  }]
}

  return (
    <>
      <div>
      <CanvasJSChart options = {option} 
				/* onRef={ref => this.chart = ref} */
			/>
       <br></br>
      <br></br>
      <br></br>
      <br></br>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <CanvasJSChart options = {optionss} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
    </>
  );
}

PieStatics.defaultProps = {
  color: "light",
};

PieStatics.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
