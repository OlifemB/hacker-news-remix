import React from 'react';
import {IComment} from "@/types";
import CommentItem from "@/interface/components/comment-item";
import {Box, Button} from "@mui/material";


const CommentModule: React.FC<IComment> = (comment) => {

    const renderSubNodes = (comments: IComment[]) => {
        return comments.map(comment => (
                <Box sx={{
                    paddingLeft: '24px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                     key={`itemId${comment.id}`}
                >
                    <CommentItem {...comment}/>
                    {comment.childs && renderSubNodes(comment.childs)}
                </Box>
            )
        )
    }

    return (
        <Box sx={{gap: '4px', margin: 0, padding: 0}}>
            <CommentItem {...comment}/>

            {comment.kids &&
                <Button
                    sx={{color: '#1976d2', cursor: 'pointer',}}
                    onClick={() => console.log('click')}
                >
                    Show comments
                </Button>
            }
        </Box>
    );
};

export default CommentModule;