"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTIONS = void 0;
exports.QUESTIONS = [
    {
        id: 1,
        text: 'Người khác thường nhớ về bạn bởi:',
        category: 'tea',
        options: [
            { label: 'A', text: 'Nguồn năng lượng tích cực và tự nhiên', note: 'Trà xanh' },
            { label: 'B', text: 'Sự tinh tế và nhẹ nhàng', note: 'Trà trắng' },
            { label: 'C', text: 'Sự trưởng thành và đáng tin', note: 'Trà đen' },
            { label: 'D', text: 'Chất riêng rất khó trộn lẫn', note: 'Trà olong' },
        ],
    },
    {
        id: 2,
        text: 'Một cuối tuần lý tưởng với bạn là:',
        category: 'tea',
        options: [
            { label: 'A', text: 'Đi đâu đó mới hoặc trải nghiệm điều thú vị', note: 'Trà xanh' },
            { label: 'B', text: 'Ở một nơi yên tĩnh để nghỉ ngơi', note: 'Trà trắng' },
            { label: 'C', text: 'Một quán quen cùng những cuộc trò chuyện sâu', note: 'Trà đen' },
            { label: 'D', text: 'Workshop, triển lãm hoặc nơi nhiều cảm hứng', note: 'Trà olong' },
        ],
    },
    {
        id: 3,
        text: 'Bạn thường đối diện cảm xúc bằng cách:',
        category: 'tea',
        options: [
            { label: 'A', text: 'Ra ngoài để "refresh" bản thân', note: 'Trà xanh' },
            { label: 'B', text: 'Giữ cho mình một khoảng lặng', note: 'Trà trắng' },
            { label: 'C', text: 'Suy nghĩ thật kỹ trước khi chia sẻ', note: 'Trà đen' },
            { label: 'D', text: 'Viết, nghe nhạc hoặc làm điều sáng tạo', note: 'Trà olong' },
        ],
    },
    {
        id: 4,
        text: 'Chọn một không gian khiến bạn thấy "đúng là mình" nhất:',
        category: 'tea',
        options: [
            { label: 'A', text: 'Khu vườn đầy nắng và cây xanh', note: 'Trà xanh' },
            { label: 'B', text: 'Căn phòng trắng với rèm cửa bay nhẹ', note: 'Trà trắng' },
            { label: 'C', text: 'Quán café ánh đèn vàng ngày mưa', note: 'Trà đen' },
            { label: 'D', text: 'Studio nghệ thuật nhiều chất liệu và âm nhạc', note: 'Trà olong' },
        ],
    },
    {
        id: 5,
        text: 'Bạn muốn người khác cảm thấy gì khi ở cạnh mình?',
        category: 'tea',
        options: [
            { label: 'A', text: 'Dễ chịu và tràn đầy năng lượng', note: 'Trà xanh' },
            { label: 'B', text: 'Bình yên và được lắng nghe', note: 'Trà trắng' },
            { label: 'C', text: 'An tâm và tin tưởng', note: 'Trà đen' },
            { label: 'D', text: 'Bị thu hút bởi cá tính riêng', note: 'Trà olong' },
        ],
    },
    {
        id: 6,
        text: 'Bạn thường bị thu hút bởi kiểu mùi hương nào?',
        category: 'tea',
        options: [
            { label: 'A', text: 'Thanh mát, clean, tươi mới', note: 'Trà xanh' },
            { label: 'B', text: 'Nhẹ nhàng và mềm mại', note: 'Trà trắng' },
            { label: 'C', text: 'Trầm ấm và có chiều sâu', note: 'Trà đen' },
            { label: 'D', text: 'Nghệ thuật và khác biệt', note: 'Trà olong' },
        ],
    },
    {
        id: 7,
        text: 'Khi cần chữa lành, bạn thường tìm đến:',
        category: 'base',
        options: [
            { label: 'A', text: 'Một nơi yên bình để nghỉ ngơi', note: 'Hoa sen hồng' },
            { label: 'B', text: 'Người hoặc không gian khiến mình thấy an toàn', note: 'Gỗ hồng' },
            { label: 'C', text: 'Âm nhạc, cảm xúc hoặc sự đồng điệu', note: 'Hoa nhài' },
            { label: 'D', text: 'Sự tĩnh lặng để cân bằng lại bản thân', note: 'Đàn hương' },
        ],
    },
    {
        id: 8,
        text: 'Trong các kiểu kết nối dưới đây, bạn trân trọng điều gì nhất?',
        category: 'base',
        options: [
            { label: 'A', text: 'Sự dịu dàng và thấu hiểu', note: 'Hoa sen hồng' },
            { label: 'B', text: 'Cảm giác ổn định và đáng tin', note: 'Gỗ hồng' },
            { label: 'C', text: 'Sự đồng điệu cảm xúc mãnh liệt', note: 'Hoa nhài' },
            { label: 'D', text: 'Sự trưởng thành và bình yên', note: 'Đàn hương' },
        ],
    },
    {
        id: 9,
        text: 'Nếu cảm xúc của bạn là một chất liệu, đó sẽ là:',
        category: 'base',
        options: [
            { label: 'A', text: 'Nước', note: 'Hoa sen hồng' },
            { label: 'B', text: 'Gỗ', note: 'Gỗ hồng' },
            { label: 'C', text: 'Hoa', note: 'Hoa nhài' },
            { label: 'D', text: 'Khói', note: 'Đàn hương' },
        ],
    },
    {
        id: 10,
        text: 'Bạn muốn "dấu ấn" của mình mang cảm giác:',
        category: 'base',
        options: [
            { label: 'A', text: 'Dịu dàng và tinh khôi', note: 'Hoa sen hồng' },
            { label: 'B', text: 'Ấm áp và đáng tin', note: 'Gỗ hồng' },
            { label: 'C', text: 'Cuốn hút và giàu cảm xúc', note: 'Hoa nhài' },
            { label: 'D', text: 'Trầm tĩnh và trưởng thành', note: 'Đàn hương' },
        ],
    },
];
//# sourceMappingURL=questions.data.js.map