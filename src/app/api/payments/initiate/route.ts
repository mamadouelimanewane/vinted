import { NextRequest, NextResponse } from 'next/server';
import { processWavePayment, processOrangeMoneyPayment } from '@/lib/payments';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { amount, phoneNumber, productId, method } = body;

        if (!amount || !phoneNumber || !productId || !method) {
            return NextResponse.json(
                { error: 'Paramètres manquants' },
                { status: 400 }
            );
        }

        let result;

        if (method === 'WAVE') {
            result = await processWavePayment({
                amount,
                phoneNumber,
                productId,
                userId: session.user.id!,
                method: 'WAVE'
            });
        } else if (method === 'ORANGE_MONEY') {
            result = await processOrangeMoneyPayment({
                amount,
                phoneNumber,
                productId,
                userId: session.user.id!,
                method: 'ORANGE_MONEY'
            });
        } else {
            return NextResponse.json(
                { error: 'Méthode de paiement invalide' },
                { status: 400 }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('Payment initiation error:', error);
        return NextResponse.json(
            { error: 'Erreur lors du traitement du paiement' },
            { status: 500 }
        );
    }
}
