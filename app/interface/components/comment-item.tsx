import {Link} from "@remix-run/react";
import HTMLReactParser from "html-react-parser";
import {Avatar, Box, Button, Card, CardContent, CardHeader} from "@mui/material";
import {IComment} from "@/types";
import {stringAvatar, timeConverter} from "@/utils";


const CommentItem = (comment: IComment) => {
    const date = timeConverter(comment.time);

    if (comment.deleted)
        return (
            <Card>
                <CardContent sx={{padding: '24px'}}>
                    This comment was deleted
                </CardContent>
            </Card>
        )

    return (
        <Card sx={{marginTop: '4px', marginBottom: '4px'}} id={comment.id.toString()}>
            <CardHeader
                avatar={<Avatar {...stringAvatar(comment.by)}/>}
                title={comment.by}
                subheader={date}
            />

            <CardContent sx={{paddingTop: 0}}>
                <Box>{HTMLReactParser(comment.text)}</Box>
                {comment.childs && comment.childs.map((kid) =>
                    (<Button>#{kid.id}</Button>)
                )}
            </CardContent>


        </Card>
    )
};

export default CommentItem