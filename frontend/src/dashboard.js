import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function Dashboard() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({
        intensity: '',
        likelihood: '',
        relevance: '',
        year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        country: '',
        city: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3000/api/filters').then(response => {
            setFilters(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/data', { params: selectedFilters }).then(response => {
            setData(response.data);
            // Add your D3.js code here to update the charts
        });
    }, [selectedFilters]);

    const handleFilterChange = (e) => {
        setSelectedFilters({
            ...selectedFilters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Data Visualization Dashboard</h1>
            <div>
                <label>Intensity:</label>
                <select name="intensity" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.intensity && filters.intensity.map(intensity => (
                        <option key={intensity} value={intensity}>{intensity}</option>
                    ))}
                </select>
                <label>Likelihood:</label>
                <select name="likelihood" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.likelihood && filters.likelihood.map(likelihood => (
                        <option key={likelihood} value={likelihood}>{likelihood}</option>
                    ))}
                </select>
                <label>Relevance:</label>
                <select name="relevance" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.relevance && filters.relevance.map(relevance => (
                        <option key={relevance} value={relevance}>{relevance}</option>
                    ))}
                </select>
                <label>Year:</label>
                <select name="year" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.year && filters.year.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label>Topic:</label>
                <select name="topic" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.topic && filters.topic.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>
                <label>Sector:</label>
                <select name="sector" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.sector && filters.sector.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                    ))}
                </select>
                <label>Region:</label>
                <select name="region" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.region && filters.region.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
                <label>Country:</label>
                <select name="country" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.country && filters.country.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <label>City:</label>
                <select name="city" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.city && filters.city.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div id="chart"></div>
        </div>
    );
}

export default Dashboard;
