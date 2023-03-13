import {Container, Typography} from "@mui/material";

export function meta() {
    return {
        title: "Home Page",
        description: "This is the Home Page!",
    };
}

export function loader() {
    throw new Error("Oops!");
}

export default function Index() {
    return (
        <main>

            <Container maxWidth="sm">
                <Typography>Error Page</Typography>
            </Container>
        </main>
    );
}
