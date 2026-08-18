# Configuração do Formulário de Confirmação de Presença (RSVP)

## ✅ O que foi criado

1. **Página de RSVP** (`/confirmar-presenca`) - Formulário com os mesmos campos do Google Forms:
   - Nome Completo (obrigatório)
   - Você irá ao evento? (Sim/Não)
   - Quantidade de adultos (1 ou 2)
   - Nome do acompanhante
   - Quantidade de crianças (0-3)
   - Mensagem para os noivos

2. **API Endpoint** (`/api/rsvp`) - Recebe os dados do formulário e envia por email

3. **Links atualizados**:
   - Botão "Confirmar Presença" na Home agora leva para a nova página
   - Link adicionado no Navbar (desktop e mobile)

## 📧 Configuração do Email (Recomendado)

### Passo 1: Crie uma conta no Resend (GRATUITO)

1. Acesse [resend.com](https://resend.com) e crie uma conta gratuita
2. No painel, vá em **API Keys** e clique em **Create API Key**
3. Dê um nome (ex: "Casamento RSVP") e copie a chave gerada

### Passo 2: Configure na Vercel

1. Acesse o painel da Vercel do seu projeto
2. Vá em **Settings > Environment Variables**
3. Adicione duas variáveis:

| Nome | Valor |
|------|-------|
| `RESEND_API_KEY` | Cole a chave da API do Resend |
| `RSVP_EMAIL_TO` | Seu email (ex: seuemail@gmail.com) |

4. Clique em **Save** e faça um novo deploy

### Pronto! 🎉

Agora cada confirmação de presença será enviada para seu email com todos os detalhes formatados.

## 📸 Imagem da Capela

A imagem `capelaAquarela.png` deve estar na pasta `src/assets/`.

## 📊 Integração com Google Sheets (Opcional mas Recomendado)

Para receber os dados em uma planilha do Google automaticamente:

### Passo 1: Crie uma planilha no Google Sheets

Crie uma planilha com as seguintes colunas na primeira linha:
- A1: `Nome Completo`
- B1: `Irá ao Evento`
- C1: `Qtd Adultos`
- D1: `Nome Acompanhante`
- E1: `Qtd Crianças`
- F1: `Mensagem`
- G1: `Data de Envio`

### Passo 2: Crie um Google Apps Script

1. Na planilha, vá em **Extensões > Apps Script**
2. Apague o código existente e cole:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.nomeCompleto,
      data.iraAoEvento,
      data.quantidadeAdultos,
      data.nomeAcompanhante,
      data.quantidadeCriancas,
      data.mensagem,
      data.dataEnvio
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique em **Implantar > Nova implantação**
4. Selecione **Aplicativo da Web**
5. Em "Executar como", escolha **Eu**
6. Em "Quem tem acesso", escolha **Qualquer pessoa**
7. Clique em **Implantar** e copie a URL gerada

### Passo 3: Configure a variável de ambiente na Vercel

1. Acesse o painel da Vercel do seu projeto
2. Vá em **Settings > Environment Variables**
3. Adicione:
   - **Nome**: `RSVP_WEBHOOK_URL`
   - **Valor**: Cole a URL do Apps Script

## 🔍 Verificando os dados

### Via Logs da Vercel

Mesmo sem a integração com Google Sheets, todos os RSVPs são registrados nos logs da Vercel:

1. Acesse o painel da Vercel
2. Vá em **Deployments** > Selecione o deployment mais recente
3. Clique em **Functions** e depois em **rsvp**
4. Veja os logs com os dados recebidos

### Via Google Sheets

Se configurado, os dados aparecerão automaticamente na planilha.

## 🎨 Personalização

O formulário usa o mesmo padrão visual do portal:
- Cores primárias: `--color-primary` (azul suave) e `--color-wood-dark` (marrom)
- Tipografia: Playfair Display para títulos
- Cards com bordas arredondadas e sombras suaves

## 🧪 Testando Localmente

```bash
npm run dev
```

Acesse: http://localhost:5173/confirmar-presenca

**Nota**: A API `/api/rsvp` só funciona quando deployado na Vercel. Localmente, você receberá um erro ao submeter o formulário, mas pode testar o visual e a validação.

## 📧 Alternativa: Notificação por Email

Se preferir receber por email, você pode usar serviços como:
- **Formspree** - Integração simples via webhook
- **EmailJS** - Envia diretamente do frontend
- **SendGrid** - Requer configuração no backend

Para implementar, modifique o arquivo `/api/rsvp.ts` conforme a documentação do serviço escolhido.
