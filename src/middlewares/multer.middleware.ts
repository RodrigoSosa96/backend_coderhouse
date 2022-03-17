import multer, { Multer } from 'multer';
import path from 'path';
import { v4 } from 'uuid';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + v4()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

let upload: Multer
if (process.env.NODE_ENV === 'development') upload = multer({ storage:multer.memoryStorage() });
else upload = multer({ storage });

export default upload;