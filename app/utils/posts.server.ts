import {BASE_URL} from "@/config";
import {IComment, IPost} from "@/types";

export const fetchPosts = async () => {
    return await fetch(`${BASE_URL}/newstories.json`)
        .then(r => r.json())
        .then(async (ids: number[]) =>
            await Promise.all(ids.slice(0, 100).map((id: number) =>
                fetch(`${BASE_URL}/item/${id}.json`)
                    .then(r => r.json())
                    .catch(e => {
                        throw new Error(e)
                    })))
                .then(res => res.sort((a: IPost, b: IPost) => a.time + b.time))
        )
        .catch(e => {
            throw new Error(e)
        })
}

export const fetchPostById = async (id: string) => {
    return await fetch(`${BASE_URL}/item/${id}.json`)
        .then(r => r.json())
}


export const fetchPostComments = async (id: string) => {
    return await fetch(`${BASE_URL}/item/${id}.json`)
        .then(r => r.json())
        .then(async (post: IPost) =>
                post.kids && await Promise.all(post.kids.map((id: number) =>
                    fetch(`${BASE_URL}/item/${id}.json`)
                        .then(r => r.json())
                        .catch(e => {
                            throw new Error(e)
                        })
                ))
        )
}


