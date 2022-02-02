import React, { useState } from 'react'
import axios from 'axios';
// Components
import Header from './components/Header';
// styled
import styled from 'styled-components';
// animation
import { motion, AnimatePresence } from 'framer-motion';
import { animeInput, popup } from './animations';
import { GlobalSlyle } from './components/GlobalStyle';


// password ôlkjfdsa456

function App() {
  // useState
  const [weather, setWeather] = useState(null)

  const [input2, setInput2] = useState("")

  const [location, setLocation] = useState(null)
  const [today, setToday] = useState(null)
  const [tomorrow, setTomorrow] = useState(null)
  const [afterTomorrow, setAftertomorrow] = useState(null)
  
  
  // useEffect( async () => { 
  //   await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Poprad&aqi=yes&lang=sk`)
  //   .then(data => {
  //     setWeather(data.data);
  //   })
  //   .catch(err => console.log(err))
  // }, [])

// event form
const weatherImput2 = (e) => {
  setInput2(e.target.value);
}

 const searchWeather2 = async (e) => {
  e.preventDefault()
  console.log(input2);
  if(input2 !== ""){
    await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input2.toLowerCase()}&aqi=yes&days=5&lang=sk`)
    .then(data => {
      setWeather(data.data);
      console.log(data.data);
    })
    .catch(err => console.log(err))
    
    
  } else {
    alert("Zdajte oblasť prosím")
  }

  if(input2 !== "") {
    await  axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input2.toLowerCase()}&aqi=yes&days=5&lang=sk`)
    .then(data => {
      setLocation(data.data.location);
      setToday(data.data.forecast.forecastday[0])
      setTomorrow(data.data.forecast.forecastday[1])
      setAftertomorrow(data.data.forecast.forecastday[2])
    })
    .catch(err => {
      console.log(err)
      alert(`Mesto ${input2} sa v databáze nenachádza.`)
    })
    
    setInput2("")

  }
  
}

// zmena km/h na m/s + zaokruhlenie
const fixedNumber = km => ((km * 1000) / 60 / 60).toFixed(1)

  return (
    <StyleApp className="App">
      <GlobalSlyle />
      <Header />
        <StyleFullView>
          <div className="content">
            <Hide>
              <motion.form className="search2"variants={animeInput}  initial="hidden" animate="show" exit="exit" >
                <input onChange={weatherImput2} value={input2} type="text" placeholder='Zadaj mesto' autoFocus />
                <button onClick={ searchWeather2 } >Hladať</button>
              </motion.form>
            </Hide>
            <AnimatePresence>
            { today && (
              <ActualResult variants={popup} initial="hidden" animate="show" exit="exit">
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
                      <p>Min</p>
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
                      <p>Viditeľnosť</p>
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
            </AnimatePresence>
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
  overflow-x: hidden;
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
    padding: 6em 0 1.8em;
    position: relative;
    @media (max-width: 550px) {
      padding: 4em 0 1.3em;
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
      ::placeholder {
      color: #e7e7e7ae;
      }
    }
    button {
      padding: 0.4em 1.5em 0.4em 1.5em;
      border: none;
      background: rgb(58, 144, 255);
      color: #fff;
      font-weight: 500;
      border-radius: 1em;
      position: absolute;
      right: 2px;
      bottom: 2.26em;
      cursor: pointer;
      transition: .3s all ease ;
      @media (max-width: 550px) {
       bottom: 1.69em;
      }
      &:hover {
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
const Hide = styled.div`
  overflow: hidden;
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
    text-align: center;
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

export default App;