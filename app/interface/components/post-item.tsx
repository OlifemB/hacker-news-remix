import React from "react";
import {LinksFunction, redirect} from "@remix-run/node";
import HTMLReactParser from "html-react-parser";
import {Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {stringAvatar, timeConverter} from "@/utils";
import {IPost} from "@/types";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import StarIcon from '@mui/icons-material/Star';
import {Link} from "@remix-run/react";
import styles from '@/styles/posts.css'


export default function PostItem(post: IPost) {
    const date = timeConverter(post.time);

    return (
        <Card>
            <CardHeader
                avatar={<Avatar {...stringAvatar(post.by)}/>}
                title={post.by}
                subheader={date}
            />

            <CardContent sx={{paddingTop: 0}}>
                <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                </Typography>

                {post.isFull && post.text &&
                    <Typography gutterBottom variant="body1">{HTMLReactParser(post.text)}</Typography>
                }

                {/*{post.url && <Link to={post.url} > {post.url} </Link>}*/}
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <IconButton aria-label="score">
                        <StarIcon sx={{width: '1.5rem'}}/>
                        <Typography variant='body1'>
                            {post.score || 0}
                        </Typography>
                    </IconButton>

                    <IconButton aria-label="comments">
                        <InsertCommentIcon sx={{width: '1.5rem'}}/>
                        <Typography variant='body1'>
                            {post.kids?.length || 0}
                        </Typography>
                    </IconButton>

                </Box>

                {!post.isFull &&
                    <Link
                        to={`/post/${post.id}`}
                        prefetch="intent"
                    >
                        View more
                    </Link>}
            </CardActions>
        </Card>
    );
};

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: styles}];
};