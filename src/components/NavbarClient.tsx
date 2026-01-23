'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingBag, User, PlusCircle, MessageSquare, LogOut, Settings } from 'lucide-react';
import { NavbarStyles } from './NavbarStyles';
import CategoryNav from './CategoryNav';

interface NavbarClientProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  } | null;
}

const NavbarClient = ({ user }: NavbarClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  const handleSignOut = async () => {
    const { handleSignOut } = await import('@/app/actions/auth');
    await handleSignOut();
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo">
          <span className="logo-text-gold">Torodo</span>
          <span className="logo-hyphen">-</span>
          <span className="logo-text-gold">Avenue</span>
        </Link>

        <form className="search-container" onSubmit={handleSearch}>
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Rechercher des vêtements, marques, boubous..."
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <div className="nav-actions">
          <Link href="/sell" className="btn btn-primary sell-btn">
            <PlusCircle size={24} style={{ color: 'white' }} />
            <span>Vendre</span>
          </Link>

          <div className="nav-icons">
            <Link href="/cart" className="nav-icon-link">
              <ShoppingBag size={24} />
              <span className="badge">0</span>
            </Link>
            {user && (
              <Link href="/messages" className="nav-icon-link">
                <MessageSquare size={24} />
              </Link>
            )}
            {user ? (
              <div className="user-menu-wrapper" onMouseLeave={() => setShowUserMenu(false)}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user.image ? (
                    <img src={user.image} alt={user.name || ''} className="user-avatar-img" />
                  ) : (
                    <User size={24} />
                  )}
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <Link href={`/profile/${user.id || 'me'}`} className="dropdown-item">
                      <User size={18} />
                      <span>Mon profil</span>
                    </Link>
                    <Link href="/settings" className="dropdown-item">
                      <Settings size={18} />
                      <span>Paramètres</span>
                    </Link>
                    <button onClick={handleSignOut} className="dropdown-item logout-btn">
                      <LogOut size={18} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin" className="btn btn-primary login-btn">S'inscrire</Link>
            )}
          </div>
        </div>
      </div>

      <CategoryNav />

      <style jsx>{NavbarStyles}</style>
    </nav>
  );
};

export default NavbarClient;
