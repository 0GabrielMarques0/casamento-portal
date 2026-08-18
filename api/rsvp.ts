import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface RSVPData {
  nomeCompleto: string;
  iraAoEvento: 'sim' | 'nao';
  quantidadeAdultos: '1' | '2' | '';
  nomeAcompanhante: string;
  quantidadeCriancas: '0' | '1' | '2' | '3' | '';
  mensagem: string;
  dataEnvio: string;
}

// Variáveis de ambiente:
// RESEND_API_KEY: Chave da API do Resend (obrigatório para emails)
// RSVP_EMAIL_TO: Email para receber notificações
// RSVP_WEBHOOK_URL: URL do Google Apps Script (opcional)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const data: RSVPData = req.body;

    // Validação básica
    if (!data.nomeCompleto || !data.iraAoEvento) {
      return res.status(400).json({ error: 'Dados obrigatórios não preenchidos' });
    }

    const dataFormatada = new Date(data.dataEnvio).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    // Log para debug (visível nos logs da Vercel)
    console.log('📬 Nova confirmação de presença recebida:');
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
    console.log(`Data de envio: ${dataFormatada}`);
    console.log('-------------------------------------------');

    // Enviar email via Resend (se configurado)
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.RSVP_EMAIL_TO;

    if (resendApiKey && emailTo) {
      try {
        const resend = new Resend(resendApiKey);
        
        const confirmacao = data.iraAoEvento === 'sim' ? '✅ SIM' : '❌ NÃO';
        const emoji = data.iraAoEvento === 'sim' ? '🎉' : '😢';
        
        let detalhes = '';
        if (data.iraAoEvento === 'sim') {
          detalhes = `
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Adultos:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.quantidadeAdultos}</td></tr>
            ${data.nomeAcompanhante ? `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Acompanhante:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.nomeAcompanhante}</td></tr>` : ''}
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Crianças:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.quantidadeCriancas}</td></tr>
          `;
        }

        await resend.emails.send({
          from: 'Casamento J&G <onboarding@resend.dev>',
          to: emailTo,
          subject: `${emoji} RSVP: ${data.nomeCompleto} - ${confirmacao}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #8AB6D6 0%, #D4AF37 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">💒 Confirmação de Presença</h1>
                <p style="color: white; margin: 5px 0 0;">Casamento de Joara & Gabriel</p>
              </div>
              
              <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <span style="font-size: 48px;">${emoji}</span>
                  <h2 style="color: ${data.iraAoEvento === 'sim' ? '#48C774' : '#c94c4c'}; margin: 10px 0;">
                    ${data.iraAoEvento === 'sim' ? 'Presença Confirmada!' : 'Não poderá comparecer'}
                  </h2>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nome:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.nomeCompleto}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Confirmou:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${confirmacao}</td></tr>
                  ${detalhes}
                  ${data.mensagem ? `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Mensagem:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.mensagem}</td></tr>` : ''}
                  <tr><td style="padding: 10px;"><strong>Data:</strong></td><td style="padding: 10px;">${dataFormatada}</td></tr>
                </table>
              </div>
              
              <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                Este email foi enviado automaticamente pelo portal do casamento.
              </p>
            </div>
          `
        });
        
        console.log('✅ Email enviado com sucesso para', emailTo);
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError);
        // Não falha a requisição principal se o email falhar
      }
    }

    // Enviar para Google Sheets via webhook (se configurado)
    const webhookUrl = process.env.RSVP_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nomeCompleto: data.nomeCompleto,
            iraAoEvento: data.iraAoEvento === 'sim' ? 'Sim' : 'Não',
            quantidadeAdultos: data.iraAoEvento === 'sim' ? data.quantidadeAdultos : '-',
            nomeAcompanhante: data.nomeAcompanhante || '-',
            quantidadeCriancas: data.iraAoEvento === 'sim' ? data.quantidadeCriancas : '-',
            mensagem: data.mensagem || '-',
            dataEnvio: dataFormatada
          }),
        });

        if (!webhookResponse.ok) {
          console.error('Erro ao enviar para webhook:', await webhookResponse.text());
        } else {
          console.log('✅ Dados enviados para webhook com sucesso');
        }
      } catch (webhookError) {
        console.error('Erro ao conectar com webhook:', webhookError);
      }
    }

    // Retornar sucesso
    return res.status(200).json({ 
      success: true, 
      message: 'Confirmação recebida com sucesso!',
      data: {
        nome: data.nomeCompleto,
        confirmado: data.iraAoEvento === 'sim'
      }
    });

  } catch (error) {
    console.error('Erro ao processar RSVP:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
