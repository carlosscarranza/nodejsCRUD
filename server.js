import express from 'express';
import bodyParser from 'body-parser';
import routes from './app/routes/cliente.routes.js';

const app = express();

app.use(routes);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to bezkoder application"});
})

app.listen(3000, () => {
    console.log("Server ejecutandose en el puerto 3000.");
})