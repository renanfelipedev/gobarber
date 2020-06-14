export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashedText: string): Promise<boolean>;
}
