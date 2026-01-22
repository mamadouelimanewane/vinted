import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import styles from './checkout.module.css';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    const buyerProtection = 1500;
    const shipping = 2500;
    const total = product.price + buyerProtection + shipping;

    return (
        <main>
            <Navbar />

            <div className="container">
                <div className={styles.checkoutContainer}>
                    <div className={styles.mainContent}>
                        <h1>Finaliser votre commande</h1>

                        <section className={styles.section}>
                            <h3 className={styles.summaryTitle}>Mode de paiement local</h3>
                            <div className={styles.paymentMethods}>
                                <div className={`${styles.methodCard} ${styles.active}`}>
                                    <img src="/logos/wave.png" alt="Wave" className={styles.logo} />
                                    <span className={styles.methodLabel}>Wave</span>
                                </div>
                                <div className={styles.methodCard}>
                                    <img src="/logos/orange_money.png" alt="Orange Money" className={styles.logo} />
                                    <span className={styles.methodLabel}>Orange Money</span>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h3 className={styles.summaryTitle}>Adresse de livraison</h3>
                            <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                                <p style={{ fontWeight: 600 }}>Cité Keur Gorgui, Dakar</p>
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>+221 77 123 45 67</p>
                                <button style={{ color: 'var(--secondary)', background: 'none', border: 'none', padding: 0, marginTop: '1rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    Modifier
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className={styles.summaryCard}>
                        <h3 className={styles.summaryTitle}>Résumé de la transaction</h3>

                        <div className={styles.productSnippet}>
                            <img src={product.image} alt={product.name} className={styles.productImg} />
                            <div>
                                <h4>{product.name}</h4>
                                <p style={{ color: 'var(--secondary)', fontWeight: 700 }}>{product.price.toLocaleString('fr-FR')} FCFA</p>
                            </div>
                        </div>

                        <div className={styles.priceBreakdown}>
                            <div className={styles.row}>
                                <span>Prix de l'article</span>
                                <span>{product.price.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                            <div className={styles.row}>
                                <span>Protection acheteur</span>
                                <span>{buyerProtection.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                            <div className={styles.row}>
                                <span>Frais de port</span>
                                <span>{shipping.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                            <div className={`${styles.row} ${styles.total}`}>
                                <span>Total</span>
                                <span>{total.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                        </div>

                        <button className="btn btn-secondary payBtn">
                            Payer maintenant
                        </button>

                        <div className={styles.trustInfo}>
                            <ShieldCheck size={16} />
                            <span>Paiement sécurisé par SSL</span>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </main >
    );
}
