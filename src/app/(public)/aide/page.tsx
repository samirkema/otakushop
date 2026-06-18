export const metadata = { title: 'Aide & Tutoriel — Otaku Shop' };

const GUIDE_CARDS = [
  {
    icon: '👤',
    title: 'Créer un compte',
    body: 'Rendez-vous sur la page <strong>Mon Compte</strong> depuis l\'accueil. Choisissez un pseudo, entrez votre adresse email et créez un mot de passe. Votre compte est immédiatement actif. Si vous oubliez votre mot de passe, un lien de réinitialisation vous sera envoyé par email.',
  },
  {
    icon: '⭐',
    title: 'S\'abonner pour accéder à tout',
    body: 'Sans abonnement, vous avez accès à la galerie de tableaux et à l\'aide. Pour débloquer le manga, la zone Immersion et les jeux, abonnez-vous depuis l\'onglet <strong>Abonnement</strong> de votre compte : entrez un code d\'activation reçu après paiement, ou vérifiez votre NFT Otaku Shop si vous en possédez un.',
  },
  {
    icon: '🖼️',
    title: 'La Galerie de Tableaux',
    body: 'Accessible à tous sans abonnement. Parcourez la collection complète de tableaux et photomontages disponibles à la vente. Chaque pièce est disponible en deux formats (A4 à 25€ et 40×50 cm à 50€). Les détenteurs de NFT peuvent réclamer certaines pièces gratuitement.',
  },
  {
    icon: '📖',
    title: 'Lire le Manga',
    body: 'La section manga est réservée aux abonnés. Une fois votre abonnement activé, vous accédez à l\'intégralité du contenu : mangas, webtoons et livres numériques en français, anglais et japonais. Votre accès est valable 1 an à compter de l\'activation.',
  },
  {
    icon: '🎮',
    title: 'La Zone Immersion',
    body: 'Réservée aux abonnés, la zone Immersion regroupe des expériences interactives exclusives. Le premier jeu disponible est <strong>My Remix</strong> : choisissez une photo de la galerie, dessinez par-dessus pour créer un photomontage unique, soumettez votre création et votez pour les meilleures œuvres de la communauté.',
  },
  {
    icon: '🔗',
    title: 'NFT & Wallet Crypto',
    body: 'Si vous possédez un NFT de la collection SWAP-SWAP sur OpenSea, connectez votre wallet MetaMask depuis l\'onglet <strong>Wallet</strong> de votre compte. Cela vous donne un accès abonné gratuit et permanent. Sans NFT, tout le reste fonctionne normalement avec un abonnement classique.',
  },
  {
    icon: '🎨',
    title: 'Commandes Personnalisées',
    body: 'Ce service est exclusivement réservé aux détenteurs de NFT Otaku Shop. Il vous permet de commander une œuvre entièrement sur mesure : tableau, photomontage ou illustration personnalisée selon votre vision. Connectez votre wallet pour vérifier votre NFT et accéder à ce service.',
  },
  {
    icon: '🔑',
    title: 'Code d\'activation',
    body: 'Après paiement, vous recevez un code d\'activation unique. Saisissez-le dans l\'onglet <strong>Abonnement</strong> de votre compte pour débloquer l\'accès pendant 1 an. Conservez ce code précieusement — il ne peut être utilisé qu\'une seule fois par compte.',
  },
];

export default function AidePage() {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto 50px' }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          color: '#00f2ff',
          textShadow: '0 0 15px #00f2ff',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: '0 0 10px',
        }}>
          Toutes les informations sur OTAKU SHOP
        </h1>
        <p style={{ color: '#666', marginBottom: '0' }}>
          Découvrez notre concept et apprenez à utiliser la plateforme.
        </p>
      </div>

      {/* VIDÉO */}
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        maxWidth: '1000px',
        margin: '0 auto 50px',
        border: '3px solid #00f2ff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 30px rgba(0,242,255,0.4)',
        background: '#111',
      }}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/epgxVCeWwaQ?rel=0"
          title="TOUTES LES INFORMATIONS ESSENTIELLES SUR OTAKUSHOP"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>

      {/* MISE À JOUR BANNER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        maxWidth: '1000px',
        margin: '0 auto 40px',
        padding: '14px 24px',
        background: 'rgba(168,85,247,0.08)',
        border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: '12px',
      }}>
        <span style={{
          background: 'rgba(168,85,247,0.2)',
          color: '#a855f7',
          fontWeight: 800,
          fontSize: '0.85rem',
          letterSpacing: '1px',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(168,85,247,0.4)',
        }}>🆕 MISE À JOUR</span>
        <span style={{ color: '#666', fontSize: '0.85rem' }}>Juin 2026</span>
      </div>

      {/* GUIDE */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '1.4rem',
            color: '#00f2ff',
            letterSpacing: '2px',
            marginBottom: '14px',
            textShadow: '0 0 10px rgba(0,242,255,0.3)',
          }}>
            🗺️ Comment fonctionne Otaku Shop ?
          </h2>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            Otaku Shop est une plateforme dédiée aux passionnés de manga, webtoon et dessin. Elle fonctionne en deux modes : un mode classique accessible à tous, et un mode avancé lié à la blockchain pour ceux qui souhaitent aller plus loin.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          {GUIDE_CARDS.map((card) => (
            <div key={card.title} style={{
              background: '#0d0d0d',
              border: '1px solid #1e1e1e',
              borderRadius: '14px',
              padding: '24px 20px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
              className="guide-card"
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{card.icon}</div>
              <h3 style={{ color: '#00f2ff', fontSize: '1rem', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.5px' }}>
                {card.title}
              </h3>
              <p
                style={{ color: '#666', fontSize: '0.84rem', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: card.body.replace(/<strong>/g, '<strong style="color:#ccc">') }}
              />
            </div>
          ))}
        </div>

        {/* INFO VERCEL */}
        <div style={{
          background: 'rgba(0,242,255,0.03)',
          border: '1px solid rgba(0,242,255,0.15)',
          borderRadius: '14px',
          padding: '28px',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ color: '#00f2ff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.5px' }}>
            Site hébergé sur Vercel
          </h3>
          <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7 }}>
            Otaku Shop V2 est hébergé sur Vercel avec un backend Supabase. Les temps de réponse sont rapides et les données sécurisées côté serveur. Si une page met du temps à charger lors d'une première visite, patientez quelques secondes le temps que le cache se réchauffe.
          </p>
        </div>
      </div>

      {/* FOOTER AIDE */}
      <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-block',
          padding: '25px 40px',
          background: 'rgba(17,17,17,0.9)',
          border: '1px solid #1e1e1e',
          borderRadius: '15px',
        }}>
          <h3 style={{ color: '#00f2ff', marginBottom: '15px' }}>🔗 Liens utiles</h3>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px' }}>
            Collection NFT :{' '}
            <a href="https://opensea.io/collection/swap-swap-54096494" target="_blank" rel="noopener noreferrer"
              style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 'bold' }}>
              SWAP-SWAP sur OpenSea
            </a>
          </p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Contact :{' '}
            <a href="mailto:kilimangarocontact@gmail.com"
              style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 'bold' }}>
              kilimangarocontact@gmail.com
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .guide-card:hover {
          border-color: #00f2ff !important;
          box-shadow: 0 4px 20px rgba(0,242,255,0.08);
        }
      `}</style>
    </div>
  );
}
