// import multer from 'multer';

// const storage = multer.diskStorage({
//     filename: function (req, file, callback) {
//         callback(null, file.originalname) 
//     }
// })
// const upload = multer({ storage });
// export default upload;


// middleware/multer.js
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') || 
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and PDFs are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
    files: 2 // Maximum 2 files
  }
});

export default upload;