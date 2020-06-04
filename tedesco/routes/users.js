var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const config = {
  user: 'tedesco.luca',
  password: 'xxx123#',
  server: "213.140.22.237",
  
};

let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request();
    request.query(query, function (err, result) {
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      res.send(result.recordset);
      sql.close();
    });
  });
}

router.get('/unita', function (req, res, next) {
  let sqlQuery = "SELECT * FROM ";
  executeQuery(res, sqlQuery, next);
});

router.get('/unita/:nome', function (req, res, next) {
  let sqlQuery = `SELECT * FROM  WHERE Unit = '${req.params.nome}'`;
  executeQuery(res, sqlQuery, next);
});

router.post('/', function (req, res, next) {
  let unit = req.body;
  if (!unit) {
    next(createError(400 , "Please provide a correct unit"));
  }
  sql.connect(config, err => {
    let sqlRequest = new sql.Request();
    sqlRequest.query(sqlInsert, (error, results) => {
        if (error) throw error;
        sqlRequest.query(`SELECT * FROM  WHERE Unit = '${unit.Unit}'`, (err, result) => {
            if (err) console.log(err);
            res.render('dettagli', { risultato: result.recordset});
        });
    });
  })
});

module.exports = router;
