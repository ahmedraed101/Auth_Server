import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const ErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            status: "error",
            errors: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message,
            }))
        })
    }

    if (err instanceof Error) {
        return res.status(500).json({
            status: 'error',
            message: process.env.NODE_ENV === 'production'
            ? "Internal Server Error"
            : err.message
        })
    }

    res.status(500).json({
        status: 'error',
        message: "Internal Server Error",
    })
}