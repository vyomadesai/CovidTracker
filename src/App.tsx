import React, { useEffect, useState } from 'react';
import './App.css';
import {
  FormControl,
  Select,
  Card,
  CardContent,
  MenuItem
} from "@mui/material";
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import TableS from './components/Table';
import LineGraph from './components/LineGraph';
import { prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfoMa, setCountryInfo] = useState({});
  const [InfoMac, setInfoc] = useState([]);
  const [InfoMaTC, setInfoTC] = useState([]);
  const [InfoMar, setInfor] = useState([]);
  const [InfoMaTR, setInfoTR] = useState([]);
  const [InfoMad, setInfod] = useState([]);
  const [InfoMaTD, setInfoTD] = useState([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [mapCountries, setMapCountries] = useState<any[]>([]);
  const [tableData, setTableData] =  useState<any[]>([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796 ]);
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setInfoc(data.cases);
        setInfoTC(data.todayCases);
        setInfor(data.recovered);
        setInfoTR(data.todayRecovered);
        setInfod(data.deaths);
        setInfoTD(data.todayDeaths);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        const data = await response.json();
        let sortedData = sortData(data);
        setCountries(data);
        setTableData(sortedData);
        setMapCountries(data);
      };
      getCountries();
  }, []);


  const onCountryChange = async (e: { target: { value: any; }; }) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setInfoc(data.cases);
        setInfoTC(data.todayCases);
        setInfor(data.recovered);
        setInfoTR(data.todayRecovered);
        setInfod(data.deaths);
        setInfoTD(data.todayDeaths);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="App">
        <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
         <FormControl className="app__dropdown">
          <Select variant="outlined" 
          value={country}
          onChange={onCountryChange}
          >
         <MenuItem value="worldwide">Worldwide</MenuItem>
             {countries.map((country, i) => (
              <MenuItem key={i} value={country.countryInfo.iso2}>{country.country}</MenuItem>
              ))}
        </Select>
        </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox
            onClick={(e: any) => setCasesType("cases")}
            title="Infected"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(InfoMac)}
            total={numeral(InfoMaTC).format("0.0a")}
          />
          <InfoBox
            onClick={(e: any) => setCasesType("recovered")}
            title="Recovered"
            isRed
            active={casesType === "recovered"}
            cases={prettyPrintStat(InfoMar)}
            total={numeral(InfoMaTR).format("0.0a")}
          />
          <InfoBox
            onClick={(e: any) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(InfoMad)}
            total={numeral(InfoMaTD).format("0.0a")}
          />
          {/* <LineGraph className="app__graph" casesType={casesType} /> */}
        </div>
        <Card>
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <TableS countries={tableData} />
            {/* <h3 className='app__graphTittle'>World Wild New {casesType}</h3> */}
            {/* <LineGraph className="app__graph" casesType={casesType} /> */}
          </div>
        </CardContent>
      </Card>
       
        <div className="app__left">
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
         />
      {/* </div>
      <div className="app__right"> */}
      
      </div>
    </div>
  );
};

export default App;
