import type { Admin } from '../db/schema';
import type { User } from '../db/schema';
import type { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      admin?: Omit<Admin, 'password'>;
      user?: User;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}
