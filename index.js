const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { readData, writeData } = require("./functions")
require('dotenv').config()



//MIDLEWARE
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Welcome to my API with NodeJS")
})
//EJEMPLOS DE CREATE Y READ Y EJERCICIO

app.get("/dishes", (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post("/dishes", (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})

//EJEMPLOS DE UPDATE Y DELETE

app.put("/dishes/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id) 
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "Dish update successfully" })

})

app.delete("/dishes/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes.splice(dishIndex, 1)
    writeData(data)
    res.json({ message: "dish delete successfully" })
})

app.listen(proccess.env.PORT, () =>{
    console.log(`El servidor esta corriendo en el puerto ${process.env.BACKEND_BASEURL}`)
})