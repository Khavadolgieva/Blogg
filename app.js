const express = require('express');
const cors = require('cors');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', blogRoutes);


app.get('/', (req, res) => {
    res.send('BloggApp-serveren kjører!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server kjører på port ${PORT}`);
});