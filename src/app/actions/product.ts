'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function createProduct(formData: FormData) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error('Vous devez être connecté pour vendre un article.');
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as string;
    const brand = formData.get('brand') as string;
    const size = formData.get('size') as string;
    const condition = formData.get('condition') as string;
    const categoryId = formData.get('category') as string;

    await prisma.product.create({
        data: {
            name,
            description,
            price,
            image: image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=700&fit=crop',
            brand,
            size,
            condition,
            userId: session.user.id,
            categoryId: categoryId || undefined,
        },
    });

    revalidatePath('/');
    redirect('/');
}
