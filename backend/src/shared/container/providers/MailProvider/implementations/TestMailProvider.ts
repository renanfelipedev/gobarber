import IMailProvider from '../models/IMailProvider';

class TestMailProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {}
}

export default TestMailProvider;
