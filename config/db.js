const mysql = require('mysql')

const db_connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_survey',
})

db_connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error.message)
    return
  }
  console.log('Connected to database')
})

module.exports = db_connection
