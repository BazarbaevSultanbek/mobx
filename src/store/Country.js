import { makeAutoObservable } from "mobx";

class Country {
    allCountries = [];
    countries = [];
    isDarkMode = false;

    constructor() {
        makeAutoObservable(this);
    }

    searchCountry(text) {
        const filteredCountries = this.allCountries.filter((item) => {
            return item.name.common.toLowerCase().startsWith(text.toLowerCase());
        });
        this.countries = filteredCountries;
    }

    SelectFilter(value) {
        if (value === "All") {
            this.countries = this.allCountries;
        } else {
            this.countries = this.allCountries.filter((item) => item.region === value);
        }
    }

    ThemeMode(mode) {
        this.isDarkMode = mode === "dark";
    }

    FetchCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(json => {
                this.allCountries = json;
                this.countries = json;
                this.countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
                this.allCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            })
            .catch(error => {
                console.error("Failed to fetch countries", error);
            });
    }
}

export default new Country();