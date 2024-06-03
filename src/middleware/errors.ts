import { Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).send({
    message: err.message || 'Internal Server Error',
  });
}