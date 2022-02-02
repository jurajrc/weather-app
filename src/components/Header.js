import React from 'react'
// Stale
import styled from 'styled-components'
// Animation
import { motion } from 'framer-motion';
import { showToTop, showText } from '../animations';
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <StyleHeader variants={showToTop} initial="hidden" animate="show" >
            <Hide>
                <motion.div 
                    className="left"
                    variants={showText}
                    >
                    <FontAwesomeIcon icon={faWind} />
                    <p> 
                        Aktuálne počasie
                    </p>
                </motion.div>
            </Hide>
            <Hide>
                {/* <a href="https://www.weatherapi.com/"> <img src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png" width="60px" alt="Weather data by WeatherAPI.com" /> </a> */}
                <motion.a 
                    className="left"
                    variants={showText}
                    href="https://www.weatherapi.com/" target="_blank" rel="noreferrer" >Weather
                    <span>API</span> 
                </motion.a>
            </Hide>
            
        </StyleHeader>
    )
}

const StyleHeader = styled(motion.header)`
    width: 100%;
    height: 4em;
    position: fixed;
    top: 0;
    left: 0;
    background: #0000007b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15%;
    color: #fff;
    z-index: 1;
    @media (max-width: 770px) {
      padding: 0 10%;
    }
    @media (max-width: 550px) {
      height: 3em
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
const Hide = styled.div`
  overflow: hidden;
`

export default Header
