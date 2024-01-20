var express = require('express');
var cors = require('cors');
var app = express();
var multer = require('multer')
// basic config
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/File/Code/Back End Development and APIs ( freeCodeCamp )/File Metadata Microservice/boilerplate-project-filemetadata/files')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage })

// routes
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (req.file) {

    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  } else {
    res.json({
      message: "File not found"
    })
  }
})



// listener
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
