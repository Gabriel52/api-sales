import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(_request, file, callBack) {
      const fielHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fielHash}-${file.originalname}`;

      callBack(null, fileName);
    },
  }),
};
