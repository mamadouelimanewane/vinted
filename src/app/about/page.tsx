import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <main>
            <Navbar />

            <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>À propos de Torodo-Avenue</h1>

                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text)' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            <strong style={{ color: 'var(--secondary)' }}>Torodo-Avenue</strong> est la première marketplace premium de seconde main au Sénégal,
                            dédiée à la mode et aux articles d'exception.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Notre Mission</h2>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--muted)' }}>
                            Nous croyons que la mode de seconde main est l'avenir. Notre mission est de créer une plateforme où les Sénégalais
                            peuvent acheter et vendre des articles de qualité en toute confiance, tout en contribuant à une consommation plus durable.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Nos Valeurs</h2>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Confiance</strong> : Chaque transaction est sécurisée et protégée</li>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Qualité</strong> : Nous valorisons les articles d'exception</li>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Communauté</strong> : Construire un réseau de passionnés de mode</li>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Durabilité</strong> : Donner une seconde vie aux vêtements</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Pourquoi Torodo-Avenue ?</h2>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--muted)' }}>
                            "Torodo" signifie "noble" en wolof, reflétant notre engagement envers la qualité et l'excellence.
                            "Avenue" évoque une destination de shopping haut de gamme. Ensemble, Torodo-Avenue représente
                            une nouvelle façon d'acheter et de vendre au Sénégal.
                        </p>

                        <div style={{
                            marginTop: '3rem',
                            padding: '2rem',
                            background: 'rgba(212, 175, 55, 0.1)',
                            borderRadius: '12px',
                            borderLeft: '4px solid var(--secondary)'
                        }}>
                            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text)' }}>
                                "Vendez ce que vous ne portez plus. Achetez ce qui vous fait plaisir."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
