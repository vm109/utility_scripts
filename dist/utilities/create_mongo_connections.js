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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = void 0;
var mongodb_1 = require("mongodb");
var MongoConnection = /** @class */ (function () {
    function MongoConnection(mongo_string, is_srv) {
        this.mongo_db = null;
        if (is_srv) {
            this.mongo_string = "mongodb+srv://".concat(mongo_string);
        }
        else {
            this.mongo_string = "mongodb://".concat(mongo_string);
        }
    }
    MongoConnection.prototype.createMongoClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.mongo_client) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(this.mongo_string)];
                    case 1:
                        _a.mongo_client = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.mongo_client];
                }
            });
        });
    };
    MongoConnection.prototype.getMongoConnectionDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.mongo_db) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createMongoClient()];
                    case 1:
                        client = _a.sent();
                        this.mongo_db = client.db();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.mongo_db];
                }
            });
        });
    };
    MongoConnection.prototype.closeDbConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.mongo_client) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mongo_client.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MongoConnection.prototype.getAllCollectionNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collection_names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection_names = [];
                        return [4 /*yield*/, this.getMongoConnectionDb()];
                    case 1: return [4 /*yield*/, (_a.sent()).collections()];
                    case 2:
                        (_a.sent()).map(function (collection) {
                            collection_names.push(collection.collectionName);
                        });
                        return [2 /*return*/, collection_names];
                }
            });
        });
    };
    MongoConnection.prototype.getAllCollections = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMongoConnectionDb()];
                    case 1: return [4 /*yield*/, (_a.sent()).collections()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MongoConnection;
}());
exports.MongoConnection = MongoConnection;
