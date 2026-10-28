# Calculadora de Misturas - VJET

App offline (HTML/JS) empacotado como APK com Capacitor. Criado e desenvolvido por Lauro Vieira.

## Alterar receitas / frascos / nomes
Edite só `www/calc.js` (`FRASCOS`, `NOMES`, `RECEITAS`, `TINTA_QB`). `npm test` valida a lógica.

## Gerar o APK (sem instalar nada no PC)
1. Crie um repositório PRIVADO no GitHub e envie o CONTEÚDO desta pasta (incluindo `.github`) na branch `main`.
2. Aba **Actions → Gerar APK → Run workflow** (também roda sozinho a cada envio).
3. Em ~5 min, baixe o artefato **calculadora-misturas-vjet-apk** e extraia o `app-debug.apk`.
4. Instale nos celulares (permitir "fontes desconhecidas").
