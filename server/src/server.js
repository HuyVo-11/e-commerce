import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.port, () => {
    console.log(`API đang chạy tại http://localhost:${env.port}/api/v1 (${env.nodeEnv})`);
});

const shutdown = (signal) => {
    console.log(`\nNhận ${signal}, đang đóng server...`);

    server.close(() => {
        process.exit(0);
    });

    // Không để process treo mãi nếu có connection chưa đóng
    setTimeout(() => process.exit(1), 10_000).unref();
};

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => shutdown(signal));
});
