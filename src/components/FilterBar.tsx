'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './FilterBar.module.css';

interface FilterBarProps {
    categories: { id: string; name: string }[];
}

const FilterBar: React.FC<FilterBarProps> = ({ categories }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilterChange = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        router.push(`/?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push('/');
    };

    return (
        <div className={styles.filterBar}>
            <div className="container">
                <div className={styles.filterContent}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Catégorie:</span>
                        <select
                            className={styles.select}
                            value={searchParams.get('category') || ''}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">Toutes</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Prix max:</span>
                        <select
                            className={styles.select}
                            value={searchParams.get('maxPrice') || ''}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        >
                            <option value="">Peu importe</option>
                            <option value="5000">5.000 FCFA</option>
                            <option value="15000">15.000 FCFA</option>
                            <option value="30000">30.000 FCFA</option>
                            <option value="50000">50.000 FCFA</option>
                            <option value="100000">100.000 FCFA+</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>État:</span>
                        <select
                            className={styles.select}
                            value={searchParams.get('condition') || ''}
                            onChange={(e) => handleFilterChange('condition', e.target.value)}
                        >
                            <option value="">Tous les états</option>
                            <option value="Neuf avec étiquette">Neuf</option>
                            <option value="Très bon état">Très bon</option>
                            <option value="Bon état">Bon</option>
                        </select>
                    </div>

                    <button className={styles.resetBtn} onClick={resetFilters}>
                        Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
