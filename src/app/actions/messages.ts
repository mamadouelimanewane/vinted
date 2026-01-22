'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function startConversation(productId: string, sellerId: string) {
    // Get current user (mocked for now - taking the first user that is NOT the seller)
    const currentUser = await prisma.user.findFirst({
        where: {
            NOT: { id: sellerId }
        }
    });

    if (!currentUser) {
        throw new Error('Connectez-vous pour envoyer un message.');
    }

    // Check if conversation already exists between these users
    // @ts-ignore - Prisma types might not be updated in IDE
    let conversation = await prisma.conversation.findFirst({
        where: {
            AND: [
                { users: { some: { id: currentUser.id } } },
                { users: { some: { id: sellerId } } }
            ]
        }
    });

    if (!conversation) {
        // @ts-ignore
        conversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        { id: currentUser.id },
                        { id: sellerId }
                    ]
                }
            }
        });

        // Send initial message about the product
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (product && conversation) {
            // @ts-ignore
            await prisma.message.create({
                data: {
                    text: `Bonjour, je suis intéressé par votre article : ${product.name}`,
                    senderId: currentUser.id,
                    conversationId: conversation.id
                }
            });
        }
    }

    if (conversation) {
        redirect(`/messages/${conversation.id}`);
    }
}

export async function sendMessage(conversationId: string, senderId: string, text: string) {
    // @ts-ignore
    const message = await prisma.message.create({
        data: {
            text,
            senderId,
            conversationId
        }
    });

    return message;
}
