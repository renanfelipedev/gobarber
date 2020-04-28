import { Request, Response } from 'express';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class AvatarController {
  async update(request: Request, response: Response): Promise<any> {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new AvatarController();
