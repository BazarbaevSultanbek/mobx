import { MoonFilled } from '@ant-design/icons';
import { Select } from 'antd'
import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Country from '../../store/Country';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Info from '../Info/Info';

const MainPage = observer(() => {
    const [clickedCountry, setClickedCountry] = useState(null)
    const [showMain, setshowMain] = useState(true)

    useEffect(() => {
        Country.FetchCountries();
    }, []);

    const handleFilter = (value) => {
        Country.SelectFilter(value);
    };

    const toggleDarkMode = () => {
        Country.ThemeMode(Country.isDarkMode ? "light" : "dark");
    }


    return (
        <div className={`MainPage ${Country.isDarkMode ? "dark-mode" : ""}`}>
            <div className="MainPage-top">
                <MoonFilled />
                <h3 onClick={toggleDarkMode}>Dark mode</h3>
            </div>
            <div className="container">
                <div className='MainPage-pagination'>
                    <Routes>
                        <Route path={`/${clickedCountry}`} element={<Info clickedCountry={clickedCountry} setClickedCountry={setClickedCountry} setshowMain={setshowMain} showMain={showMain} />} />
                    </Routes>
                </div>
                <div className="MainPage-block" style={{ height: Country.countries.length ? "auto" : "100vh", display: showMain ? 'block' : 'none' }}>
                    <div className="MainPage-block-navi">
                        <div>
                            <TextField id="filled-search" label="Search country" onChange={(e) => Country.searchCountry(e.target.value)} type="search" variant="filled" style={{ width: '800px', height: 'auto' }} />
                        </div>
                        <div>
                            <Select
                                defaultValue="Filter"
                                style={{
                                    width: 200,
                                    height: 57,
                                }}
                                onChange={handleFilter}
                                options={[
                                    {
                                        value: 'All',
                                        label: 'All',
                                    },
                                    {
                                        value: 'Africa',
                                        label: 'Africa',
                                    },
                                    {
                                        value: 'Americas',
                                        label: 'Americas',
                                    },
                                    {
                                        value: 'Asia',
                                        label: 'Asia',
                                    },
                                    {
                                        value: 'Europe',
                                        label: 'Europe',
                                    },
                                    {
                                        value: 'Oceania',
                                        label: 'Oceania',
                                    },
                                    {
                                        value: 'Antarctic',
                                        label: 'Polar',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="MainPage-block-cs">
                        <div className='MainPage-block-countries'>
                            {Country.countries.map((item, index) => (
                                <Link to={`./${item.cca3}`} key={index}>
                                    <div key={index} className='MainPage-block-countries-items' onClick={() => { setClickedCountry(item.cca3), setshowMain(false) }}>
                                        <div>
                                            <img src={item.flags.png} alt={item.name.common} />
                                        </div>
                                        <div className="MainPage-block-countries-info">
                                            <h2>{item.name.common}</h2>
                                            <p>Population: {item.population}</p>
                                            <p>Region: {item.region}</p>
                                            <p>Capital City: {item.capital}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MainPage;