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
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
            brand: 'Artisanat Sénégalais',
            size: 'XL / 44 / 16',
            condition: 'Très bon état',
            userId: user1.id,
            categoryId: categories['Traditionnel'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Blazer Slim Fit Premium',
            description: 'Veste de costume moderne, coupe ajustée, idéale pour les occasions professionnelles.',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1594932224010-75f4305826af?q=80&w=1780&auto=format&fit=crop',
            brand: 'Zara Men',
            size: 'M / 38 / 10',
            condition: 'Comme neuf',
            userId: user2.id,
            categoryId: categories['Hommes'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Robe de Soirée Étoilée',
            description: 'Robe élégante en satin pour vos soirées et cérémonies.',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop',
            brand: 'Sisters of Africa',
            size: 'S / 36 / 8',
            condition: 'Très bon état',
            userId: user1.id,
            categoryId: categories['Femmes'],
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
