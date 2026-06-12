import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
    public client;

    async onModuleInit() {
        this.client = createClient({
            url: process.env.REDIS_URL,
        });

        await this.client.connect();
        console.log('Redis connected');
    }

    async set(key: string, value: string, ttl: number) {
        await this.client.set(key, value, {
            EX: ttl,
        });
    }

    async get(key: string) {
        return this.client.get(key);
    }

    async del(key: string) {
        return this.client.del(key);
    }
}