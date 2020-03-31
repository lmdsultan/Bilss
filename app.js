//1
const express = require('express')
//2 
const app = express()
//13A
const connectDB = require('./config/db')
connectDB()

//int middleware
//20
app.use(express.json({ extended: false}))

// index
app.get('/', (req, res) => res.send('API Up')) 

//13B
const usersapi =  require('./routes/users')
const casesapi =  require('./routes/cases')
const caseapi = require('./routes/case')
const authapi = require('./routes/auth')


//13C
app.use(usersapi)
app.use(casesapi)
app.use(caseapi)
app.use(authapi)

//3
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))