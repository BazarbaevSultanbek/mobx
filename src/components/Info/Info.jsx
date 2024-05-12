import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import Country from '../../store/Country'
import { observer } from 'mobx-react-lite'
import { ArrowLeftOutlined } from '@ant-design/icons'

const Info = observer(({ clickedCountry, setClickedCountry, setshowMain, showMain }) => {

    useEffect(() => {
        Country.FetchCountries();
    }, []);


    const handleBackClick = () => {
        setClickedCountry(null);
        setshowMain(true);
    }

    return (
        <div className={`Info ${Country.isDarkMode ? "dark-mode" : ""}`} style={{ display: showMain ? 'none' : 'block' }}>
            <div className="container">

                <div className="Info-block">
                    <div className="Info-block-inner">
                        <div className="Info-block-inner-flag">
                            <Link to={'/'}><button className='Back' onClick={handleBackClick}><ArrowLeftOutlined />Back</button></Link>
                            {
                                Country.countries.map((item, index) => {
                                    if (item.cca3 === clickedCountry) {
                                        return <img src={item.flags.png} alt="" key={index} />
                                    }
                                })
                            }
                        </div>
                        <div className="Info-block-inner-data">
                            {
                                Country.countries.map((item, index) => {
                                    if (item.cca3 === clickedCountry) {
                                        return <div key={index}>
                                            <h2>{item.name.common}</h2>
                                            <div className='Info-inner-data-text'>
                                                <p><strong>Native Name:</strong> {item.name?.nativeName ? Object.entries(item.name.nativeName).map(([lang, names]) => `${lang}: ${names.common}`).join(", ") : ""}</p>
                                                <p><strong>Population:</strong> {item.population}</p>
                                                <p><strong>Region:</strong> {item.region}</p>
                                                <p><strong>SubRegion:</strong> {item.subregion}</p>
                                                <p><strong>Capital City:</strong> {item.capital}</p>
                                                <p><strong>Currency:</strong> {item.currencies ? Object.entries(item.currencies).map(([code, currency]) => `${currency.name} (${currency.symbol})`).join(", ") : ""}</p>
                                                <p><strong>Languages:</strong> {item.languages ? Object.entries(item?.languages).map(([code, language]) => language).join(", ") : ""}</p>
                                            </div>
                                        </div>
                                    }
                                })
                            }
                            <div className="Info-inner-data-navi">
                                <strong>Border countries:</strong>

                                {
                                    Country.countries.map((item, index) => {
                                        if ((item.cca3 === clickedCountry) && item.borders) {
                                            return (
                                                <div key={index}>
                                                    {item.borders.map((border, bIndex) => (
                                                        <Link key={bIndex} to={`/${border}`} onClick={() => setClickedCountry(border)}>
                                                            <button className='border-country'>{border}</button>
                                                        </Link>
                                                    ))}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                }


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
})

export default Info;
