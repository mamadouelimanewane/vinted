import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { sendMessage } from '@/app/actions/messages';
import styles from '../messages.module.css';

export const dynamic = 'force-dynamic';

export default async function ConversationPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Mock current user
    const currentUser = await prisma.user.findFirst();
    if (!currentUser) return <div className="container">Connectez-vous.</div>;

    // @ts-ignore
    const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
            users: { where: { NOT: { id: currentUser.id } } },
            messages: { orderBy: { createdAt: 'asc' } }
        }
    });

    if (!conversation) return <div className="container">Conversation introuvable.</div>;

    const otherUser = conversation.users[0];

    // @ts-ignore
    const conversations = await prisma.conversation.findMany({
        where: { users: { some: { id: currentUser.id } } },
        include: {
            users: { where: { NOT: { id: currentUser.id } } },
            messages: { orderBy: { createdAt: 'desc' }, take: 1 }
        }
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
                                const u = conv.users[0];
                                const lastMsg = conv.messages[0];
                                return (
                                    <Link
                                        href={`/messages/${conv.id}`}
                                        key={conv.id}
                                        className={`${styles.conversationItem} ${conv.id === id ? styles.active : ''}`}
                                    >
                                        <img src={u?.image || ''} alt={u?.name || ''} className={styles.userAvatar} />
                                        <div className={styles.convInfo}>
                                            <h4>{u?.name}</h4>
                                            <p className={styles.lastMsg}>{lastMsg?.text || 'Commencer la conversation'}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.chatArea}>
                        <div className={styles.chatHeader}>
                            <img src={otherUser?.image || ''} alt={otherUser?.name || ''} className={styles.userAvatar} style={{ width: 40, height: 40 }} />
                            <h3>{otherUser?.name}</h3>
                        </div>

                        <div className={styles.messageList}>
                            {conversation.messages.map((msg: any) => (
                                <div
                                    key={msg.id}
                                    className={`${styles.message} ${msg.senderId === currentUser.id ? styles.sent : styles.received}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <form action={async (formData: FormData) => {
                            'use server';
                            const text = formData.get('message') as string;
                            if (text) {
                                await sendMessage(id, currentUser.id, text);
                            }
                        }} className={styles.chatInput}>
                            <input
                                name="message"
                                type="text"
                                placeholder="Écrivez votre message..."
                                className={styles.input}
                                required
                            />
                            <button type="submit" className={styles.sendBtn}>
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
