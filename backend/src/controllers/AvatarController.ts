import { Request, Response } from 'express';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class AvatarController {
  async update(request: Request, response: Response): Promise<any> {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
}

export default new AvatarController();
