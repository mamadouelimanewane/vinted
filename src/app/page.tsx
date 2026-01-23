import Navbar from '@/components/Navbar';
export const dynamic = 'force-dynamic';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice as string) : undefined;
  const condition = params.condition as string | undefined;
  const search = params.search as string | undefined;

  const products = await prisma.product.findMany({
    where: {
      AND: [
        category ? { categoryId: category } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        condition ? { condition: condition } : {},
        search ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
            { brand: { contains: search } },
          ]
        } : {},
      ]
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <main>
      <Navbar />
      <Hero />
      <FilterBar categories={categories} />

      <section id="main-collection" className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2>{search || category ? 'Résultats de recherche' : 'Articles populaires'}</h2>
          <span className={styles.productCount}>{products.length} articles trouvés</span>
        </div>

        {products.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                price={product.price.toLocaleString('fr-FR')}
                brand={product.brand || 'Sans marque'}
                size={product.size || 'N/A'}
                userName={product.user.name || 'Anonyme'}
                userImage={product.user.image || ''}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>Aucun article ne correspond à votre recherche.</h3>
            <p>Essayez de modifier vos filtres pour voir plus d'articles.</p>
          </div>
        )}
      </section>

      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Acheter par catégorie</h2>
          </div>
          <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>Femmes</div>
            <div className={styles.categoryCard}>Hommes</div>
            <div className={styles.categoryCard}>Enfants</div>
            <div className={styles.categoryCard}>Maison</div>
            <div className={styles.categoryCard}>Traditionnel</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
