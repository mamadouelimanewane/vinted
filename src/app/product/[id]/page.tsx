import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, ShieldCheck, Truck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import styles from './product-details.module.css';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <div className={`container ${styles.productContainer}`}>
        <div className={styles.productLayout}>
          <div className={styles.productGallery}>
            <div className={styles.mainImage}>
              <img src={product.image} alt={product.brand || product.name} />
            </div>
          </div>

          <div className={styles.productDetailsCard}>
            <div className={styles.detailsHeader}>
              <h1 className={styles.price}>{product.price.toLocaleString('fr-FR')} FCFA</h1>
              <div className={styles.feeInfo}>
                <span>+ Protection acheteur 1.500 FCFA</span>
              </div>
            </div>

            <div className={styles.detailsSummary}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Marque</span>
                <span className={styles.value}>{product.brand}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Taille</span>
                <span className={styles.value}>{product.size}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>État</span>
                <span className={styles.value}>{product.condition}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Emplacement</span>
                <span className={styles.value}>Dakar, Sénégal</span>
              </div>
            </div>

            <div className={styles.detailsDescription}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.detailsActions}>
              <Link href={`/checkout/${product.id}`} className={`btn btn-secondary ${styles.buyNow}`}>
                Acheter
              </Link>
              <form action={async () => {
                'use server';
                const { startConversation } = await import('@/app/actions/messages');
                await startConversation(product.id, product.user.id);
              }} style={{ width: '100%' }}>
                <button type="submit" className={`btn btn-outline ${styles.message}`}>Message</button>
              </form>
              <button className={`btn btn-outline ${styles.like}`}>
                <Heart size={20} />
                <span>Ajouter aux favoris</span>
              </button>
            </div>

            <div className={styles.sellerCard}>
              <div className={styles.sellerHeader}>
                <img src={product.user.image || ''} alt={product.user.name || ''} className={styles.sellerAvatar} />
                <div className={styles.sellerInfo}>
                  <h4>{product.user.name}</h4>
                  <p>Membre de Torodo-Avenue</p>
                  <div className={styles.sellerRank}>⭐ 4.9 (15 articles)</div>
                </div>
              </div>
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <ShieldCheck size={20} className={styles.trustIcon} />
                <div>
                  <h5>Paiement sécurisé</h5>
                  <p>Vos transactions sont protégées.</p>
                </div>
              </div>
              <div className={styles.trustItem}>
                <Truck size={20} className={styles.trustIcon} />
                <div>
                  <h5>Livraison rapide</h5>
                  <p>Partout au Sénégal via nos partenaires.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
