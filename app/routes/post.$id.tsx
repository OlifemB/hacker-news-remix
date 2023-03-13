import React from 'react';
import {useLoaderData, NavLink} from "@remix-run/react";
import {LinksFunction, LoaderArgs, defer} from "@remix-run/node";
import {IComment} from "@/types";
import {fetchPostById, fetchPostComments} from "@/utils";
import styles from '@/styles/posts.css'
import PostItem from "@/interface/components/post-item";
import {Button, Container} from '@mui/material';
import CommentModule from "@/interface/modules/comment-module";


export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: styles}];
};


export const loader = async ({params}: LoaderArgs) => {
    const comments = await fetchPostComments(params.id!)
    const post = await fetchPostById(params.id!)
    const loader = (id: IComment) => console.log(id)
    return defer({post, comments, loader})
}


export default function PostId() {
    const data = useLoaderData<typeof loader>();

    return (
        <Container maxWidth="sm">
            <Button>
                <NavLink to={`/posts`}>Back</NavLink>
            </Button>

            <PostItem {...data.post} isFull/>

            {data.comments?.map((comment: IComment) =>
                <CommentModule {...comment} key={`commentId${comment.id}`}/>)
            }
        </Container>
    );
}