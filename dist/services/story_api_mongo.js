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
exports.StoryAPiMongo = void 0;
var create_mongo_connections_1 = require("../utilities/create_mongo_connections");
var StoryAPiMongo = /** @class */ (function () {
    function StoryAPiMongo(mongo_string, is_srv) {
        this.mongo_connection = new create_mongo_connections_1.MongoConnection(mongo_string, is_srv);
    }
    StoryAPiMongo.prototype.printAllCollectionNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collectionsNames, _i, collectionsNames_1, collecionName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mongo_connection.getAllCollectionNames()];
                    case 1:
                        collectionsNames = _a.sent();
                        for (_i = 0, collectionsNames_1 = collectionsNames; _i < collectionsNames_1.length; _i++) {
                            collecionName = collectionsNames_1[_i];
                            console.log(collecionName);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StoryAPiMongo.prototype.ifCollectionHasBranchOtherThanDefault = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aggregateion_query, _i, _a, collection, document_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        aggregateion_query = [{
                                $match: {
                                    $expr: {
                                        $gt: [{ $size: { $objectToArray: "$branches" } }, 1]
                                    }
                                }
                            },
                            {
                                $limit: 1
                            }
                        ];
                        _i = 0;
                        return [4 /*yield*/, this.mongo_connection.getAllCollections()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        collection = _a[_i];
                        if (!collection.collectionName.includes('_histories')) return [3 /*break*/, 4];
                        return [4 /*yield*/, collection.aggregate(aggregateion_query).next()];
                    case 3:
                        document_1 = _b.sent();
                        if (document_1) {
                            console.log(collection.collectionName);
                            console.log(document_1.branches);
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return StoryAPiMongo;
}());
exports.StoryAPiMongo = StoryAPiMongo;
