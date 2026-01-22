import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import styles from './profile.module.css';

export default async function ProfilePage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            products: {
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    });

    if (!user) {
        notFound();
    }

    return (
        <main>
            <Navbar />

            <div className={styles.profileHeader}>
                <div className="container">
                    <div className={styles.profileInfo}>
                        <img src={user.image || ''} alt={user.name || ''} className={styles.avatar} />
                        <div className={styles.details}>
                            <h1>{user.name}</h1>
                            <div className={styles.stats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{user.products.length}</span>
                                    <span className={styles.statLabel}>Annonces</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>4.9</span>
                                    <span className={styles.statLabel}>Évaluation</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>125</span>
                                    <span className={styles.statLabel}>Abonnés</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 className={styles.sectionTitle}>Annonces de {user.name}</h2>

                <div className={styles.productGrid}>
                    {user.products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            price={product.price.toLocaleString('fr-FR')}
                            brand={product.brand || 'Sans marque'}
                            size={product.size || 'N/A'}
                            userName={user.name || 'Anonyme'}
                            userImage={user.image || ''}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
