# frontend — SPA MSIFORCE

SPA do site MSIFORCE (empresa de infraestrutura elétrica, automação, segurança eletrônica e TI).

- **Stack:** React 19 + Vite 8 + Framer Motion + react-router-dom 7. `sharp` e `playwright` já em devDependencies.
- **Comandos:** `npm run dev` (Vite, porta padrão 5173) · `npm run build` (gera `dist/`) · `npm run preview` · `npm run lint`.
- **Layout:** `src/pages/`, `src/components/` (Navbar, Footer, FormDiagnostico, SobreEmpresa, Parceiros...), `src/data/`, `src/hooks/`, `src/assets/`. Imagens reais em `public/`.

## Iteração visual (evita inflar o contexto)

Para conferir mudanças de layout, use o script versionado **`tools/shot.mjs`** em vez de recriar um heredoc Playwright a cada vez:

```bash
npm run dev &                       # sobe o Vite
node tools/shot.mjs / home           # salva tools/shots/home.png
node tools/shot.mjs /servicos serv   # outra rota
```

- **Não releia o mesmo PNG** repetidamente no contexto — cada leitura de imagem pesa muito. Capture, olhe uma vez, ajuste.
- Comite por fase; não acumule horas de trabalho visual sem salvar.

Responda em **pt-BR**.
