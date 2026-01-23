'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const categories = [
    {
        name: 'Femmes',
        subcategories: [
            { name: 'Vêtements', items: ['Robes', 'Hauts & T-shirts', 'Pantalons & Leggings', 'Pulls & Gilets', 'Manteaux & Vestes', 'Jupes'] },
            { name: 'Chaussures', items: ['Bottes', 'Baskets', 'Sandales', 'Talons', 'Plat'] },
            { name: 'Sacs', items: ['Sacs à main', 'Sacs à dos', 'Sacs bandoulière', 'Pochettes'] },
            { name: 'Accessoires', items: ['Bijoux', 'Montres', 'Echarpes', 'Chapeaux'] },
            { name: 'Beauté', items: ['Maquillage', 'Parfums', 'Soins', 'Cheveux'] },
        ]
    },
    {
        name: 'Hommes',
        subcategories: [
            { name: 'Vêtements', items: ['T-shirts', 'Chemises', 'Pulls & Gilets', 'Manteaux & Vestes', 'Pantalons', 'Costumes'] },
            { name: 'Chaussures', items: ['Baskets', 'Bottes', 'Mocassins', 'Sandales'] },
            { name: 'Accessoires', items: ['Montres', 'Ceintures', 'Chapeaux & Casquettes', 'Lunettes de soleil'] },
            { name: 'Soins', items: ['Parfums', 'Soins visage', 'Rasage'] },
        ]
    },
    {
        name: 'Enfants',
        subcategories: [
            { name: 'Filles', items: ['Vêtements', 'Chaussures', 'Accessoires'] },
            { name: 'Garçons', items: ['Vêtements', 'Chaussures', 'Accessoires'] },
            { name: 'Jouets', items: ['Jeux de construction', 'Poupées', 'Jeux de société'] },
            { name: 'Soin bébé', items: ['Biberons', 'Toilets', 'Promenade'] },
        ]
    },
    {
        name: 'Maison',
        subcategories: [
            { name: 'Textiles', items: ['Linge de lit', 'Rideaux', 'Tapis'] },
            { name: 'Décoration', items: ['Cadres', 'Bougies', 'Vases'] },
            { name: 'Art de la table', items: ['Vaisselle', 'Verres', 'Couverts'] },
        ]
    },
    {
        name: 'Traditionnel', subcategories: [
            { name: 'Femmes', items: ['Boubous', 'Robes Wax', 'Ensembles', 'Tissus'] },
            { name: 'Hommes', items: ['Grands Boubous', 'Tuniques', 'Ensembles', 'Bazin'] },
            { name: 'Accessoires', items: ['Bijoux', 'Sacs', 'Chaussures'] },
        ]
    }, // Custom category for the market
];

const CategoryNav = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <div className="category-nav">
            <div className="container">
                <ul className="nav-list">
                    {categories.map((category) => (
                        <li
                            key={category.name}
                            className="nav-item"
                            onMouseEnter={() => setActiveCategory(category.name)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <Link href={`/?category=${category.name}`} className={`nav-link ${activeCategory === category.name ? 'active' : ''}`}>
                                {category.name}
                            </Link>

                            {activeCategory === category.name && category.subcategories && (
                                <div className="mega-menu">
                                    <div className="container menu-content">
                                        {category.subcategories.map((sub, idx) => (
                                            <div key={idx} className="menu-column">
                                                <h4>{sub.name}</h4>
                                                <ul>
                                                    {sub.items.map((item, itemIdx) => (
                                                        <li key={itemIdx}>
                                                            <Link href={`/?search=${item}`} className="sub-link">
                                                                {item}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                    <li className="nav-item"><Link href="/about" className="nav-link">À propos</Link></li>
                    <li className="nav-item"><Link href="/platform" className="nav-link">Notre plateforme</Link></li>
                </ul>
            </div>

            <style jsx>{`
        .category-nav {
          border-bottom: 1px solid var(--border);
          background: #fff;
          position: relative;
          z-index: 50;
        }

        .nav-list {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 1.5rem;
        }

        .nav-item {
          padding: 1rem 0;
        }

        .nav-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s;
          padding-bottom: 1rem;
          border-bottom: 2px solid transparent;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          z-index: 100;
        }

        .menu-content {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .menu-column h4 {
          font-size: 1rem;
          color: var(--text);
          margin-bottom: 1rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .menu-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-column li {
          margin-bottom: 0.5rem;
        }

        .sub-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .sub-link:hover {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .nav-list {
            overflow-x: auto;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }
          
          .mega-menu {
            display: none; /* Simplify for mobile for now or handle differently */
          }
        }
      `}</style>
        </div>
    );
};

export default CategoryNav;
