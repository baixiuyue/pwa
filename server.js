const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 8807;
const app = express();

app.use(express.static(path.join(__dirname, '/')));

app.use('/app/home', async (req, res, next) => {
  const result = fs.readFileSync(path.join(__dirname, './index.html'),'utf-8')
  res.set('content-type', 'text/html');
  res.send(result);
  res.end();
});

// const cors = require('cors');
// app.use(cors());

// app.use(async (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
//   res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
//   const result = {
//     url: 'baidu.com'
//   };
//   // res.set('content-type', 'text/json');
//   console.log(Date.now());
//   res.send(result);
//   res.end();
// });


function startExpress() {
  app.listen(PORT, function () {
    console.log(`成功启动：http://localhost:${PORT}`);
  }).on('error', function (err) {
    if (err.message.includes('address already in use')) {
      PORT++;
      startExpress();
    } else {
      console.log(err);
    }
  });
}

startExpress();
