'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  image: string;
  price: string;
  brand: string;
  size: string;
  userImage: string;
  userName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, price, brand, size, userImage, userName }) => {
  return (
    <Link href={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <div className="card-header">
          <img src={userImage} alt={userName} className="user-avatar" />
          <span className="user-name">{userName}</span>
        </div>

        <div className="card-image-wrapper">
          <img src={image} alt={brand} className="product-image" />
          <button className="like-btn">
            <Heart size={20} />
          </button>
        </div>

        <div className="card-info">
          <p className="price">{price} FCFA</p>
          <p className="size">{size}</p>
          <p className="brand">{brand}</p>
        </div>

        <style jsx>{`
        .product-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition);
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .card-header {
          padding: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-name {
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 500;
        }

        .card-image-wrapper {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .like-btn {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
        }

        .like-btn:hover {
          color: #ff4d4d;
          background: #fff;
        }

        .card-info {
          padding: 0.8rem;
        }

        .price {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary);
        }

        .size, .brand {
          font-size: 0.85rem;
          color: var(--muted);
          margin-top: 2px;
        }
      `}</style>
      </div>
    </Link>
  );
};

export default ProductCard;
