const express = require('express');
const app = express()
const port = 3000;
const name = process.env.name || 'Wizards';

app.get('/', (req, res) => res.send(`Hello ${name}!`));
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
