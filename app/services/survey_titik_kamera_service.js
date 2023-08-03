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
    const { id_survey_titik_kamera, judul_titik, foto_titik } =
      survey_titik_kamera_data
    db_connection.query(
      'INSERT INTO `tb_survey_titik_kamera` (`Id_Survey_Titik_Kamera`, `Id_Survey`, `Judul_Titik`, `Foto_Titik`) VALUES (NULL, ?, ?, ?)',
      [id_survey_titik_kamera, judul_titik, foto_titik],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        const survey_titik_kamera_id = result.insertId
        return callback(null, survey_titik_kamera_id)
      }
    )
  }
  static update_survey_titik_kamera(
    survey_titik_kamera_id,
    survey_titik_kamera_data,
    callback
  ) {
    const { judul_titik, foto_titik } = survey_titik_kamera_data
    db_connection.query(
      'UPDATE `tb_survey_titik_kamera` SET `Judul_Titik` = ?, `Foto_Titik` = ? WHERE `tb_survey_titik_kamera`.`Id_Survey_Titik_Kamera` = ?',
      [judul_titik, foto_titik, survey_titik_kamera_id],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        return callback(null, result.affectedRows > 0)
      }
    )
  }
  static delete_survey_titik_kamera(survey_titik_kamera_id, callback) {
    db_connection.query(
      'DELETE FROM `tb_survey_titik_kamera` WHERE `tb_survey_titik_kamera`.`Id_Survey_Titik_Kamera` = ?',
      [survey_titik_kamera_id],
      (error, result) => {
        if (error) {
          return callback(error, null)
        }
        return callback(null, result.affectedRows > 0)
      }
    )
  }
}

module.exports = survey_titik_kamera_service
