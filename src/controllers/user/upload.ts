import { Request, Response } from 'express';
import multer from 'multer';
import { v4 } from 'uuid';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "/uploads")
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + v4()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage });

export const postPicture = async (req: Request, res: Response) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).json({ message: 'Upload success' })
}