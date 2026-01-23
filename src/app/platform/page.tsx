import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Truck, Heart, TrendingUp } from 'lucide-react';

export default function PlatformPage() {
    return (
        <main>
            <Navbar />

            <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>Notre Plateforme</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '3rem' }}>
                        Torodo-Avenue est la première marketplace premium de seconde main au Sénégal.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)' }}>
                            <Shield size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>Paiement Sécurisé</h3>
                            <p style={{ color: 'var(--muted)' }}>Vos transactions sont protégées avec Wave et Orange Money.</p>
                        </div>

                        <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)' }}>
                            <Truck size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>Livraison Rapide</h3>
                            <p style={{ color: 'var(--muted)' }}>Partout au Sénégal grâce à notre réseau de partenaires.</p>
                        </div>

                        <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)' }}>
                            <Heart size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>Communauté</h3>
                            <p style={{ color: 'var(--muted)' }}>Achetez et vendez au sein d'une communauté de confiance.</p>
                        </div>

                        <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)' }}>
                            <TrendingUp size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>Mode Durable</h3>
                            <p style={{ color: 'var(--muted)' }}>Donnez une seconde vie aux articles de qualité.</p>
                        </div>
                    </div>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Comment ça marche ?</h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Pour les vendeurs</h3>
                            <ol style={{ paddingLeft: '1.5rem', color: 'var(--muted)', lineHeight: '1.8' }}>
                                <li>Créez votre compte gratuitement</li>
                                <li>Prenez des photos de vos articles</li>
                                <li>Fixez votre prix et publiez</li>
                                <li>Recevez votre paiement de manière sécurisée</li>
                            </ol>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Pour les acheteurs</h3>
                            <ol style={{ paddingLeft: '1.5rem', color: 'var(--muted)', lineHeight: '1.8' }}>
                                <li>Parcourez notre sélection premium</li>
                                <li>Contactez le vendeur pour plus d'infos</li>
                                <li>Achetez en toute sécurité</li>
                                <li>Recevez votre article chez vous</li>
                            </ol>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
