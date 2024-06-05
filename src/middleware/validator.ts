import { Request, Response, NextFunction } from 'express'
import joi from 'joi'

const addressSchema = joi.object({
	street: joi.string(),
	city: joi.string(),
	state: joi.string(),
	zipCode: joi.string()
});

const userSchema = joi.object({
	name: joi.string(),
	email: joi.string().email(),
	address: addressSchema
});

export function validator(req: Request, res: Response, next: NextFunction) {
	const { error } = userSchema.validate(req.body)
	if (error) {
		return res.status(400).send({
			message: 'Validation error',
			details: error.details
		});
	}
	next()
}