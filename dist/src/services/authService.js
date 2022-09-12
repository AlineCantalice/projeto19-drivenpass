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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = __importStar(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService = __importStar(require("./userService"));
const index_1 = __importDefault(require("../config/index"));
function signUp(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDB = yield userService.findUserByEmail(user.email);
        if (userDB) {
            throw {
                response: {
                    status: 409,
                    message: "Email already in use!"
                }
            };
        }
        const hashPassword = bcrypt_1.default.hashSync(user.password, 10);
        yield userRepository.insert({ email: user.email, password: hashPassword });
    });
}
exports.signUp = signUp;
function signIn(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDB = yield userService.findUserByEmail(user.email);
        if (!userDB) {
            throw {
                response: {
                    status: 401,
                    message: "You must create a new profile"
                }
            };
        }
        if (!bcrypt_1.default.compareSync(user.password, userDB.password)) {
            throw {
                response: {
                    status: 401,
                    message: "Email or password incorrect!"
                }
            };
        }
        const token = yield generateToken(userDB);
        return token;
    });
}
exports.signIn = signIn;
function generateToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            id: user.id,
            email: user.email,
        };
        const jwtConfig = {
            expiresIn: index_1.default.expires
        };
        const token = jsonwebtoken_1.default.sign(payload, index_1.default.secret, jwtConfig);
        return token;
    });
}
exports.generateToken = generateToken;
