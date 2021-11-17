import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
// Components
import Header from './components/Header';
// styled
import styled from 'styled-components';
// animation
import { motion } from 'framer-motion';
import { animeResult } from './animations';


// password ôlkjfdsa456

function App() {
  // useState
  const [weather, setWeather] = useState(null)
  //const [weather2, setWeather2] = useState(null)

  const [input, setInput] = useState("")
  const [input2, setInput2] = useState("")

  const [location, setLocation] = useState(null)
  const [today, setToday] = useState(null)
  const [tomorrow, setTomorrow] = useState(null)
  const [afterTomorrow, setAftertomorrow] = useState(null)
  
  
  useEffect(() => {
     axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Poprad&aqi=yes&lang=sk`)
    .then(data => {
      setWeather(data.data);
    })
    .catch(err => console.log(err))
  }, [])


  
// event form
const weatherImput = (e) => {
  setInput(e.target.value);
}
const weatherImput2 = (e) => {
  setInput2(e.target.value);
}

const searchWeather = async (e) => {
  e.preventDefault()
  if(input !== ""){
    await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input2}&aqi=yes&days=5&lang=sk`)
    .then(data => {
      setWeather(data.data);
    })
    .catch(err => console.log(err))
    setTimeout(() => {
    }, 100);
    setInput("")
  } else {
    alert("Zdajte oblasť prosím")
  }
  //console.log(weather);
}
 const searchWeather2 = async (e) => {
  e.preventDefault()
  if(input2 !== "") {
    await  axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input2}&aqi=yes&days=5&lang=sk`)
    .then(data => {
      setLocation(data.data.location);
      setToday(data.data.forecast.forecastday[0])
      setTomorrow(data.data.forecast.forecastday[1])
      setAftertomorrow(data.data.forecast.forecastday[2])
    })
    .catch(err => console.log(err))
    setTimeout(() => {
    }, 100);
    setInput2("")

  }
  if(today) {
    console.log(location);
    console.log(today);
    console.log(tomorrow);
    console.log(afterTomorrow);
  } else {
    alert("data sa neuložili")
  }
}

// zmena km/h na m/s + zaokruhlenie
const fixedNumber = km => ((km * 1000) / 60 / 60).toFixed(1)

  return (
    <StyleApp className="App">
      <Header />
        <StyleFullView variants={animeResult} initial="hidden" animate="show" exit="exit">
          <div className="content">
            {/* <form className="search">
              <input onChange={weatherImput} value={input} type="text" />
              <button onClick={searchWeather} >Hladať</button>
            </form> */}
            <form className="search2">
              <input onChange={weatherImput2} value={input2} type="text" />
              <button onClick={ searchWeather, searchWeather2 } >Hladať</button>
            </form>
            { today && (
              <ActualResult>
                <StyleLocation>
                  <h3>{location.country}, </h3>
                  <h3>{location.name}</h3>
                </StyleLocation>
                <StyleBlocks>
                  <StyleBlockWrap>
                    <div className="block">
                      <h1>{weather.current.temp_c}&#8451;</h1>
                    </div>
                    <div className="block oneline">
                      <img src={today.day.condition.icon} width="30px" alt="icon" />
                      <p>{today.day.condition.text}</p>
                    </div>
                    <div className="block under">
                      <p>Max</p>
                      <p>{today.day.maxtemp_c} &#8451;</p>
                    </div>
                    <div className="block under">
                      <p>Max</p>
                      <p>{today.day.mintemp_c} &#8451;</p>
                    </div>
                    <div className="block under">
                      <p>Východ slnka</p>
                      <p>{today.astro.sunrise}</p>
                    </div>
                    <div className="block under">
                      <p>Vlhkosť</p>
                      <p>{today.day.avghumidity}%</p>
                    </div>
                    <div className="block under">
                      <p>Viditelnosť</p>
                      <p>{weather.current.vis_km}km</p>
                    </div>
                    <div className="block under">
                      <p>Vietor</p>
                      <p>{ fixedNumber(weather.current.wind_kph) }m/s {weather.current.wind_dir}</p>
                    </div>

                  </StyleBlockWrap>
                </StyleBlocks>
              </ActualResult>
            )}
            
          </div>
        </StyleFullView>
    </StyleApp>
  );
}

const StyleApp = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(./image/2-b.jpg);
  background-position: center;
  background-size: cover;
  
`

const StyleFullView = styled(motion.div)`
  width: 100%;
  height: 94vh;

  .content {
    padding: 0 15%;
    @media (max-width: 770px) {
      padding: 0 10%;
    }
  }

  form {
    padding: 2em 0;
    position: relative;
    @media (max-width: 550px) {
      padding: 1em 0;
    }

    input {
      width: 100%;
      height: 2.2em;
      border-radius: 1.5em;
      border: none;
      background: #0000007b;
      outline: none;
      text-align: center;
      color: #fff;
    }
    button {
      padding: 0.4em 1.5em 0.4em 1.5em;
      border: none;
      background: rgb(58, 144, 255);
      color: #fff;
      font-weight: 500;
      border-radius: 1em;
      position: absolute;
      right: -1px;
      top: 36.1%;
      cursor: pointer;
      transition: .3s all ease ;
      @media (max-width: 550px) {
      top: 29.2%;
    }
      &:hover {
        //background: darken(0.5, rgb(58, 144, 255));
        background: rgb(0, 110, 255);
      }
    }
  }
`
const ActualResult = styled(motion.article)`
  display: flex;
  flex-direction: column;
  color: #e7e7e7;
  border-radius: 8px;
  overflow: hidden;
`
const StyleLocation = styled.div`
  background: #eeeeee7d;
  color: #000;
  display: flex;
  justify-content: center;
  h3 {
    margin: 0.2em;
    font-weight: 600;
  }
`
const StyleBlocks = styled.div`
  display: flex;
  background: #0000007b;;
`
const StyleBlockWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .block {
    width: 25%;
    min-height: 6em;
    @media (max-width: 650px) {
      width: 50%;
    }
    h1 {
      font-size: 2.5em;
      margin: 0.5em 0;
    }
    p {
      margin: 0;
      font-size: 0.8em;
    }
  }
  .oneline {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .under {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
`
const StyleResult = styled.article`
  background: #0000007b;
  color: #e7e7e7;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  p {
    font-size: 0.7em;
  }
`
const OneLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export default App;
