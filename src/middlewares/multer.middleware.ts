import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileFilter = (
    request: Express.Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/svg+xml'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + v4()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage, fileFilter });


// var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
// module.exports = uploadFile;

export default upload;