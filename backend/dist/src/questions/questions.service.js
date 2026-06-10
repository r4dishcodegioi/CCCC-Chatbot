"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const questions_data_1 = require("./data/questions.data");
let QuestionsService = class QuestionsService {
    getAll() {
        return questions_data_1.QUESTIONS.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options.map(o => ({
                label: o.label,
                text: o.text,
            })),
        }));
    }
    getFullQuestions() {
        return questions_data_1.QUESTIONS;
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)()
], QuestionsService);
//# sourceMappingURL=questions.service.js.map