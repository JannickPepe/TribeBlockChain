import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    socialProviders: {
        github: {
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
        }
    }
});