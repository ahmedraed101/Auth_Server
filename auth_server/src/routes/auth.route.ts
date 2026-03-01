import { Response, Request, Router } from "express";
import { registerSchema } from "./../schema/register.schema.ts"
import { validate } from "../middleware/validator.middleware.ts";
import bcrypt from "bcrypt";

const registerHandler = async (req: Request, res: Response) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    console.log(passwordHash);
    const i = await bcrypt.compare(req.body.password, passwordHash)
    console.log(i);
    res.status(201).send("hello")
}

const router = Router();

router.post("/register", validate(registerSchema), registerHandler);

export default router;