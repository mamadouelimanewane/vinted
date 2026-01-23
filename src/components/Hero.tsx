'use client';

import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-card animate-fade-in">
          <h1>Bienvenue sur <span className="text-secondary">Torodo-Avenue</span></h1>
          <p>La marketplace premium pour acheter et vendre des articles d'exception au Sénégal.</p>
          <div className="hero-actions">
            <Link href="/sell" className="btn btn-secondary">Commencer à vendre</Link>
            <Link href="/#main-collection" className="btn btn-outline">Explorer la collection</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          height: 600px;
          background: linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('/images/african-fashion-modern.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          position: relative;
        }

        .hero-content {
          width: 100%;
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          max-width: 500px;
          padding: 3rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        h1 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .text-secondary {
          color: var(--secondary);
        }

        p {
          font-size: 1.1rem;
          color: var(--muted);
          margin-bottom: 2.5rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .hero {
            height: 500px;
          }
          .hero-card {
            padding: 2rem;
            margin: 0 auto;
          }
          h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
