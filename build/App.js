"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anecdotes_1 = __importDefault(require("./controllers/anecdotes"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static("dist"));
app.use(middleware_1.default.requestLogger);
app.use(express_1.default.json());
app.use("/api/anecdotes", anecdotes_1.default);
app.use(middleware_1.default.unknownEndpoint);
exports.default = app;
