'use client';

import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { createProduct } from '@/app/actions/product';
import styles from './sell.module.css';

interface SellFormProps {
    categories: { id: string; name: string }[];
}

const SellForm = ({ categories }: SellFormProps) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            if (imageUrl) {
                formData.set('image', imageUrl);
            }
            await createProduct(formData);
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue lors de la création de l\'annonce.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formSection}>
                <h3>Photos</h3>
                <ImageUpload
                    value={imageUrl}
                    onChange={(url) => setImageUrl(url)}
                />
                <input type="hidden" name="image" value={imageUrl} />
            </div>

            <div className={styles.formSection}>
                <h3>Informations de l'article</h3>

                <div className={styles.formGroup}>
                    <label htmlFor="name">Titre de l'annonce</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="ex: Boubou en soie, Veste Dior..."
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Décrivez l'état, la matière, les défauts..."
                        className={styles.textarea}
                        required
                    ></textarea>
                </div>
            </div>

            <div className={styles.formSection}>
                <h3>Détails</h3>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Catégorie</label>
                        <select id="category" name="category" className={styles.select} required>
                            <option value="">Sélectionner</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="size">Taille</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            placeholder="ex: XL, 42, Unique..."
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="brand">Marque</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            placeholder="ex: Zara, Artisanat..."
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="condition">État</label>
                        <select id="condition" name="condition" className={styles.select} required>
                            <option value="">Sélectionner</option>
                            <option value="Neuf avec étiquette">Neuf avec étiquette</option>
                            <option value="Très bon état">Très bon état</option>
                            <option value="Bon état">Bon état</option>
                            <option value="Satisfaisant">Satisfaisant</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.formSection}>
                <h3>Prix</h3>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Prix (FCFA)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="0"
                            className={styles.input}
                            required
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className={`btn btn-secondary ${styles.submitBtn}`}
                disabled={isLoading}
            >
                {isLoading ? 'Publication en cours...' : "Publier l'annonce"}
            </button>

            <style jsx>{`
        form {
          width: 100%;
        }
      `}</style>
        </form>
    );
};

export default SellForm;
