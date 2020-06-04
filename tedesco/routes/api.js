var express = require('express');
var router = express.Router();
const sql = require('mssql');

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

router.get('/list', function (req, res, next) {
  let sqlQuery = "select * from dbo.";
  executeQuery(res, sqlQuery, next);
});

router.get('/search/:song', function (req, res, next) {
  let sqlQuery = `select * from dbo. where Song = '${req.params.name}'`;
  executeQuery(res, sqlQuery, next);
});


router.post('/', function (req, res, next) {
  let unit = req.body;
  console.log;
  if (!unit) {
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return;
  }


module.exports = router;