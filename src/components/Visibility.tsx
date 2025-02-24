import type { AstroClientDirectives } from "astro";
import type { TImagePost } from "../lib/infer-types";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { User } from "better-auth";
import { actions } from "astro:actions";

type ImagePostProps = {
    currentUser: User | null;
    imgData: TImagePost;
} & AstroClientDirectives;

export default function Visibility({ imgData, currentUser }: ImagePostProps) { 

    const [isVisible, setIsVisible] = useState(imgData.visibility);

    const handleToggleVisibility = async () => { 
        if(!currentUser) return;

        // Optimistic update
        const optimisticVisibility = !isVisible;
        setIsVisible(optimisticVisibility);

        try {
            const { data, error } = await actions.toggleVisibility({ imageId: imgData.id!, });

            if(error) {
                // Revert to original visibility if server action fails
                setIsVisible(imgData.visibility);
                console.error(error);
            } else if (!(data instanceof Error) && data.success) {
                // Confirm visibility from server response
                setIsVisible(data.visibility);
            }
        } catch(catchError) {
            // Fallback error handling
            setIsVisible(imgData.visibility);
            console.log(catchError);
        }
    }

    if(!currentUser || currentUser.id !== imgData.userId) {
        return null;
    }

    return (
        <div
            className="flex gap-2 items-center cursor-pointer hover:opacity-85 transition-all pr-4"
            onClick={handleToggleVisibility}
        >
            {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            <p className={`text-sm font-bold`}>{isVisible ? "Public" : "Private"}</p>
        </div>
    )
};