import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clean up existing data
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});

    // Create Users
    const user1 = await prisma.user.create({
        data: {
            name: 'Aicha Dkr',
            email: 'aicha@example.com',
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Moussa S',
            email: 'moussa@example.com',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        },
    });

    // Create Categories
    const categoryNames = ['Femmes', 'Hommes', 'Enfants', 'Maison', 'Traditionnel'];
    const categories: Record<string, string> = {};
    for (const name of categoryNames) {
        const cat = await prisma.category.create({ data: { name } });
        categories[name] = cat.id;
    }

    // Create Products
    await prisma.product.create({
        data: {
            name: 'Grand Boubou Prestige',
            description: 'Magnifique boubou traditionnel sénégalais en coton de haute qualité. Broderies faites à la main.',
            price: 65000,
            image: 'https://images.unsplash.com/photo-1582142306909-195724d06a65?q=80&w=800&auto=format&fit=crop',
            brand: 'Artisanat Sénégalais',
            size: 'XL / 44 / 16',
            condition: 'Très bon état',
            userId: user1.id,
            categoryId: categories['Traditionnel'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Robe de Mariée Royale',
            description: 'Robe de mariée d\'exception, design moderne avec traîne élégante.',
            price: 450000,
            image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop',
            brand: 'Torodo Bridal',
            size: 'L / 40 / 12',
            condition: 'Neuf',
            userId: user2.id,
            categoryId: categories['Femmes'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Robe de Soirée Bleue Royale',
            description: 'Robe de cocktail chic, couleur bleue vibrante, idéale pour les cérémonies.',
            price: 85000,
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
            brand: 'Dakar Couture',
            size: 'M / 38 / 10',
            condition: 'Excellent état',
            userId: user1.id,
            categoryId: categories['Femmes'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Ensemble Wax Moderne',
            description: 'Robe en wax aux motifs géométriques, manches évasées.',
            price: 35000,
            image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop',
            brand: 'Afro Style',
            size: 'S / 36 / 8',
            condition: 'Très bon état',
            userId: user2.id,
            categoryId: categories['Traditionnel'],
        },
    });

    console.log('Seed data created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
