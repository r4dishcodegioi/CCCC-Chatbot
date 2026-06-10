const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || '';

export async function registerParticipant(data: {
  fullName: string;
  studentId: string;
  email: string;
}) {
  const res = await fetch(`${API_BASE}/participants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  return res.json();
}

export async function getQuestions() {
  const res = await fetch(`${API_BASE}/questions`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function submitQuiz(participantId: string, answers: { questionId: number; option: string }[]) {
  const res = await fetch(`${API_BASE}/quiz/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ participantId, answers }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Quiz submission failed');
  }
  return res.json();
}
