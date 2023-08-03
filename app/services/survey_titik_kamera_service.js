const db_connection = require('../../config/db')

class survey_titik_kamera_service {
  static get_all_surveys_titik_kamera(callback) {
    db_connection.query(
      'SELECT * FROM tb_survey_titik_kamera',
      (error, results) => {
        if (error) {
          return callback(error, null)
        }
        return callback(null, results)
      }
    )
  }
  static create_survey_titik_kamera(survey_titik_kamera_data, callback) {
    const { id_survey, judul_titik, foto_titik } = survey_titik_kamera_data
    db_connection.query(
      'INSERT INTO `tb_survey_titik_kamera` (`Id_Survey_Titik_Kamera`, `Id_Survey`, `Judul_Titik`, `Foto_Titik`) VALUES (NULL, ?, ?, ?)',
      [id_survey, judul_titik, foto_titik],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        const survey_titik_kamera_id = result.insertId
        return callback(null, survey_titik_kamera_id)
      }
    )
  }
}

module.exports = survey_titik_kamera_service
