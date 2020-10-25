const  express = require('express');
const app = express();
const port = 3000

//set view engine
app.set("view engine", "hbs");

//simple get-request
app.get('/', (request, response) => {
    response.send('Главная страница');
});

//http-code
app.get("/home/foo/bar", (request, response) => {
    response.status(400).send(`Некорректный запрос`);
});

//redirect
app.use("/redirect", (request, response) => {
    response.redirect("https://iitu.kz");
});  

//query-params
app.use("/about", (request, response) => {  
    let id = request.query.id;
    let userName = request.query.name;
    response.send("<h1>Информация</h1><p>id=" + id +"</p><p>name=" + userName + "</p>");
});

//GET-params
app.get("/categories/:categoryId/products/:productId", function (request, response) {
    let catId = request.params["categoryId"];
    let prodId = request.params["productId"];
    response.send(`Категория: ${catId}  Товар: ${prodId}`);
});

//controller with view
app.use("/contact", (request, response) =>{
    response.render("contact.hbs", {
        title: "Мои контакты",
        email: "some@email.com",
        phone: "+1234567890"
    });
});

//start listening at port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})