# AI Scent Personality Chatbot — Chi Chi Chành Chành 2026

Chào mừng bạn đến với dự án AI Scent Personality Chatbot — một chatbot AI dạng booth game dành cho sự kiện "Chi Chi Chành Chành 2026: Lụa và Trà". Dự án cho phép người dùng tham gia trả lời 10 câu hỏi tính cách để nhận lại một "Scent Identity" (Dấu ấn mùi hương) cá nhân hóa cùng với công thức tinh dầu dành riêng cho họ.

## Tech Stack

Dự án được xây dựng với kiến trúc Full-stack hiện đại:

- **Frontend:** NextJS 14 (App Router), TypeScript, TailwindCSS v3, Zustand (State Management), React Hook Form & Zod (Validation).
- **Backend:** NestJS, TypeScript, Prisma ORM, SQLite, class-validator.
- **Vibe Design:** Elegant, Soft, Tea-inspired (Cream, Sage Green, Tea Brown), Glassmorphism, Smooth Animations.

## Cấu trúc thư mục

```text
CCCC_Chatbot/
├── frontend/             # NextJS Frontend App
│   ├── src/
│   │   ├── app/          # Pages (/, /register, /quiz, /result)
│   │   ├── components/   # UI Components (ChatBubble, ResultCard, ...)
│   │   └── lib/          # Types, Zustand Store, API Client
│   └── tailwind.config.ts
├── backend/              # NestJS Backend API
│   ├── src/
│   │   ├── participants/ # Quản lý người chơi
│   │   ├── questions/    # API câu hỏi
│   │   ├── quiz/         # Core logic tính điểm và mapping Scent Identity
│   │   ├── results/      # API kết quả
│   │   └── prisma/       # Prisma Service
│   ├── prisma/
│   │   ├── schema.prisma # Database Models (Participant, Result)
│   │   └── seed.ts       # Script seed data
```

## Cách cài đặt và chạy dự án

### 1. Cài đặt Backend (NestJS + Prisma)

Mở terminal, di chuyển vào thư mục `backend` và chạy các lệnh sau:

```bash
cd backend
npm install
```

**Migrate Database và Seed Data:**

Chúng ta sử dụng SQLite cho môi trường local. Chạy lệnh sau để tạo database và chạy script seed:

```bash
npx prisma migrate dev --name init
npm run seed
```
*(Ghi chú: Câu hỏi và bảng mapping đã được hardcode thẳng vào code để đảm bảo logic chạy mượt mà không phụ thuộc DB lookup quá nhiều, script seed chủ yếu dùng để verify kết nối db).*

**Chạy Backend (Development):**

```bash
npm run start:dev
```
Backend sẽ chạy ở `http://localhost:3001`.

### 2. Cài đặt Frontend (NextJS)

Mở một terminal khác, di chuyển vào thư mục `frontend`:

```bash
cd frontend
npm install
```

**Chạy Frontend (Development):**

```bash
npm run dev
```
Frontend sẽ chạy ở `http://localhost:3000`.

## API Endpoints (Backend)

- `POST /participants`: Tạo người chơi mới (yêu cầu `fullName`, `studentId`, `email`).
- `GET /questions`: Trả về danh sách 10 câu hỏi trắc nghiệm.
- `POST /quiz/submit`: Nộp mảng câu trả lời và nhận về kết quả (Scent Identity, Formula, Personality Description). Dữ liệu này sẽ được lưu vào SQLite.
- `GET /results/:participantId`: Lấy lại kết quả của một người chơi đã submit.

## Quyết định kỹ thuật & Lưu ý (Decisions Made)

- **Database:** Sử dụng `SQLite` để dễ dàng phát triển local mà không cần setup PostgreSQL/Docker phức tạp.
- **Scoring Engine:** Logic tính điểm và công thức nhỏ giọt (Tea Drops & Base Drops) được đóng gói toàn bộ trong `QuizService` ở backend. Bảng Mapping (24 kết quả) cũng được handle phía backend để bảo mật logic.
- **Frontend State:** Sử dụng `Zustand` vì sự nhẹ nhàng và dễ tích hợp thay vì Redux hay Context API. State sẽ lưu ID người dùng và luồng các câu hỏi đã trả lời.
- **Responsive:** UI đã được tối ưu hiển thị tốt nhất trên thiết bị di động (Mobile-first), vì use-case chính là khách tham quan chơi tại booth event.
- **Tự động hóa next step:** Trong bài Quiz, sau khi click chọn đáp án, hệ thống sẽ tự động chuyển sang câu tiếp theo với animation typing mượt mà để tạo cảm giác giống hệt một Chatbot AI thực sự.

Chúc sự kiện Chi Chi Chành Chành 2026 thành công rực rỡ! 🍵🌸
