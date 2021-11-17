import React from 'react'
// Stale
import styled from 'styled-components'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <StyleHeader>
            <div className="left">
                <FontAwesomeIcon icon={faWind} />
                <p> 
                    Aktualne počasie
                </p>
            </div>
            
            {/* <a href="https://www.weatherapi.com/"> <img src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png" width="60px" alt="Weather data by WeatherAPI.com" /> </a> */}
            <a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer" >Weather <span>API</span> </a>
            
        </StyleHeader>
    )
}

const StyleHeader = styled.header`
    max-width: 100%;
    min-height: 6vh;
    background: #0000007b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15%;
    color: #fff;
    @media (max-width: 770px) {
      padding: 0 10%;
    }
    .left {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 1.5em;
        color: rgb(58, 144, 255);
        margin-right: .4em;
    }
    a {
        color: white;
        text-decoration: none;
        transition: 0.3s ;
        span {
            color: rgb(58, 144, 255);
        }
        &:hover {
            color: rgb(58, 144, 255);
        }
    }
`

export default Header
