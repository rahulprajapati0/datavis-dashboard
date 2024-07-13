const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Optional: Use this if you don't need findAndModify()
    useCreateIndex: true // Optional: Use this to create indexes by default
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// MongoDB Schema and Model (Example)
const dataSchema = new mongoose.Schema({}, { strict: false }); // Define schema based on your JSON structure
const Data = mongoose.model('Data', dataSchema);

// Routes

// GET all data with optional filters
app.get('/api/data', async (req, res) => {
    try {
        const filters = req.query;
        const query = {};

        if (filters.intensity) query.intensity = parseInt(filters.intensity);
        if (filters.likelihood) query.likelihood = parseInt(filters.likelihood);
        if (filters.relevance) query.relevance = parseInt(filters.relevance);
        if (filters.year) query.$or = [{ start_year: filters.year }, { end_year: filters.year }];
        if (filters.topic) query.topic = filters.topic;
        if (filters.sector) query.sector = filters.sector;
        if (filters.region) query.region = filters.region;
        if (filters.pestle) query.pestle = filters.pestle;
        if (filters.source) query.source = filters.source;
        if (filters.country) query.country = filters.country;
        if (filters.city) query.city = filters.city;

        const data = await Data.find(query);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET filters for dropdowns or inputs
app.get('/api/filters', async (req, res) => {
    try {
        const filters = {
            intensity: await Data.distinct('intensity'),
            likelihood: await Data.distinct('likelihood'),
            relevance: await Data.distinct('relevance'),
            year: Array.from(new Set([...(await Data.distinct('start_year')), ...(await Data.distinct('end_year'))])).filter(Boolean),
            topic: await Data.distinct('topic'),
            sector: await Data.distinct('sector'),
            region: await Data.distinct('region'),
            pestle: await Data.distinct('pestle'),
            source: await Data.distinct('source'),
            country: await Data.distinct('country'),
            city: await Data.distinct('city')
        };
        res.json(filters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
