
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Settings, User, Bell, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
    return (
        <main>
            <Navbar />

            <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
                <h1 style={{ marginBottom: '2rem', color: 'var(--text)' }}>Paramètres</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <User size={20} /> Profil
                        </div>
                        <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <Bell size={20} /> Notifications
                        </div>
                        <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <Shield size={20} /> Sécurité
                        </div>
                        <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <CreditCard size={20} /> Paiements
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Mon Profil</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nom complet</label>
                                <input type="text" placeholder="Votre nom" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                                <input type="email" placeholder="votre@email.com" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Ville</label>
                                <select style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                                    <option>Dakar</option>
                                    <option>Thiès</option>
                                    <option>Saint-Louis</option>
                                    <option>Ziguinchor</option>
                                </select>
                            </div>

                            <button className="btn btn-secondary" style={{ width: 'fit-content', padding: '0.8rem 2rem' }}>Enregistrer les modifications</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
