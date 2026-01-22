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
            name: 'Robe Ankara Colorée Prestige',
            description: 'Magnifique robe en tissu Ankara avec motifs géométriques éclatants, manches évasées.',
            price: 65000,
            image: '/images/ankara-dress-colorful.jpg',
            brand: 'Artisanat Sénégalais',
            size: 'M / 38 / 10',
            condition: 'Neuf',
            userId: user1.id,
            categoryId: categories['Traditionnel'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Ensemble Wax Jaune Premium',
            description: 'Ensemble veste et jupe en tissu Wax jaune avec motifs africains, idéal pour cérémonies.',
            price: 125000,
            image: '/images/wax-ensemble-yellow.jpg',
            brand: 'Afro Couture',
            size: 'L / 40 / 12',
            condition: 'Excellent état',
            userId: user2.id,
            categoryId: categories['Traditionnel'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Tenue Africaine Moderne',
            description: 'Ensemble africain contemporain en tissu Wax, design unique et élégant.',
            price: 85000,
            image: '/images/african-fashion-modern.jpg',
            brand: 'Dakar Fashion',
            size: 'M / 38 / 10',
            condition: 'Très bon état',
            userId: user1.id,
            categoryId: categories['Traditionnel'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Robe de Mariée Royale Blanche',
            description: 'Robe de mariée d\'exception, design moderne avec détails perlés sur les manches.',
            price: 450000,
            image: '/images/wedding-dress-white.jpg',
            brand: 'Torodo Bridal',
            size: 'L / 40 / 12',
            condition: 'Neuf',
            userId: user2.id,
            categoryId: categories['Femmes'],
        },
    });

    await prisma.product.create({
        data: {
            name: 'Manteau Wax Multicolore',
            description: 'Manteau/robe en tissu Wax aux motifs vibrants, ceinturé à la taille.',
            price: 55000,
            image: '/images/wax-coat-colorful.jpg',
            brand: 'Afro Style',
            size: 'S / 36 / 8',
            condition: 'Comme neuf',
            userId: user1.id,
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
