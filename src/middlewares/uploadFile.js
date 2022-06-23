// import package here
const multer = require("multer")

exports.uploadFile = (imageFile) => {
  // code here
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g,""))
    }
  })

  // checking the file extension
  const fileFilter = (req, file, cb) => {
    if(filename === imageFile){
      if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        req.fileValidationError = {
          message: "Only image files are allowed"
        }
        return cb(new Error("Only image files are allowed"))
      }
      cb(null, true)
    }
  }
  
  // checking the file size
  const sizeInMb = 10
  const maxSize = sizeInMb * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).single(imageFile)

  return (req, res, next) => {
    upload (req, res, (err) => {
      if(req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }
      if(!req.file && !err) {
        res.status(400).send({
          message: "Please select file to upload"
        })
      }
      if(err) {
        if(err.code === "LIMIT_FILE_SIZE") {
          res.status(400).send({
            message: "Max File Size 10MB"
          })
        }
      }
      return next()
    })
  }

};