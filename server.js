const fs = require('fs')
const express = require('express');
const app = express();
// Configure the app (app.rest)
/* START Confid */

app.engine('beer', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)
        const rendered = content.toString()
        .replace('#title#', `<title>${options}</title>`)
        .replace('#message', `<h1>${options.message}</h1>`)
        .replace('#link#', ``)
        return callback(null, rendered)
    })
})

app.set('views', './views')
app.set('view engine', 'beer')


/* END Confid */
// Routes 
app.get('/', (req, res) => {
    const initNumOfBeers = 99
    res.send(`<h1>${initNumOfBeers} Bottles of beer on the wall</h1>
    <a href='/${initNumOfBeers - 1}'>Take one down, pass it around.</a>`)
})

app.get('/0', (req, res) => {
    res.send(`<h1>No more Bottles of Beer on the wall</h1>
    <a href='/'>Click to have 99 bottles reappear</a>`)
})

app.get('/:number_of_bottles', (req, res) => {
    const numOfBeer = req.params.number_of_bottles
        res.send(`<h1>${numOfBeer} Bottles of Beer on the wall</h1>
        <a href='/${numOfBeer - 1}'>Take one down, pass it around.</a>`)
})

app.listen(3000, function () {
    console.log('Listening on port 3000')
})