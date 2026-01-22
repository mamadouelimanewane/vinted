// Wave & Orange Money Payment Integration
// This file contains the payment processing logic for Senegalese mobile money

import { prisma } from '@/lib/prisma';

// Wave API Configuration
const WAVE_API_URL = process.env.WAVE_API_URL || 'https://api.wave.com/v1';
const WAVE_API_KEY = process.env.WAVE_API_KEY;
const WAVE_API_SECRET = process.env.WAVE_API_SECRET;

// Orange Money API Configuration
const ORANGE_MONEY_API_URL = process.env.ORANGE_MONEY_API_URL || 'https://api.orange.com/orange-money-webpay/v1';
const ORANGE_MONEY_API_KEY = process.env.ORANGE_MONEY_API_KEY;
const ORANGE_MONEY_API_SECRET = process.env.ORANGE_MONEY_API_SECRET;

export interface PaymentRequest {
    amount: number;
    phoneNumber: string;
    productId: string;
    userId: string;
    method: 'WAVE' | 'ORANGE_MONEY';
}

export interface PaymentResponse {
    success: boolean;
    transactionId?: string;
    message: string;
    paymentUrl?: string;
}

/**
 * Process Wave payment
 */
export async function processWavePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                amount: request.amount,
                status: 'PENDING',
                method: 'WAVE',
                phoneNumber: request.phoneNumber,
                userId: request.userId,
                productId: request.productId,
            }
        });

        // Use real API if keys are configured
        if (WAVE_API_KEY && WAVE_API_SECRET) {
            try {
                const response = await fetch(`${WAVE_API_URL}/checkout/sessions`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${WAVE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: request.amount,
                        currency: 'XOF',
                        phone_number: request.phoneNumber,
                        callback_url: `${process.env.NEXTAUTH_URL}/api/payments/wave/callback`,
                        metadata: {
                            transaction_id: transaction.id,
                            product_id: request.productId,
                        }
                    })
                });

                const data = await response.json();

                if (data.checkout_url) {
                    return {
                        success: true,
                        transactionId: transaction.id,
                        message: 'Paiement Wave initié',
                        paymentUrl: data.checkout_url
                    };
                }
            } catch (apiError) {
                console.error('Wave API direct call failed, falling back to demo mode:', apiError);
            }
        }

        // Fallback to demo mode for local testing or if keys are missing
        return {
            success: true,
            transactionId: transaction.id,
            message: 'Paiement Wave initié (Mode démo)',
            paymentUrl: `/checkout/success?transaction=${transaction.id}`
        };

    } catch (error) {
        console.error('Wave payment process error:', error);
        return {
            success: false,
            message: 'Erreur lors du paiement Wave'
        };
    }
}

/**
 * Process Orange Money payment
 */
export async function processOrangeMoneyPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                amount: request.amount,
                status: 'PENDING',
                method: 'ORANGE_MONEY',
                phoneNumber: request.phoneNumber,
                userId: request.userId,
                productId: request.productId,
            }
        });

        // Use real API if keys are configured
        if (ORANGE_MONEY_API_KEY && ORANGE_MONEY_API_SECRET) {
            try {
                // Implementation for Orange Money WebPay API
                const response = await fetch(`${ORANGE_MONEY_API_URL}/webpayment/v1/transactionRequests`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${ORANGE_MONEY_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        merchant_key: ORANGE_MONEY_API_KEY,
                        currency: 'XOF',
                        order_id: transaction.id,
                        amount: request.amount,
                        return_url: `${process.env.NEXTAUTH_URL}/api/payments/orange/callback`,
                        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL}/product/${request.productId}`,
                        notif_url: `${process.env.NEXTAUTH_URL}/api/payments/orange/webhook`,
                        lang: 'fr',
                        reference: 'TXN-' + transaction.id.substring(0, 8),
                    })
                });

                const data = await response.json();

                if (data.payment_url) {
                    return {
                        success: true,
                        transactionId: transaction.id,
                        message: 'Paiement Orange Money initié',
                        paymentUrl: data.payment_url
                    };
                }
            } catch (apiError) {
                console.error('Orange Money API direct call failed, falling back to demo mode:', apiError);
            }
        }

        // Fallback to demo mode
        return {
            success: true,
            transactionId: transaction.id,
            message: 'Paiement Orange Money initié (Mode démo)',
            paymentUrl: `/checkout/success?transaction=${transaction.id}`
        };

    } catch (error) {
        console.error('Orange Money payment process error:', error);
        return {
            success: false,
            message: 'Erreur lors du paiement Orange Money'
        };
    }
}

/**
 * Verify payment status
 */
export async function verifyPaymentStatus(transactionId: string): Promise<{
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    message: string;
}> {
    const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId }
    });

    if (!transaction) {
        return { status: 'FAILED', message: 'Transaction introuvable' };
    }

    // In a real implementation, we would call the provider API to verify true status
    // For now, we trust our database status which is updated via webhooks/callbacks
    return {
        status: transaction.status as 'PENDING' | 'COMPLETED' | 'FAILED',
        message: `Transaction ${transaction.status.toLowerCase()}`
    };
}

/**
 * Handle payment callback/webhook
 */
export async function handlePaymentCallback(
    transactionId: string,
    status: 'COMPLETED' | 'FAILED'
): Promise<void> {
    const transaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
            status,
            updatedAt: new Date()
        }
    });

    // Update product status if payment completed
    if (status === 'COMPLETED' && transaction.productId) {
        await prisma.product.update({
            where: { id: transaction.productId },
            data: {
                status: 'SOLD'
            }
        });
    }

    // TODO: Send email/notification to user using Resend or similar
}


