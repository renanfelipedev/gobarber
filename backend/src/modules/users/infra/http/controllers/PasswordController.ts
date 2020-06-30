import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class PasswordController {
  async store(request: Request, response: Response): Promise<any> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }

  async update(request: Request, response: Response): Promise<any> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ password, token });

    return response.status(204).json();
  }
}

export default new PasswordController();
