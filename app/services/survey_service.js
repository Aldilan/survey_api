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
  static create_survey(survery_data, callback) {
    const { nama_projek, alamat, email, no_telpon, status } = survery_data
    db_connection.query(
      'INSERT INTO `tb_survey` (`Id_Survey`, `Nama_Projek`, `Alamat`, `Email`, `Nomor_Telpon`, `Status_Survey`) VALUES (NULL, ?, ?, ?, ?, ?)',
      [nama_projek, alamat, email, no_telpon, status],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        const survey_id = result.insertId
        return callback(null, survey_id)
      }
    )
  }
  static update_survey(survey_id, survey_data, callback) {
    const { nama_projek, alamat, email, no_telpon, status } = survey_data
    db_connection.query(
      'UPDATE `tb_survey` SET `Nama_Projek` = ?, `Alamat` = ?, `email` = ?, `Nomor_Telpon` = ?, Status_Survey = ? WHERE `tb_survey`.`Id_Survey` = ?',
      [nama_projek, alamat, email, no_telpon, status, survey_id],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        return callback(null, result.affectedRows > 0)
      }
    )
  }
  static delete_survey(survey_id, callback) {
    db_connection.query(
      'DELETE FROM `tb_survey` WHERE `tb_survey`.`Id_Survey` = ?',
      [survey_id],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        return callback(null, result.affectedRows > 0)
      }
    )
  }
}

module.exports = survey_service
