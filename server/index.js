require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Mongodb Connected"))
.catch((err)=>console.error(err))

app.use("/api/users",require("./routes/users"))
app.use("/api/tasks",require("./routes/tasks"))

app.listen(process.env.PORT,()=>{console.log(`server running on port ${process.env.PORT}`)})