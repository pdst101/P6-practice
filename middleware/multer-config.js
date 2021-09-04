const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

const storage = multer.diskStorage({      //Configurating how to save the file, what to save and how
    destination: (req, file, callback) => {
        callback(null, 'images');   //First argument: if we received an error, folder to save in
    },
    filename: (req, file, callback) => {    //Filename with name map MIME_TYPES
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);    //No errors, file name ??????? Can name of file break something?
    }
}); 

module.exports = multer({storage: storage}).single('image');    //Pass an object (storage)