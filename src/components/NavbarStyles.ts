import { Search, ShoppingBag, User, PlusCircle, MessageSquare, LogOut, Settings } from 'lucide-react';

export const NavbarStyles = `
  .navbar {
    background: var(--card-bg);
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
  }

  .logo-text-gold {
    color: var(--secondary);
  }

  .logo-hyphen {
    color: var(--primary);
  }

  .search-container {
    flex: 1;
    display: flex;
    align-items: center;
    background: var(--background);
    padding: 0.6rem 1rem;
    border-radius: 50px;
    border: 1px solid var(--border);
    max-width: 600px;
  }

  .search-icon {
    color: var(--muted);
    margin-right: 0.8rem;
  }

  .search-input {
    background: none;
    border: none;
    width: 100%;
    font-size: 0.95rem;
    color: var(--foreground);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-icons {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .nav-icon-link {
    position: relative;
    color: var(--primary);
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--secondary);
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
  }

  .user-menu-wrapper {
    position: relative;
  }

  .user-avatar-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-avatar-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--secondary);
  }

  .user-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    min-width: 220px;
    z-index: 1001;
  }

  .dropdown-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .user-name {
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  .user-email {
    font-size: 0.85rem;
    color: var(--muted);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: var(--foreground);
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.95rem;
  }

  .dropdown-item:hover {
    background: var(--background);
  }

  .logout-btn {
    border-top: 1px solid var(--border);
    color: #ff4d4d;
  }

  @media (max-width: 1024px) {
    .nav-content {
      gap: 1rem;
    }
    .search-container {
      display: none;
    }
  }
`;
