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
exports.removeCard = exports.getCardById = exports.getAllCards = exports.createCard = void 0;
const repository = __importStar(require("../repositories/cardRepository"));
const cryptService_1 = require("./cryptService");
function createCard(card) {
    return __awaiter(this, void 0, void 0, function* () {
        const existCard = yield repository.findByTitleAndUserId(card.title, card.userId);
        if (existCard) {
            throw {
                response: {
                    status: 409,
                    message: "Title already in use!"
                }
            };
        }
        const hashPassword = (0, cryptService_1.encrypt)(card.password);
        const hashCvc = (0, cryptService_1.encrypt)(card.securityCode);
        yield repository.insert(Object.assign(Object.assign({}, card), { password: hashPassword, securityCode: hashCvc }));
    });
}
exports.createCard = createCard;
function getAllCards(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield repository.findAllCardOfUser(userId);
        const decryptedCard = cards.map(item => {
            const decryptPassword = (0, cryptService_1.decrypt)(item.password);
            const decryptCvc = (0, cryptService_1.decrypt)(item.securityCode);
            return Object.assign(Object.assign({}, item), { password: decryptPassword, securityCode: decryptCvc });
        });
        return decryptedCard;
    });
}
exports.getAllCards = getAllCards;
function getCardById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield repository.findById(id);
        if (!card) {
            throw {
                response: {
                    status: 404,
                    message: "Card not found!"
                }
            };
        }
        if (card.userId !== userId) {
            throw {
                response: {
                    status: 401,
                    message: "This Card is not yours!"
                }
            };
        }
        const decryptedPassword = (0, cryptService_1.decrypt)(card.password);
        const decryptedCvc = (0, cryptService_1.decrypt)(card.securityCode);
        return Object.assign(Object.assign({}, card), { password: decryptedPassword, securityCode: decryptedCvc });
    });
}
exports.getCardById = getCardById;
function removeCard(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const Card = yield repository.findById(id);
        if (!Card) {
            throw {
                response: {
                    status: 404,
                    message: "Card not found!"
                }
            };
        }
        if (Card.userId !== userId) {
            throw {
                response: {
                    status: 401,
                    message: "This Card is not yours!"
                }
            };
        }
        yield repository.remove(id);
    });
}
exports.removeCard = removeCard;
