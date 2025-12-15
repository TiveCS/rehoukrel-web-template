import { z } from "zod";

/**
 * Environment variable schema with validation
 * This ensures all required env vars are present and properly formatted
 */
const envSchema = z.object({
	// Server
	PORT: z.coerce.number().default(8080),
	FRONTEND_URL: z.string().url(),

	// Database
	DATABASE_URL: z.string().min(1),

	// Better Auth
	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.string().url(),

	// OAuth - Google (optional)
	GOOGLE_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),

	// OAuth - GitHub (optional)
	GITHUB_CLIENT_ID: z.string().optional(),
	GITHUB_CLIENT_SECRET: z.string().optional(),

	// MinIO
	MINIO_ENDPOINT: z.string().default("localhost"),
	MINIO_PORT: z.coerce.number().default(9000),
	MINIO_ROOT_USER: z.string().min(1),
	MINIO_ROOT_PASSWORD: z.string().min(1),
	MINIO_USE_SSL: z
		.string()
		.transform((val) => val === "true")
		.default("false"),
	MINIO_BUCKET: z.string().default("uploads"),
});

/**
 * Validated and typed environment variables
 * @throws {Error} If environment variables are invalid or missing
 */
export const env = envSchema.parse(process.env);

/**
 * Type-safe environment variables
 */
export type Env = z.infer<typeof envSchema>;
