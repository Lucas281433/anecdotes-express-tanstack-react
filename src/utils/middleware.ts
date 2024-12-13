import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
    console.log("Method: ", req.method);
    console.log("Path: ", req.path);
    console.log("Body: ", req.body);
    console.log("------");
    next();
};

const unknownEndpoint = (_req: Request, res: Response): void => {
    res.status(404).send({ error: "Unknown endpoint" });
};

export default { requestLogger, unknownEndpoint };