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
            name: 'Boubou Elégant Bleu',
            description: 'Magnifique boubou traditionnel sénégalais en coton de haute qualité. Broderies faites à la main.',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=700&fit=crop',
            brand: 'Artisanat Sénégalais',
            size: 'XL / 44 / 16',
            condition: 'Très bon état',
            userId: user1.id,
            categoryId: categories['Traditionnel'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Veste Zara Homme',
            description: 'Veste de costume Zara, portée quelques fois seulement.',
            price: 12500,
            image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500&h=700&fit=crop',
            brand: 'Zara',
            size: 'M / 38 / 10',
            condition: 'Bon état',
            userId: user2.id,
            categoryId: categories['Hommes'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Robe de Soie Rouge',
            description: 'Robe élégante pour soirées.',
            price: 35000,
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=700&fit=crop',
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
