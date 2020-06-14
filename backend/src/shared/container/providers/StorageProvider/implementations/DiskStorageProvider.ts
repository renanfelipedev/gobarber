import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const originalFile = path.resolve(uploadConfig.directory, file);
    const movedFile = path.resolve(uploadConfig.uploadsFolder, file);

    await fs.promises.rename(originalFile, movedFile);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      fs.promises.stat(filePath);
    } catch {
      return;
    }

    fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
