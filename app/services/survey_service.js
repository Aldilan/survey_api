const db_connection = require('../../config/db')

class survey_service {
  static get_all_surveys(callback) {
    db_connection.query('SELECT * FROM tb_survey', (error, results) => {
      if (error) {
        return callback(error, null)
      }
      return callback(null, results)
    })
  }
}

module.exports = survey_service
