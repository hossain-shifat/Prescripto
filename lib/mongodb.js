import { MongoClient } from 'mongodb';

const DEFAULT_DB_NAME = process.env.MONGODB_DB?.trim() || 'Prescripto';
const REQUIRED_COLLECTIONS = ['users', 'appointments', 'appointment', 'doctors', 'others'];
const OPTIONS = {};

const globalWithMongo = globalThis;

let clientPromise;
let collectionsEnsured = false;

async function getClientPromise() {
    if (clientPromise) {
        return clientPromise;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error(
            'Missing MONGODB_URI. Set it in `.env.local` and restart the server before calling the API.',
        );
    }

    if (process.env.NODE_ENV === 'development') {
        if (!globalWithMongo.__mongoClientPromise) {
            globalWithMongo.__mongoClientPromise = new MongoClient(uri, OPTIONS).connect();
        }
        clientPromise = globalWithMongo.__mongoClientPromise;
    } else {
        clientPromise = new MongoClient(uri, OPTIONS).connect();
    }

    return clientPromise;
}

async function ensureCollections(db) {
    if (collectionsEnsured) {
        return;
    }

    const existingCollections = await db.listCollections({}, { nameOnly: true }).toArray();
    const existingNames = new Set(existingCollections.map((collection) => collection.name));
    const missingCollections = REQUIRED_COLLECTIONS.filter((name) => !existingNames.has(name));

    if (missingCollections.length) {
        await Promise.all(missingCollections.map((name) => db.createCollection(name)));
    }

    collectionsEnsured = true;
}

export async function connectToDatabase() {
    const client = await getClientPromise();
    const db = client.db(DEFAULT_DB_NAME);
    await ensureCollections(db);
    return { client, db };
}
