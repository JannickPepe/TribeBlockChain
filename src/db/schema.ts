import { desc, relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
			
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const userImage = pgTable("user_image", { 
	id: text("id").primaryKey(),
	userId: text('user_id').notNull().references(()=> user.id),
	url: text('url').notNull(),
	format: text('format').default("jpg"),
	description: text('description'),
	visibility: boolean('visibility').default(false).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const imageLike = pgTable("image_like", {
	id: text("id").primaryKey(),
	userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
	imageId: text('image_id').notNull().references(()=> userImage.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').defaultNow(),
}); 

export const comment = pgTable("comment", {
	id: text("id").primaryKey(),
	userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
	imageId: text('image_id').notNull().references(()=> userImage.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const userRelationship = relations(user, ({ many }) => ({
	images: many(userImage),
	likes: many(imageLike),
	comments: many(comment),
}));

export const userImageRelations = relations(userImage, ({ one, many }) => ({ 
	image: one(user, {
		fields: [userImage.userId],
		references: [user.id],
	}),
	likes: many(imageLike),
	comments: many(comment),
}));

export const imageLikeRelations = relations(imageLike, ({ one }) => ({ 
	image: one(userImage, {
		fields: [imageLike.imageId],
		references: [userImage.id],
	}),
	user: one(user, {
		fields: [imageLike.userId],
		references: [user.id],
	}),
}));

export const commentRelations = relations(comment, ({ one }) => ({ 
	user: one(user, {
		fields: [comment.userId],
		references: [user.id],
	}),
	image: one(userImage, {
		fields: [comment.imageId],
		references: [userImage.id],
	}),
}));