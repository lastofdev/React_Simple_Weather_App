import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
//import "bootswatch/lumen/bootstrap.css";
import { Navbar, Button, Nav, ListGroup, Row, Col, Container } from "react-bootstrap";

const PLACES = [
  { name: "Mexico City", zip: "94303" },
  { name: "Sunnyvale", zip: "94088" },
  { name: "Santa Cruz", zip: "95063" },
  { name: "Honolulu", zip: "96803" }
];

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        
           <h1 class="headergen">
            React Simple Weather App
            </h1>
        
  <h2 class="headersmall">Select a city</h2>
      <div className="App">
        {PLACES.map((place, index) => (
          <button
           class="green"
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
              {place.name}
          </button>
        ))}  
      </div>
     
      <div class="display">
      <WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
        />
        </div>
    </div>
    );
  }
}

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>
      <div id="fountainG">
	<div id="fountainG_1" class="fountainG"></div>
	<div id="fountainG_2" class="fountainG"></div>
	<div id="fountainG_3" class="fountainG"></div>
	<div id="fountainG_4" class="fountainG"></div>
	<div id="fountainG_5" class="fountainG"></div>
	<div id="fountainG_6" class="fountainG"></div>
	<div id="fountainG_7" class="fountainG"></div>
	<div id="fountainG_8" class="fountainG"></div>
</div>
</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

export default App;
