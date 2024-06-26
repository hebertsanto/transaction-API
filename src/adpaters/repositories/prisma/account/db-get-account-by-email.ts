import { Account } from '@prisma/client';
import { FindAccountByEmailRepository } from '../../db/account/get-account-by-email-repository';
import { prisma } from '../../../../infra/lib/prisma';

export class DbGetAccountByEmail implements FindAccountByEmailRepository {
  async findByEmail(email: string): Promise<Account | null> {
    const account = await prisma.account.findFirst({ where: { email } });
    return account;
  }
}
