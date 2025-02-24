import { createId } from "@paralleldrive/cuid2";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { db } from "../db";
import { comment, imageLike, userImage } from "../db/schema";
import { and, eq } from "drizzle-orm";


export const server = {
    addImage: defineAction({
        input: z.object({
            publicId: z.string(),
            format: z.string().optional(),
        }),
        handler: async ({ publicId, format }, context) => {
            const currentUser = context.locals.user?.id;

            if(!currentUser) {
                throw new Error("No user found");
            }
            try {
                const newImage = await db
                .insert(userImage)
                .values({
                    url: publicId,
                    id: createId(),
                    format,
                    userId: currentUser,
                })
                .returning();
                return {success: true, image: newImage[0].url};
            } catch (e) {
                return {success: false, error: "Failed to save image"};
            }
        }
    }),
    likeImage: defineAction({
        input: z.object({
            imageId: z.string(),
        }),
        handler: async ({ imageId }, context) => {
            const currentUser = context.locals.user?.id;
            if(!currentUser) {
                // Return a JSON error instead of throwing
                return { success: false, error: "No user found" };
            }

            try {
                const existingLike = await db.query.imageLike.findFirst({
                    where: and(
                        eq(imageLike.userId, currentUser),
                        eq(imageLike.imageId, imageId),
                    ),
                });
                
                if(existingLike) {
                    // Remove the Like
                    const deleteLike = await db
                        .delete(imageLike)
                        .where(
                            and(
                                eq(imageLike.userId, currentUser),
                                eq(imageLike.imageId, imageId),
                            ),
                        )
                        .returning();
                    return { success: deleteLike[0] };
                } else {
                    // Add the Like
                    const newLike = await db
                        .insert(imageLike)
                        .values({
                            id: createId(),
                            userId: currentUser,
                            imageId,
                        })
                        .returning();
                    return { success: newLike[0] };
                }
            } catch (error) {
                console.error("Like action error:", error)
                // Return a JSON error instead of throwing
                return { success: false, error: "Could not add like" };
            }
        }
    }),
};