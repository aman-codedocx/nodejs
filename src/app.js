const express =  require('express');
const path = require('path');
const hbs = require('hbs')

const port = process.env.PORT || 3000

const app = express();

const public_path = path.join(__dirname, '../public')
const view_path = path.join(__dirname, './templates')
const partial_path = path.join(__dirname, './templates/partial')

app.use(express.static(public_path))

app.set('view engine', 'hbs')
app.set('views', view_path)
hbs.registerPartials(partial_path)

require('./weather')(app);

app.listen(port, () => {
    console.log('Server started on '+port);
})