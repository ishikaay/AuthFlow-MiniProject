const multer  = require('multer');
const path = require('path')
const crypto = require('crypto')



//disk storage-> jo hum server pe store ya upload kartey hai

const storage = multer.diskStorage({

    //here we are specifying the destination folder where the uploaded files will be stored. The cb function is a callback that takes two arguments: an error (if any) and the destination path. In this case, we are specifying the path './public/images/uploads' as the destination folder for uploaded files.
 
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'./public/images/uploads'))                        // yaha per hum folder ka path de rahe hai jaha per hum file ko store karna chahtey hai
  },

  //here we are generating a unique filename for each uploaded file using crypto.randomBytes() and appending the original file extension to it. This ensures that each file has a unique name and prevents overwriting of files on the server.
  
  filename: function (req, file, cb) {
         crypto.randomBytes(16, function (err, name) { 
            const fn = name.toString("hex")+path.extname(file.originalname);             //crypto.randomBytes() ek random unique name generate karat hai taki hum har uploaded file ko unique name de sakey taki humare server pe koi bhi file overwrite na ho
            cb(null, fn)
        })
    }
})


// export upload variable(images/files) jo ki multer ke storage configuration ko use kar raha hai. Ye variable humare application me file upload ke liye use hoga.

const upload = multer({ storage: storage })

module.exports = upload;










// exports upload variable(images/files)

