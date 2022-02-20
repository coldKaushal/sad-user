
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

import React from "react";




function App() {

  // Sample data
  const [data, updateData] = React.useState([]);
  const [lat, updateLat] = React.useState(0);
  const [long, updateLong] = React.useState(0);
  const [time, updatetime] = React.useState(new Date().getTime());
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    }
  }
  
  function setLocation(position) {
    updateLat(position.coords.latitude);
    updateLong(position.coords.longitude);

  }
  function handleSubmit(){
      getLocation();
      console.log(lat);
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch("http://localhost:4000/checkSafety?latitude="+lat+"&longitude="+long+"&date="+time, requestOptions)
        .then(response => response.text())
        .then(result =>{
          const newResult = JSON.parse(result);
          let newData = [];
          for (const [key, value] of Object.entries(newResult)) {
            newData.push({argument: key, value: value});
            }
            updateData(newData);
            console.log(newData);
        })
        .catch(error => console.log('error', error));
  }
  console.log(data);
  return (
    <div className='container'>
      <div class="jumbotron">
        <h1 class="display-4">User Interface</h1>
        <p class="lead">This WebApp is developed for Users to check their safety score and see recent cases.</p>
        <hr class="my-4" />
          <p>Press the button to get the information about your current location</p>
          <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button" onClick={handleSubmit}>Am I Safe?</a>
          </p>
      </div>
      <h3>Your Safety score is xxx</h3>
      <p>Day wise cases reported in last month</p>
      <Chart rotated={true}
      data={data}>
      <ArgumentAxis />
      <ValueAxis />
  
      <BarSeries valueField="value" argumentField="argument" name='Cases Reported'/>
    </Chart>
    </div>
  );
}

export default App;
