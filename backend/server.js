const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectDB();
app.use('/api/employees', require('./routes/employees'));
app.use('/api/slips', require('./routes/slips'));
// static for tmp download if needed
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
