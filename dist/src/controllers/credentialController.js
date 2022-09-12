"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCredential = exports.getCredentialById = exports.getAllCredentials = exports.createCredential = void 0;
const service = __importStar(require("../services/credentialService"));
function createCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.params.userId);
            const credential = req.body;
            yield service.createCredential(Object.assign(Object.assign({}, credential), { userId }));
            res.status(201).send("Credential created with success!");
        }
        catch (error) {
            res.status(error.response.status).send(error.response.message);
        }
    });
}
exports.createCredential = createCredential;
function getAllCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.params.userId);
            const credentials = yield service.getAllCredentials(userId);
            res.status(200).send(credentials);
        }
        catch (error) {
            res.status(error.response.status).send(error.response.message);
        }
    });
}
exports.getAllCredentials = getAllCredentials;
function getCredentialById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.params.userId);
            const credencial = yield service.getCredentialById(id, userId);
            res.status(200).send(credencial);
        }
        catch (error) {
            res.status(error.response.status).send(error.response.message);
        }
    });
}
exports.getCredentialById = getCredentialById;
function removeCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.params.userId);
            yield service.removeCredential(id, userId);
            res.status(200).send("Credential removed with success!!");
        }
        catch (error) {
            res.status(error.response.status).send(error.response.message);
        }
    });
}
exports.removeCredential = removeCredential;
