"use strict";
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
exports.remove = exports.findAllWifiOfUser = exports.findById = exports.insert = void 0;
const postgres_1 = __importDefault(require("../database/postgres"));
function insert(wifi) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.wifi.create({ data: wifi });
    });
}
exports.insert = insert;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield postgres_1.default.wifi.findUnique({ where: { id } });
    });
}
exports.findById = findById;
function findAllWifiOfUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield postgres_1.default.wifi.findMany({ where: { userId } });
    });
}
exports.findAllWifiOfUser = findAllWifiOfUser;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.wifi.delete({ where: { id } });
    });
}
exports.remove = remove;
