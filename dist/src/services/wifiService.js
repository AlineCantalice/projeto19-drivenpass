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
exports.removeWifi = exports.getWifiById = exports.getAllWifi = exports.createWifi = void 0;
const repository = __importStar(require("../repositories/wifiRepository"));
const cryptService_1 = require("./cryptService");
function createWifi(wifi) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = (0, cryptService_1.encrypt)(wifi.password);
        yield repository.insert(Object.assign(Object.assign({}, wifi), { password: hashPassword }));
    });
}
exports.createWifi = createWifi;
function getAllWifi(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield repository.findAllWifiOfUser(userId);
        const decryptedWifi = wifi.map(item => {
            const decryptPassword = (0, cryptService_1.decrypt)(item.password);
            return Object.assign(Object.assign({}, item), { password: decryptPassword });
        });
        return decryptedWifi;
    });
}
exports.getAllWifi = getAllWifi;
function getWifiById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield repository.findById(id);
        if (!wifi) {
            throw {
                response: {
                    status: 404,
                    message: "Wifi not found!"
                }
            };
        }
        if (wifi.userId !== userId) {
            throw {
                response: {
                    status: 401,
                    message: "This Wifi is not yours!"
                }
            };
        }
        const decryptedPassword = (0, cryptService_1.decrypt)(wifi.password);
        return Object.assign(Object.assign({}, wifi), { password: decryptedPassword });
    });
}
exports.getWifiById = getWifiById;
function removeWifi(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield repository.findById(id);
        if (!wifi) {
            throw {
                response: {
                    status: 404,
                    message: "Wifi not found!"
                }
            };
        }
        if (wifi.userId !== userId) {
            throw {
                response: {
                    status: 401,
                    message: "This Wifi is not yours!"
                }
            };
        }
        yield repository.remove(id);
    });
}
exports.removeWifi = removeWifi;
