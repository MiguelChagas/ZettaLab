import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Servidor Express para SSR (Server-Side Rendering)
 * Configura servidor Node.js com Express para servir a aplicação Angular
 */

// Resolve caminhos das pastas de distribuição
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
// AngularNodeAppEngine: engine do Angular para renderizar aplicação no servidor
const angularApp = new AngularNodeAppEngine();

// Serve arquivos estáticos (JS, CSS, imagens) com cache de 1 ano
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Rota catch-all: todas as requisições são processadas pelo Angular SSR
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      // Converte resposta do Angular para resposta do Node.js
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

// Inicia servidor apenas se este arquivo for o módulo principal
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Exporta handler de requisições para integração com outros servidores
export const reqHandler = createNodeRequestHandler(app);
