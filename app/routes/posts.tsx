import React from 'react';
import {Box, Container} from '@mui/material';
import Spinner from "@/interface/ui/spinner";
import PostItem from "@/interface/components/post-item";
import ControlPanel from "@/interface/components/control-panel";
import {LinksFunction} from "@remix-run/node";
import styles from "@/styles/posts.css";
import {useLoaderData} from "@remix-run/react";
import {fetchPosts} from "@/utils";
import '@/styles/global.css'
import {Head} from "@/root";


export const loader = async () => {
    return fetchPosts()
}


export default function Posts() {
    const posts = useLoaderData<typeof loader>();


    return (
        <Container maxWidth="sm">
            <ControlPanel>
                {/*<Button onClick={() => post.refetch()}>Refetch news</Button>*/}
            </ControlPanel>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {/*{post.error && 'error'}*/}
                {posts && posts.map(post => <PostItem {...post} key={`newsId-${post.id}`}/>)}
                {!posts && <Spinner block/>}
            </Box>
        </Container>
    )
};

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: styles}];
};
