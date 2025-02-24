import { type TImagePost } from "../lib/infer-types";
import type { AstroClientDirectives } from "astro";
import { Heart } from "lucide-react";
import { actions } from "astro:actions";
import { useState } from "react";
import type { User } from "better-auth";

type ImagePostProps = {
    currentUser: User | null;
    imgData: TImagePost;
} & AstroClientDirectives;

function HeartLike({ currentUser, imgData }: ImagePostProps) { 
    const [likes, setLikes] = useState(imgData.likes);

    const handleLike = async () => { 
        if(!currentUser) return;

        const alreadyLiked = likes.some((like) => like.userId === currentUser.id);
        const optimisticLike = alreadyLiked 
        ? likes.filter((like) => like.userId !== currentUser.id) 
        : [...likes, { id: '', createdAt: null, userId: currentUser.id, imageId: imgData.id }];

        setLikes(optimisticLike);

        try {
            const { data, error } = await actions.likeImage({ imageId: imgData.id!, });

            if(error) {
                setLikes(imgData.likes);
                console.error(error);
            } 
            
            if(data?.success) {
                const updatedLikes = alreadyLiked
                    ? likes.filter((like) => like.userId !== currentUser.id)
                    : [...likes, ...(typeof data.success === 'object' ? [data.success] : [])];

                setLikes(updatedLikes);
                console.log("Server update");
            }
        } catch(e) {
            setLikes(imgData.likes);
        };
    };

    return (
        <div className="bg-neutral-800 w-full p-4 rounded-bl-lg rounded-br-lg">
            <div className={`flex gap-2 items-center cursor-pointer hover:opacity-85 transition-all `}>
                <Heart 
                    onClick={handleLike}
                    className={`${likes.some((like) => like.userId === currentUser?.id) ? "fill-red-600 stroke-red-600" : ""}`}
                    size={18}
                />
                <p  className={`${likes.some((like) => like.userId === currentUser?.id) ? "text-red-600" : ""} text-sm font-bold`}>
                    {likes.length}
                </p>
            </div>
        </div>
    );
};

export default HeartLike;