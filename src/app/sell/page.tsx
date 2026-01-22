import React from 'react';
export const dynamic = 'force-dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SellForm from './SellForm';
import { prisma } from '@/lib/prisma';
import styles from './sell.module.css';

export default async function SellPage() {
    const categories = await prisma.category.findMany();

    return (
        <main>
            <Navbar />

            <div className="container">
                <div className={styles.sellContainer}>
                    <h1>Vendre un article</h1>
                    <SellForm categories={categories} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
