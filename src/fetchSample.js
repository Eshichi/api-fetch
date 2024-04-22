import React, { useEffect, useState } from 'react'

export default function FetchSample() {
    const [data , setData] = useState([]);
    const [search , setSearch] = useState([]);

    useEffect(()=> {
        fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
        .then((res) => res.json())
        .then((data) => setData(data.features));

        
    },[])

    const filteredData = () =>{
        let mappedData = [];
        data.filter(eq => eq.properties.place.toUpperCase()
        .includes(search.toUpperCase()))
        .map((filtered, index)=> mappedData.push(filtered))

        setData(mappedData)
    }

    const sortData = () => {
        let mappedData = [];
        data.sort(function(a,b) { 
            if(a.properties.place < b.properties.place ) return -1;
            if(a.properties.place > b.properties.place ) return 1;
            return 0
        }).map((filtered, index)=> mappedData.push(filtered))

        setData(mappedData)
        console.log(mappedData)
    }
    console.log(data)
    return (
        <div>
            <input type='text' value={search} onChange={e => setSearch(e.currentTarget.value) }  />
            <button onClick={filteredData}>Filter</button>
            <button onClick={sortData}>Sort</button>
            <ul>
                {
                    
                    // data.sort(function(a,b) { 
                    //     if(a.properties.place < b.properties.place ) return -1;
                    //     if(a.properties.place > b.properties.place ) return 1;
                    //     return 0
                    // }).map((item, index) => 
                    //     <li key={index}>{item}</li>
                    // ) 

                    data.map((item, index) => 
                        <li>{item.properties.place}</li>
                    )
                }
            </ul>
        </div>
    )
}
