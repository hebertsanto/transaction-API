import bcrypt from 'bcrypt';
import { Hasher } from '../protocols/hasher';
import { HashComparer } from '../protocols/hash-comparer';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    const digest = await bcrypt.hash(plaintext, this.salt);
    return digest;
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plaintext, digest);
    return isValid;
  }
}
