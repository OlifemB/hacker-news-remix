import type {MetaFunction} from "@remix-run/node";


export const meta: MetaFunction = () => ({
    title: "Remix: So great, it's funny!",
    description:
        "Remix jokes app. Learn Remix and laugh at the same time!",
});


export default function IndexRoute() {
    return (
        <main id="content">
            <h1>INDEX</h1>
        </main>
    );
}