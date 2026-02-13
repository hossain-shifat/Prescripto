import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const VALID_ROLES = new Set(['user', 'doctor']);

export async function POST(request) {
    try {
        const payload = await request.json();
        const { uid, email, fullName, phone, role, photoUrl, accountCreatedAt, emailVerified } = payload ?? {};

        if (!uid || !email) {
            return NextResponse.json({
                error: 'Missing required user identifier or email address.',
            }, {
                status: 400,
            });
        }

        const roleFromPayload = VALID_ROLES.has(role) ? role : undefined;
        const emailVerifiedFlag = typeof emailVerified === 'boolean' ? emailVerified : undefined;
        const now = new Date().toISOString();
        const creationTimestamp = accountCreatedAt ?? now;

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users');

        const updatePayload = {
            email: email.trim(),
            updatedAt: now,
        };

        if (typeof fullName !== 'undefined') {
            updatePayload.fullName = fullName?.trim() ?? '';
        }

        if (typeof phone !== 'undefined') {
            updatePayload.phone = phone?.trim() ?? '';
        }

        if (typeof photoUrl !== 'undefined') {
            updatePayload.photoUrl = photoUrl ?? '';
        }

        if (roleFromPayload) {
            updatePayload.role = roleFromPayload;
        }

        if (emailVerifiedFlag === true) {
            updatePayload.emailVerified = true;
            updatePayload.verifiedAt = now;
        } else if (emailVerifiedFlag === false) {
            updatePayload.emailVerified = false;
        }

        const setOnInsertPayload = {
            uid,
            createdAt: creationTimestamp,
            accountCreatedAt: creationTimestamp,
        };

        if (!roleFromPayload) {
            setOnInsertPayload.role = 'user';
        }

        if (typeof emailVerifiedFlag === 'undefined') {
            setOnInsertPayload.emailVerified = false;
            setOnInsertPayload.verifiedAt = null;
        }

        await usersCollection.updateOne(
            { uid },
            {
                $set: updatePayload,
                $setOnInsert: setOnInsertPayload,
            },
            { upsert: true },
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to persist user profile:', error);
        return NextResponse.json({
            error: 'Unable to save the user profile right now.',
        }, {
            status: 500,
        });
    }
}
