// Cliente HTTP mínimo do painel administrativo (Kanban). Guarda o token em
// localStorage — sessão persiste entre abas e recarregamentos, até logout ou o JWT
// expirar (8h, ver AuthController.js do bot). Para testar contra um bot local, crie
// um `.env.local` com `VITE_API_BASE=http://localhost:8080`.
const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.msiforce.com.br';
const CHAVE_TOKEN = 'msi_admin_token';

export function getToken() {
  return localStorage.getItem(CHAVE_TOKEN);
}

export function setToken(token) {
  localStorage.setItem(CHAVE_TOKEN, token);
}

export function logout() {
  localStorage.removeItem(CHAVE_TOKEN);
}

export async function login(email, senha) {
  const resp = await fetch(`${API_BASE}/api/auth/login-tenant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error || 'Falha no login.');
  }
  setToken(data.token);
  return data;
}

/** Fetch autenticado para a API do painel. Lança erro com a mensagem do backend. */
export async function apiFetch(path, options = {}) {
  const resp = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error || 'Erro na requisição.');
  }
  return data;
}
