// netlify/functions/index.js
import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js'; // Update the import path
import booksRoute from './routes/booksRoute.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    return response.status(234).send('welcome');
});

app.use('/books', booksRoute);// Update the route path

// If needed, establish a connection to MongoDB Atlas or another DBaaS
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to the database');
        
        // Netlify automatically assigns a port, so use process.env.PORT
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT || PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error.message);
    });
