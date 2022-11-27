const sql = require("./db/db");
// Requiring the module
const cors = require("cors");
const express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const saltRounds = 10;
const app = express();
// app.use(express.json());
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
/**
 * email
 */
 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'homeliveevents@gmail.com',
    pass: 'jqwywxvjkvcopgor'
  }
});
// Handling '/' request
app.get('/', (req, res) => {
  res.send('Live streaming API is working!')
});
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
          // res.send({ res: 'Data Saved Successfully' });
          const userData = data.userData;
          console.log(userData, 'userdata***')
          var mailOptions = {
            from: 'homeliveevents@gmail.com',
            to: ['homeliveevents@gmail.com', 'gnitramesh@gmail.com'],
            subject: `Event registered on ${data?.event_date}`,
            html: `<h4><b>Dear Admin</b></h4><p> New event booked at  ${data?.event_date} </p>
            <br />
            User Name: ${userData.name} <br/>
            User Email: ${userData.email} <br/>
            User Mobile: ${userData.mobile} <br/>
            <a href="${data.domain}"> ${data.domain} </a>`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.send('Email not sent to admin');
            } else {
              console.log('Email sent: ' + info.response);
              res.send('Email sent to Admin');
            }
          });
        }
      });
});
// login
app.post('/login', (req, res) => {
  const userId = req.body.mobile;
  const password = req.body.password;
  if (userId && password) {

    let query = `select * from users where email ='${userId}'`;
    sql.query(query, (err, result) => {
      if (result?.length > 0) {
        bcrypt.compare(password, result[0].password, function (err, passResult) {
          if (err || !passResult) {
            res.status(400)
            res.send({ error: 'Login Failed' });
          } else {
            res.status(200);
            res.send({ message: 'Login success', data:result[0] });
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
app.get('/get/users', (req, res) => {
    let query = `select * from users`;
    sql.query(query, (err, result) => {
       if (err || !result) {
            res.send({ message: 'No users data found' });
          } else {
            res.send({ data:result });
          }
        });
     });
    
     app.post('/update/videoid', function (req,res) {
      var query = `update user_images set video_id='${req.body.videoId}' where user_id = '${req.body.userId}'`;
      
      sql.query(query, (err, result) => {
        if (err) {
          res.send({ message: 'Data not saved' });
        } else {
          res.send({ message: 'Data Saved' });
        }
      });
      
      });

app.post('/upload/images', function (req,res) {
var query = '';
if(req.body.type==='banner'){
query = "delete from user_images where type='banner'; INSERT INTO `user_images`(`user_id`, `img`, `type`) VALUES ('" + req.body.user_id + "','" + req.body.img + "', '" + req.body.type + "')";
} else {
  query = "INSERT INTO `user_images`(`user_id`, `img`, `type`) VALUES ('" + req.body.user_id + "','" + req.body.img + "', '" + req.body.type + "')";
  }
sql.query(query, (err, result) => {  
  if (err) {
    res.send({ message: 'Data not saved' });
  } else {
    res.send({ message: 'Data Saved' });
  }
});

});
app.get('/get/images/:id', function (req,res) {
  let query = `select * from user_images where user_id='${req.params.id}'`;
  sql.query(query, (err, result) => {
     if (err || !result) {
          res.send({ message: 'No users data found' });
        } else {
          res.send({ data:result });
        }
      });
   
  });
app.listen(3000, () => {
  console.log('server listening on port 3000');
});
