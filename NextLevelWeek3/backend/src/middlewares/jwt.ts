import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')

export default (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = <string>req.headers.authorization

		if (!authHeader) return res.status(401).send()

		let jwtPayload;

		const parts = authHeader.split(' ')
        
		if(parts.length !== 2) return res.status(401).send()

		const [ scheme, token ] = parts

		if(!/^Bearer$/i.test(scheme)) return res.status(401).send()

		try {
			jwtPayload = <any>jwt.verify(token, process.env.JWT_KEY);
			res.locals.jwtPayload = jwtPayload;
		} catch (error) {
			res.status(401).send();
			return;
		}
		const { userId, username } = jwtPayload;
		const newToken = jwt.sign({ userId, username }, process.env.JWT_KEY, {
			expiresIn: "24h"
		});
		res.setHeader("token", newToken);
		next();
	} catch (error) {
		return res.status(401).send()
	}
}