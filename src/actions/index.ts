import { createId } from "@paralleldrive/cuid2";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { db } from "../db";
import { comment, imageLike, userImage } from "../db/schema";

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
};