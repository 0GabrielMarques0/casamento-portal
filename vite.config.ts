import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin para simular API em desenvolvimento
function devApiPlugin(): Plugin {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/rsvp', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              console.log('\n📬 Nova confirmação de presença (DEV):');
              console.log('-------------------------------------------');
              console.log(`Nome: ${data.nomeCompleto}`);
              console.log(`Irá ao evento: ${data.iraAoEvento === 'sim' ? 'Sim' : 'Não'}`);
              if (data.iraAoEvento === 'sim') {
                console.log(`Quantidade de adultos: ${data.quantidadeAdultos}`);
                if (data.nomeAcompanhante) {
                  console.log(`Acompanhante: ${data.nomeAcompanhante}`);
                }
                console.log(`Quantidade de crianças: ${data.quantidadeCriancas}`);
              }
              if (data.mensagem) {
                console.log(`Mensagem: ${data.mensagem}`);
              }
              console.log('-------------------------------------------\n');
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: true, 
                message: 'Confirmação recebida com sucesso!',
                data: { nome: data.nomeCompleto, confirmado: data.iraAoEvento === 'sim' }
              }));
            } catch (e) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Dados inválidos' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Método não permitido' }));
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
})
