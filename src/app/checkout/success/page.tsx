import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--card-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', maxWidth: '500px' }}>
                    <div style={{ color: '#22c55e', marginBottom: '1.5rem' }}>
                        <CheckCircle size={64} style={{ margin: '0 auto' }} />
                    </div>
                    <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Paiement Réussi !</h1>
                    <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
                        Merci pour votre achat sur Torodo-Avenue. Votre commande a été enregistrée avec succès.
                        Le vendeur va préparer l'expédition de votre article.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/messages" className="btn btn-secondary" style={{ width: '100%' }}>
                            Contacter le vendeur
                        </Link>
                        <Link href="/" className="btn btn-outline" style={{ width: '100%' }}>
                            Continuer mes achats
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
