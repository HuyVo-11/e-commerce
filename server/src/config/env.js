import 'dotenv/config';

const toNumber = (value, fallback) => {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : fallback;
}

const port = toNumber(process.env.PORT, 4000);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`PORT không hợp lệ: ${process.env.PORT}`);
}

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port,
    corsOrigin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean),
    dbPath: process.env.DB_PATH ?? './data/shop.db',
};
