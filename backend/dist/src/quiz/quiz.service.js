"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const questions_service_1 = require("../questions/questions.service");
const scent_mapping_data_1 = require("./data/scent-mapping.data");
const TEA_PRIORITY = ['Trà xanh', 'Trà trắng', 'Trà đen', 'Trà olong'];
const BASE_PRIORITY = ['Hoa sen hồng', 'Gỗ hồng', 'Hoa nhài', 'Đàn hương'];
let QuizService = class QuizService {
    constructor(prisma, questionsService) {
        this.prisma = prisma;
        this.questionsService = questionsService;
    }
    async submit(dto) {
        const questions = this.questionsService.getFullQuestions();
        const teaScores = {
            'Trà xanh': 0,
            'Trà trắng': 0,
            'Trà đen': 0,
            'Trà olong': 0,
        };
        const baseScores = {
            'Hoa sen hồng': 0,
            'Gỗ hồng': 0,
            'Hoa nhài': 0,
            'Đàn hương': 0,
        };
        for (const answer of dto.answers) {
            const question = questions.find(q => q.id === answer.questionId);
            if (!question)
                throw new common_1.BadRequestException(`Invalid questionId: ${answer.questionId}`);
            const option = question.options.find(o => o.label === answer.option);
            if (!option)
                throw new common_1.BadRequestException(`Invalid option: ${answer.option}`);
            if (question.category === 'tea') {
                teaScores[option.note] += 2;
            }
            else {
                baseScores[option.note] += 2;
            }
        }
        const sortedTeas = TEA_PRIORITY
            .map(name => ({ name, score: teaScores[name] }))
            .sort((a, b) => b.score - a.score || TEA_PRIORITY.indexOf(a.name) - TEA_PRIORITY.indexOf(b.name));
        const tea1 = sortedTeas[0];
        const tea2 = sortedTeas[1];
        const sortedBases = BASE_PRIORITY
            .map(name => ({ name, score: baseScores[name] }))
            .sort((a, b) => b.score - a.score || BASE_PRIORITY.indexOf(a.name) - BASE_PRIORITY.indexOf(b.name));
        const base1 = sortedBases[0];
        const base2 = sortedBases[1];
        const teaDiff = tea1.score - tea2.score;
        const tea1Drops = teaDiff >= 3 ? 3 : 2;
        const tea2Drops = 2;
        const baseDiff = base1.score - base2.score;
        const baseDrops = baseDiff >= 3 ? 2 : 1;
        const normalizedTeas = [tea1.name, tea2.name].sort();
        const mapping = scent_mapping_data_1.SCENT_MAPPINGS.find(m => m.teas[0] === normalizedTeas[0] && m.teas[1] === normalizedTeas[1] && m.base === base1.name);
        if (!mapping) {
            throw new common_1.BadRequestException('Could not find scent mapping for this combination');
        }
        const formula = [
            { name: tea1.name, drops: tea1Drops },
            { name: tea2.name, drops: tea2Drops },
            { name: base1.name, drops: baseDrops },
        ];
        await this.prisma.result.create({
            data: {
                participantId: dto.participantId,
                answersJson: JSON.stringify(dto.answers),
                teaScoresJson: JSON.stringify(teaScores),
                baseScoresJson: JSON.stringify(baseScores),
                scentIdentity: mapping.scentIdentity,
                personalityDescription: mapping.personalityDescription,
                scentDescription: mapping.scentDescription,
                formulaJson: JSON.stringify(formula),
            },
        });
        return {
            scentIdentity: mapping.scentIdentity,
            personalityDescription: mapping.personalityDescription,
            formula,
            scentDescription: mapping.scentDescription,
            teaScores,
            baseScores,
        };
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        questions_service_1.QuestionsService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map