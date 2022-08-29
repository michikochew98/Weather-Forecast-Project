import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
const axios = require('axios')


const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        const data = JSON.stringify({
            "inputValue": inputValue
        });
        const options = {
            method: 'POST',
            url: `http://localhost:8000/geoOptions`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(options)
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch((err) => {
                console.error(err)
            })

    }


    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />)
}

export default Search;
