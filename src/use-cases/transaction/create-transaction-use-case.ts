import { PrismaCardsRepository } from '../../adpaters/repositories/prisma/prisma-card-repository';
import { PrismaTransactionRepository } from '../../adpaters/repositories/prisma/prisma-transaction';
import { MissingParamError, ParamDoesNotExist } from '../../helpers/error';
import { TTransaction } from '../../helpers/types';

export class CreateTranscationUseCase {

  constructor(
    private cardRepository: PrismaCardsRepository,
    private transactionRepository: PrismaTransactionRepository
  ) {}
  /**
   *create
   * @param { string } ammout -value of transaction
   * @param { string } card_id
   * @returns { Promise<TTransaction>}
   */
  async create({ ammout, card_id }: TTransaction) {
    if (!ammout) {
      throw new MissingParamError('ammout');
    }

    if (!card_id) {
      throw new MissingParamError('card_id');
    }
    const cardExist = await this.cardRepository.listCardById(card_id);

    if (!cardExist) {
      throw new ParamDoesNotExist('card_id');
    }
    const createTransition = await this.transactionRepository.create({
      ammout,
      card_id,
    });
    return createTransition;
  }

  /**
   *findById
   * @param { string } transaction_id
   * @returns { Promise<TTransaction | null> } retun a transaction | null
   */

  async findById(transaction_id: string) {
    const transition =
      await this.transactionRepository.findTransactionById(transaction_id);
    if (!transaction_id) {
      throw new MissingParamError('transaction_id');
    }
    if (!transition) {
      throw new ParamDoesNotExist('transaction_id');
    }
    return transition;
  }

  /**
   *listTransations
   * @param { string } transaction_id
   * @returns { Promise<TTransaction[] | null>} returns list of transactions | null
   */
  async listTransations(transaction_id: string) {
    const listOfTransition =
      await this.transactionRepository.listTransactions(transaction_id);

    return listOfTransition;
  }
}
