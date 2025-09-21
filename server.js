const express = require('express');
const path = require('path');
const linkedIn = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// API endpoint for job search
app.post('/api/jobs', async (req, res) => {
    try {
        console.log('Received job search request:', req.body);
        
        const queryOptions = {
            keyword: req.body.keyword || '',
            location: req.body.location || '',
            dateSincePosted: req.body.dateSincePosted || '',
            jobType: req.body.jobType || '',
            remoteFilter: req.body.remoteFilter || '',
            salary: req.body.salary || '',
            experienceLevel: req.body.experienceLevel || '',
            limit: req.body.limit || '10',
            sortBy: req.body.sortBy || 'recent',
            page: req.body.page || '0',
            has_verification: req.body.has_verification || false,
            under_10_applicants: req.body.under_10_applicants || false
        };

        console.log('Query options:', queryOptions);
        
        const jobs = await linkedIn.query(queryOptions);
        
        console.log(`Found ${jobs.length} jobs`);
        res.json(jobs);
        
    } catch (error) {
        console.error('Error in job search API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch jobs', 
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 for other routes
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        error: 'Internal server error', 
        message: error.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 LinkedIn Jobs API server running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to http://localhost:${PORT} to use the web interface`);
    console.log(`🔍 API endpoint available at http://localhost:${PORT}/api/jobs`);
});

module.exports = app;