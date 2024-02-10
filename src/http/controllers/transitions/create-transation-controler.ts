import { Request, Response } from 'express';
import { CreateTransationUseCase } from '../../../use-cases/transation/create-transation-use-case';
import { z, ZodError  } from 'zod';

export const createTransationController = async(req: Request, res :Response) => {

  const createTransationUseCase = new CreateTransationUseCase();


  const transationSchema = z.object({
    ammout: z.string(),
    card_id: z.string().uuid()
  });

  try {
    const { ammout, card_id } = transationSchema.parse(req.body);

    const transation = await createTransationUseCase.create( {
      ammout,
      card_id
    });

    return res.status(200).json({
      msg: 'transation created successfully',
      transation
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        msg: 'error validating data',
        error
      });
    }
  }
};
