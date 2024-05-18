const express = require('express')
require('dotenv').config()
const cors =require('cors')
const app = express()

app.use(cors({
    orrigin: process.env.CLIENT_PORT
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/',(res, req)=>{
    res.send('Hello World') 
})


app.listen(process.env.PORT, ()=>{
    console.log(`server run on port ${process.env.PORT}`)
})