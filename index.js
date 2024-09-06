const Express = require("express");
const App = Express();

App.use(Express.urlencoded({ extended: false }));
App.use(Express.static("public"));

const PORT = process.env.PORT || 6500;
const HOST = "0.0.0.0";

App.listen(PORT, HOST, () => console.log(`Server is running in port : ${PORT}`));

App.get("/", async (req, res, next) => {
    res.send({
        message: "test here message"
    })
})