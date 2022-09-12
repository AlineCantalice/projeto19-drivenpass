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
exports.removeSafeNote = exports.getSafeNoteById = exports.getAllSafeNotes = exports.createSafeNote = void 0;
const repository = __importStar(require("../repositories/safeNoteRepository"));
function createSafeNote(safeNote) {
    return __awaiter(this, void 0, void 0, function* () {
        const existSafeNote = yield repository.findByTitleAndUserId(safeNote.title, safeNote.userId);
        if (existSafeNote) {
            throw {
                response: {
                    status: 409,
                    message: "Title already in use!"
                }
            };
        }
        yield repository.insert(safeNote);
    });
}
exports.createSafeNote = createSafeNote;
function getAllSafeNotes(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield repository.findAllSafeNoteOfUser(userId);
    });
}
exports.getAllSafeNotes = getAllSafeNotes;
function getSafeNoteById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const safeNote = yield repository.findById(id);
        if (!safeNote) {
            throw {
                response: {
                    status: 404,
                    message: "Note not found!"
                }
            };
        }
        if (safeNote.userId !== userId) {
            throw {
                response: {
                    status: 401,
                    message: "This note is not yours!"
                }
            };
        }
        return safeNote;
    });
}
exports.getSafeNoteById = getSafeNoteById;
function removeSafeNote(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const safeNote = yield repository.findById(id);
        if (!safeNote) {
            throw {
                response: {
                    status: 404,
                    message: "Note not found!"
                }
            };
        }
        if (safeNote.userId !== userId) {
            throw {
                response: {
                    status: 401,
                    message: "This note is not yours!"
                }
            };
        }
        yield repository.remove(id);
    });
}
exports.removeSafeNote = removeSafeNote;
