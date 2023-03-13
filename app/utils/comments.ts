import {IComment} from "@/types";
import {BASE_URL} from "@/config";

export const fetchCommentsKids = async (comment: IComment | null) => {
    if (!comment)
        return

    async function traverse(comment: IComment): Promise<IComment> {
        if (comment.kids) {
            const childPosts = await Promise.all(comment.kids.map(async (kid) => {
                return await fetch(`${BASE_URL}/item/${kid}.json`)
                    .then(async (r) => {
                        const post = await r.json() as IComment;

                        return traverse(post);
                    }) as IComment;
            }));

            return {
                ...comment,
                childs: childPosts
            }
        }

        return comment;
    }

    return traverse(comment)
}