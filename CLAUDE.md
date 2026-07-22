# site-msiforce — site institucional (estático)

Página única em **HTML/CSS estático**, publicada no **Cloudflare Pages** no domínio `msiforce.com.br` (arquivo `CNAME`). Migrado do Netlify (sem créditos lá).

- Fonte principal: `index.html`. Arquivos `*_bkp.html` / `*_V2.html` são backups/versões — não são servidos.
- Imagens são **WebP** (otimizadas de PNG/JPG com `cwebp`/`sharp`). Ao adicionar imagem, converta para WebP e mantenha o HTML enxuto (o `index.html` já foi de ~717KB para ~41KB; não regrida).
- Deploy: commit + push publica via Cloudflare Pages. DNS/domínio no painel Cloudflare.
- O SPA novo fica em `frontend/` (ver `frontend/CLAUDE.md`) — não confundir com este site estático.
- Responda em **pt-BR**.
