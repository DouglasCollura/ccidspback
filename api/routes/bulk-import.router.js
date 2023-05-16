const express = require('express');
const validatorHandler = require('../middlewares/validator.handler')
const router = express.Router();

const fs = require('fs')
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'tmp/csv/' });
const ImportService = require('./../services/bulk-import.service')
const bulkService = new ImportService;

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})

// const upload = multer({
//   storage: storage,
// })

router.post('/',  upload.single('file'), async (req, response, next) => {
  console.log('dir file ', req.file.path)
  let fileRows = [];
  csv.parseFile(req.file.path)
    .on("data",  (data)=> {
      const row = data[0].replaceAll(';',',').split(',')
      // fileRows.push(); // push each row
      console.log('columna,', row)
      fileRows.push(row);
    })
    .on("end", function () {
      fileRows.shift()

      fileRows.map((rows,index)=> rows.map(e=> e == '' && response.status(400).json({status:'error',message:`tienes campos vacíos en la fila ${index+2}`})))
      fileRows.map((rows,index)=>
        rows[4].length < 8  &&
        response.status(400).json({status:'error',message:`la cedula colocada en la fila ${index+2} no es correcta, verifique su longitud y que sean solo números.`})
      )
      // if(  row[5].length < 7) { response.status(400).json({status:'error',message:`la cedula ${row[5]} no cumple con el minimo de caracteres requeridos`})}
      fs.unlinkSync(req.file.path);

      try {
        res =bulkService.create(fileRows.map(e=>{
          return {
            exp: e[0],
            people:{
              name: e[1],
              lastname: e[2],
              nationality: e[3] == 'V'? 1 : 2,
              cedula: e[4]
            }
          }
        }))
        response.status(201).json({status:'ok',data:res})
      } catch (error) {
        next(error);
      }

         // remove temp file


      //process "fileRows" and respond
    })

  // csvToDb(__dirname + '/uploads/' + req.file.filename)
  // try {
  //   const body = request.body;
  //   res = await estadoService.create(body)
  //   response.status(201).json({status:'ok',data:res})
  // } catch (error) {
  //   next(error);
  // }
})


function csvToDb(csvUrl) {
  let stream = fs.createReadStream(csvUrl)
  let collectionCsv = []
  let csvFileStream = csv
    .parse()
    .on('data', function (data) {
      collectionCsv.push(data)
    })
    .on('end', function () {
      collectionCsv.shift()
      console.log('dir ',collectionCsv)
      BulkService.cre
      // db.connect((error) => {
      //   if (error) {
      //     console.error(error)
      //   } else {
      //     let query = 'INSERT INTO users (id, name, email) VALUES ?'
      //     db.query(query, [collectionCsv], (error, res) => {
      //       console.log(error || res)
      //     })
      //   }
      // })
      fs.unlinkSync(csvUrl)
    })
  stream.pipe(csvFileStream)
}

module.exports = router;
