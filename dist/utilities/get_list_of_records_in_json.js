"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadJsonFile = void 0;
var fs_1 = __importDefault(require("fs"));
var stream_json_1 = require("stream-json");
var streamArray_1 = require("stream-json/streamers/streamArray");
var ReadJsonFile = /** @class */ (function () {
    function ReadJsonFile() {
    }
    ReadJsonFile.prototype.getJsonEntriesAsArrayPipeline = function (full_file_path) {
        var pipeline = fs_1.default.createReadStream(full_file_path, 'utf-8')
            .pipe((0, stream_json_1.parser)())
            .pipe((0, streamArray_1.streamArray)());
        return pipeline;
    };
    return ReadJsonFile;
}());
exports.ReadJsonFile = ReadJsonFile;
