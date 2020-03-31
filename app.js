const express = require('express')
const app = express()

const connectDB = require('./config/db')

connectDB()

app.get('/', (req, res) => res.send('API Up')) 

const usersapi =  require('./routes/users')
const casesapi =  require('./routes/cases')
const caseapi = require('./routes/case')

app.use(usersapi)
app.use(casesapi)
app.use(caseapi)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))