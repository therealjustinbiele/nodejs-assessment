import { Request, Response } from "express";

export function errorHandler(err: { status: number, message: Error }, req: Request, res: Response) {
  res.status(err.status || 500).send({
    message: err.message || 'Internal Server Error',
  });
}