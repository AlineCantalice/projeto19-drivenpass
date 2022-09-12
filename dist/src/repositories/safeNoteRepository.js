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
exports.remove = exports.findByTitleAndUserId = exports.findAllSafeNoteOfUser = exports.findById = exports.insert = void 0;
const postgres_1 = __importDefault(require("../database/postgres"));
function insert(safeNote) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.safeNotes.create({ data: safeNote });
    });
}
exports.insert = insert;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield postgres_1.default.safeNotes.findUnique({ where: { id } });
    });
}
exports.findById = findById;
function findAllSafeNoteOfUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield postgres_1.default.safeNotes.findMany({ where: { userId } });
    });
}
exports.findAllSafeNoteOfUser = findAllSafeNoteOfUser;
function findByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield postgres_1.default.safeNotes.findUnique({ where: { userId_title: { userId, title } } });
    });
}
exports.findByTitleAndUserId = findByTitleAndUserId;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.safeNotes.delete({ where: { id } });
    });
}
exports.remove = remove;
