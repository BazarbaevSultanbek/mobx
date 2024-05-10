import { Link } from '@mui/material'
import React from 'react'
import Country from '../../store/Country'

function Info() {
    return (
        <div className='Info'>
            <div className="container">
                <div className="Info-block">
                    <div className="Info-block-inner">
                        <div className="Info-block-inner-flag">
                            {
                                Country.countries.map((item, index) => (
                                    <img src={item.flag.png} alt="" />
                                ))
                            }
                        </div>
                        <div className="Info-block-inner-data">
                            {
                                Country.countries.map((item, index) => (
                                    <div>
                                        <h2>{item.name.common}</h2>
                                        <p>Native Name: {item.nativeName.common}</p>
                                        <p>Population: {item.population}</p>
                                        <p>Region: {item.region}</p>
                                        <p>SubRegion: {item.subregion}</p>
                                        <p>Capital City: {item.capital}</p>
                                        <p>Currency: {item.currency}</p>
                                        <p>Currency: {item.language}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="Info-block-navi">
                        <p>Border countries</p>

                        {
                            Country.countries.map((item, index) => (
                                <div key={index}>
                                    <Link>
                                        <button>{item.border.countries}</button>
                                    </Link>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info