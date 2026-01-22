'use client';

import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <span className="logo-text-gold">Torodo</span>
            <span className="logo-hyphen">-</span>
            <span className="logo-text-gold">Avenue</span>
          </div>
          <p className="footer-desc">
            Vendez ce que vous ne portez plus. Achetez ce qui vous fait plaisir.
            La première marketplace premium de seconde main au Sénégal.
          </p>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Torodo-Avenue</h3>
          <ul>
            <li><a href="#">À propos</a></li>
            <li><a href="#">Carrières</a></li>
            <li><a href="#">Le concept</a></li>
            <li><a href="#">Publicité</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Découvrir</h3>
          <ul>
            <li><a href="#">Comment ça marche</a></li>
            <li><a href="#">Vérification d'articles</a></li>
            <li><a href="#">Applications mobiles</a></li>
            <li><a href="#">Centre d'aide</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Politique</h3>
          <ul>
            <li><a href="#">Confidentialité</a></li>
            <li><a href="#">Conditions générales</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Sécurité</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Torodo-Avenue. Fait avec passion à Dakar.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--primary);
          color: #fff;
          padding: 5rem 0 2rem;
          margin-top: 5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-logo {
          margin-bottom: 1.5rem;
        }

        .logo-text-gold { color: var(--secondary); }
        .logo-hyphen { color: #000; }

        .footer-desc {
          color: #aaa;
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 300px;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          color: #fff;
          opacity: 0.7;
        }

        .social-links a:hover {
          opacity: 1;
          color: var(--secondary);
        }

        .footer-links h3 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          color: var(--secondary);
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.8rem;
        }

        .footer-links a {
          color: #aaa;
          font-size: 0.9rem;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          text-align: center;
          color: #777;
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
