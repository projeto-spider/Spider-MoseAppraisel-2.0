<h1 align="center">
  <br>
  <a href="https://github.com/leochrisis/Spider-MoseAppraisel">
    <br>
      Spider MOSEAppraisal
    <br>
  </a>
</h1>

<h4 align="center">A helper tool for bronze certification in the context of<a href="http://www.mosecompetence.com/"> MOSE competence</a></h4>

<p align="center">
  <a href="https://imgur.com/yvEhy6R">
    <img src="https://i.imgur.com/yvEhy6R.png"/>
  </a>
</p>

## Deploy

> Install [NodeJS 8.6](https://nodejs.org/en/) or higher.

```sh
# clone or download the source
git clone https://github.com/leochrisis/Spider-MoseAppraisel.git my-folder-name

# go to the folder
cd my-folder-name

# install dependencies
npm install

# your .env file setups things like database connection (default pg)
cp .env.example .env

# build the app
npm run migrate
npm run seed
npm run build

# start the server
npm start
```

Go to [`localhost:9000`](http://localhost:9000) to see the application running.

## Development

```sh
# clone or download the source
git clone https://github.com/leochrisis/Spider-MoseAppraisel.git my-folder-name

# go to the folder
cd my-folder-name

# install dependencies
npm install

# your .env file setups things like database connection (default pg)
cp .env.example .env

# build the app
npm run migrate
npm run seed

# start the server
npm run dev
```


## Learn more

  * Projeto SPIDER official website (in portuguese): http://spider.ufpa.br/
  * AdonisJS framework used in our back-end: https://adonisjs.com/
  * Nuxt framework used in our front-end: https://nuxtjs.org/
