const sql = require("./db/db");
// Requiring the module
const cors = require("cors");
const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const app = express();
app.use(express.json());
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// Handling '/' request
app.post('/register', (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    if (err) {
      res.send({ error: 'something went wrong' })
    } else {
      const queryData = `('${data.name}', '${data.role}', '${data.email}', '${data.mobile}','${hash}','${data.address}')`
      let dataQuery = `insert into users(name, role, email, mobile, password, address) VALUES ${queryData};`;
      sql.query(dataQuery, (dataErr, dataResult) => {
        if (dataErr) {
          res.send({ error: `Something went wrong ${dataErr}` });
        } else {
          res.send({ res: 'Data Saved Successfully' });
        }
      });

    }
  })
});
// register
app.post('/checkout', (req, res) => {
  const data = req.body;
 
      const queryData = `('${data.domain}', '${data.category_id}', '${data.event_date}', '${data.promo_code}','${data.user_id}')`
      let dataQuery = `insert into checkout(domain, category_id, event_date, promo_code, user_id) VALUES ${queryData};`;
      sql.query(dataQuery, (dataErr, dataResult) => {
        if (dataErr) {
          res.send({ error: `Something went wrong ${dataErr}` });
        } else {
          res.send({ res: 'Data Saved Successfully' });
        }
      });
});
// login
app.post('/login', (req, res) => {
  const mobile = req.body.mobile;
  const password = req.body.password;
  if (mobile && password) {

    let query = `select * from users where mobile ='${mobile}'`;
    sql.query(query, (err, result) => {
      if (result?.length > 0) {
        bcrypt.compare(password, result[0].password, function (err, result) {
          if (err || !result) {
            res.send({ error: 'Login Failed' });
          } else {
            res.send({ message: 'Login success' });
          }
        });
      } else {
        res.send({ message: `Something went wrong` });
      }
    });
  } else {
    res.send({ message: 'Login falied' })
  }
});
app.listen(3000, () => {
  console.log('server listening on port 3000');
});