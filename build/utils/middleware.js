"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (req, _res, next) => {
    console.log("Method: ", req.method);
    console.log("Path: ", req.path);
    console.log("Body: ", req.body);
    console.log("------");
    next();
};
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: "Unknown endpoint" });
};
exports.default = { requestLogger, unknownEndpoint };
