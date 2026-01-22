import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import styles from './messages.module.css';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
    // Mock current user
    const currentUser = await prisma.user.findFirst();

    if (!currentUser) return <div className="container" style={{ padding: '5rem 0' }}>Connectez-vous pour voir vos messages.</div>;

    // @ts-ignore
    const conversations = await prisma.conversation.findMany({
        where: {
            users: { some: { id: currentUser.id } }
        },
        include: {
            users: {
                where: { NOT: { id: currentUser.id } }
            },
            messages: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        },
        orderBy: { updatedAt: 'desc' }
    });

    return (
        <main>
            <Navbar />
            <div className="container">
                <div className={styles.messagesPage}>
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <h2>Messages</h2>
                        </div>
                        <div className={styles.conversationList}>
                            {conversations.map((conv: any) => {
                                const otherUser = conv.users[0];
                                const lastMsg = conv.messages[0];
                                return (
                                    <Link href={`/messages/${conv.id}`} key={conv.id} className={styles.conversationItem}>
                                        <img src={otherUser?.image || ''} alt={otherUser?.name || ''} className={styles.userAvatar} />
                                        <div className={styles.convInfo}>
                                            <h4>{otherUser?.name}</h4>
                                            <p className={styles.lastMsg}>{lastMsg?.text || 'Commencer la conversation'}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                            {conversations.length === 0 && (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>
                                    Aucune conversation en cours.
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.chatArea}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                            Sélectionnez une conversation pour commencer à discuter.
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
