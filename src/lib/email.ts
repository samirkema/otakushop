import { Resend } from 'resend';

// Initialisation lazy pour éviter une exception au chargement du module lors
// du build Next.js quand RESEND_API_KEY n'est pas définie (ex: CI, preview).
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('[email] RESEND_API_KEY is not set — cannot send email');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM = process.env.EMAIL_FROM ?? 'Otaku Shop <noreply@otakushop.io>';

export async function sendSubscriptionConfirmation(opts: {
  to:        string;
  pseudo:    string;
  expiresAt: Date;
}) {
  const expires = opts.expiresAt.toLocaleDateString('fr-FR', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
  });

  return getResend().emails.send({
    from:    FROM,
    to:      opts.to,
    subject: '🎉 Votre abonnement Otaku Shop est activé !',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h1 style="color:#4f46e5;margin-bottom:8px">Bienvenue, ${escapeHtml(opts.pseudo)} !</h1>
        <p>Votre abonnement est maintenant actif. Profitez de l'accès complet à :</p>
        <ul style="line-height:2">
          <li>Lecture illimitée (mangas, webtoons, BD)</li>
          <li>Studio My Remix et galerie communautaire</li>
          <li>Jeux en ligne</li>
        </ul>
        <p style="color:#6b7280;font-size:14px">
          Abonnement valable jusqu'au <strong>${expires}</strong>.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://otakushop.io'}/manga"
           style="display:inline-block;margin-top:16px;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px">
          Commencer à lire →
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:32px">
          Vous recevez cet email car vous avez activé un abonnement Otaku Shop.<br>
          En cas de question, répondez à cet email.
        </p>
      </div>
    `,
  });
}

export async function sendPaymentReceipt(opts: {
  to:          string;
  pseudo:      string;
  amountEur:   number;
  paymentRef:  string | null;
  expiresAt:   Date;
}) {
  const expires = opts.expiresAt.toLocaleDateString('fr-FR', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
  });

  return getResend().emails.send({
    from:    FROM,
    to:      opts.to,
    subject: `Reçu Otaku Shop — ${opts.amountEur.toFixed(2)} €`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h1 style="color:#4f46e5;margin-bottom:8px">Reçu de paiement</h1>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px 0;color:#6b7280">Client</td><td style="padding:8px 0;font-weight:600">${escapeHtml(opts.pseudo)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Montant</td><td style="padding:8px 0;font-weight:600">${opts.amountEur.toFixed(2)} €</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Référence</td><td style="padding:8px 0;font-family:monospace;font-size:13px">${opts.paymentRef ?? '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Accès jusqu'au</td><td style="padding:8px 0;font-weight:600">${expires}</td></tr>
        </table>
        <p style="color:#9ca3af;font-size:12px;margin-top:32px">
          Otaku Shop — conservez cet email comme justificatif.
        </p>
      </div>
    `,
  });
}

// Échappe les caractères HTML pour éviter l'injection dans les templates email
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
