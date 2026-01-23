'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const categories = [
  {
    name: 'Femmes',
    subcategories: [
      { name: 'Vêtements', items: ['Robes', 'Hauts & T-shirts', 'Pantalons & Leggings', 'Pulls & Gilets', 'Manteaux & Vestes', 'Jupes', 'Jeans', 'Shorts', 'Combinaisons', 'Robes de soirée', 'Costumes & Tailleurs'] },
      { name: 'Chaussures', items: ['Bottes', 'Baskets', 'Sandales', 'Talons', 'Chaussures plates', 'Mocassins', 'Chaussures de sport', 'Bottines'] },
      { name: 'Sacs', items: ['Sacs à main', 'Sacs à dos', 'Sacs bandoulière', 'Pochettes', 'Sacs de voyage', 'Portefeuilles'] },
      { name: 'Accessoires', items: ['Bijoux', 'Montres', 'Écharpes', 'Chapeaux', 'Lunettes de soleil', 'Gants', 'Ceintures', 'Porte-clés'] },
      { name: 'Beauté', items: ['Maquillage', 'Parfums', 'Soins visage', 'Soins corps', 'Cheveux', 'Vernis à ongles'] },
      { name: 'Sous-vêtements', items: ['Soutiens-gorge', 'Culottes', 'Pyjamas & Nuisettes', 'Maillots de bain'] },
    ]
  },
  {
    name: 'Hommes',
    subcategories: [
      { name: 'Vêtements', items: ['T-shirts', 'Chemises', 'Pulls & Gilets', 'Manteaux & Vestes', 'Pantalons', 'Jeans', 'Shorts', 'Costumes', 'Survêtements', 'Polos'] },
      { name: 'Chaussures', items: ['Baskets', 'Bottes', 'Mocassins', 'Sandales', 'Chaussures de sport', 'Chaussures habillées'] },
      { name: 'Accessoires', items: ['Montres', 'Ceintures', 'Chapeaux & Casquettes', 'Lunettes de soleil', 'Portefeuilles', 'Sacs', 'Écharpes', 'Gants'] },
      { name: 'Sous-vêtements', items: ['Caleçons & Boxers', 'Chaussettes', 'Pyjamas', 'Maillots de bain'] },
      { name: 'Soins', items: ['Parfums', 'Soins visage', 'Rasage', 'Soins corps'] },
    ]
  },
  {
    name: 'Enfants',
    subcategories: [
      { name: 'Filles (2-16 ans)', items: ['Robes', 'T-shirts & Hauts', 'Pantalons', 'Pulls & Gilets', 'Manteaux & Vestes', 'Jupes', 'Chaussures', 'Sacs & Accessoires'] },
      { name: 'Garçons (2-16 ans)', items: ['T-shirts', 'Chemises', 'Pantalons', 'Pulls & Gilets', 'Manteaux & Vestes', 'Shorts', 'Chaussures', 'Accessoires'] },
      { name: 'Bébés (0-24 mois)', items: ['Bodies', 'Grenouillères', 'Ensembles', 'Chaussures', 'Accessoires bébé'] },
      { name: 'Jouets', items: ['Jeux de construction', 'Poupées', 'Jeux de société', 'Peluches', 'Jeux éducatifs', 'Puzzles'] },
      { name: 'Soin bébé', items: ['Biberons', 'Poussettes', 'Sièges auto', 'Lits & Berceaux', 'Chaises hautes'] },
    ]
  },
  {
    name: 'Maison',
    subcategories: [
      { name: 'Textiles', items: ['Linge de lit', 'Rideaux', 'Tapis', 'Coussins', 'Plaids', 'Serviettes'] },
      { name: 'Décoration', items: ['Cadres', 'Bougies', 'Vases', 'Miroirs', 'Horloges', 'Tableaux'] },
      { name: 'Art de la table', items: ['Vaisselle', 'Verres', 'Couverts', 'Nappes', 'Sets de table'] },
      { name: 'Cuisine', items: ['Ustensiles', 'Robots', 'Casseroles & Poêles', 'Rangement'] },
    ]
  },
  {
    name: 'Divertissement',
    subcategories: [
      { name: 'Livres', items: ['Romans', 'BD & Manga', 'Littérature', 'Cuisine', 'Bien-être', 'Scolaire'] },
      { name: 'Musique & Films', items: ['CD', 'Vinyles', 'DVD', 'Blu-ray'] },
      { name: 'Jeux vidéo', items: ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Accessoires'] },
      { name: 'Sports & Loisirs', items: ['Équipement sportif', 'Vélos', 'Camping', 'Fitness'] },
    ]
  },
  {
    name: 'Animaux',
    subcategories: [
      { name: 'Chiens', items: ['Vêtements', 'Colliers & Laisses', 'Jouets', 'Gamelles', 'Paniers & Coussins'] },
      { name: 'Chats', items: ['Jouets', 'Arbres à chat', 'Litières', 'Gamelles', 'Griffoirs'] },
      { name: 'Autres animaux', items: ['Oiseaux', 'Rongeurs', 'Poissons', 'Reptiles'] },
    ]
  },
  {
    name: 'Traditionnel',
    subcategories: [
      { name: 'Femmes', items: ['Boubous', 'Robes Wax', 'Ensembles', 'Tissus', 'Bazin', 'Kaftan'] },
      { name: 'Hommes', items: ['Grands Boubous', 'Tuniques', 'Ensembles', 'Bazin Riche', 'Dashiki'] },
      { name: 'Accessoires', items: ['Bijoux traditionnels', 'Sacs', 'Chaussures', 'Chapeaux'] },
    ]
  },
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
