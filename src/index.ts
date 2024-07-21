require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const connection = require('../mongoDb/connection')
const userRouter = require('../Routes/UserRoutes')



//Mongo db connection
connection();

// Middlewares
app.use(express.json())
app.use(cors())


// routes

app.use('/api/v1/auth', userRouter)



const port = process.env.PORT || 3500


// app.get('/', (req, res) => {
//     res.send("Hello World by Me");
// })


app.listen(port, () => {
    console.log(`Server is started on port number ${port}`)
})