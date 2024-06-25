import express from 'express';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import path from 'path';
import url from 'url';

// The project root directory
const rootDir = url.fileURLToPath(new URL('.', import.meta.url));
// Allows you to change the port number if needed
const port = '8000';

const app = express();

// Configure the Express app
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

const sayHello = (request, response) => {
  response.send("Hello client!")
}

app.get('/hello', sayHello)

app.get('/', (request, response) => {
response.render('home.html')
})

app.get('/form', (request, response) => {
  response.render('form.html')
})

app.get('/welcome', (request, response) =>{
  console.log(request.query)
  response.send(`Welcome to the webpage, ${request.query.person}`)
})

app.get('/number-form', (request, response) => {
  response.render('number-form.html')
})

app.post('/fav-number', (request, response) => {
  //console.log(request.body)
  const favNumber = request.body.favNumber
  response.send( `Your favorite number is ${favNumber}`)
})

app.get(`/users/:username`, (request, response) =>{
  //console.log(request.params)
  response.send(`This is the info page for ${request.params.username}`)
})

app.get(`/template-demo`, (request, response) => {
  const date = new Date()
  const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`
  console.log(formattedDate)
  response.render(`template-demo.html.njk`, {date: formattedDate})
})

app.get(`/greet`, (request, response) => {
  const person = request.query.person
  const doTheyWantCompliments = request.query.wantsCompliments

  const randomCompliments = lodash.sampleSize(COMPLIMENTS, 3)

  response.render('greet.html.njk', {
    name: person,
    compliments: doTheyWantCompliments? randomCompliments : [],
  })

})

app.get(`/inherit`, (request, response) => {
  response.render(`inherit.html.njk`)
})