
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  return (
    <main>
      <Navbar />

      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <ShoppingBag size={64} />
          </div>

          <h1 style={{ color: 'var(--text)', fontSize: '2.5rem' }}>Votre panier est vide</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Vous n'avez pas encore d'articles dans votre panier.
            Découvrez notre sélection exclusive d'articles premium et trouvez votre coup de cœur !
          </p>

          <Link href="/" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
            <ArrowLeft size={20} />
            <span>Continuer mes achats</span>
          </Link>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .container {
          background-color: var(--background);
        }
      `}</style>
    </main >
  );
}
