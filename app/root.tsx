import type {MetaFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, NavLink, Outlet, Scripts, ScrollRestoration, useCatch,} from "@remix-run/react";
import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import {ClientOnly, useHydrated} from "remix-utils";
import styles from '@/styles/global.css';


export function links() {
    return [{rel: "stylesheet", href: styles}];
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
});


export function Head({title}: { title?: string }) {
    const [renderHead, setRenderHead] = React.useState(false);
    const hydrated = useHydrated();
    useEffect(() => {
        if (!hydrated)
            return;

        if (!renderHead) {
            setRenderHead(true);
            return;
        }
        removeOldHead(document.head);
    }, [renderHead, hydrated]);

    return (
        <>
            {title && <title>{title}</title>}
            <Meta/>
            <Links/>
        </>
    );
}

export function removeOldHead(parent: HTMLElement = document.head) {
    let foundOldHeader = false;
    const nodesToRemove: ChildNode[] = [];
    for (const node of parent.childNodes) {
        if (!foundOldHeader && node.nodeName !== "#comment") {
            continue;
        }
        if (
            foundOldHeader &&
            node.nodeName === "#comment" &&
            node.nodeValue === `end head`
        ) {
            nodesToRemove.push(node);
            break;
        }
        if (
            foundOldHeader ||
            (node.nodeName === "#comment" && node.nodeValue === `start head`)
        ) {
            foundOldHeader = true;
            nodesToRemove.push(node);
        }
    }
    for (const node of nodesToRemove) {
        node.remove();
    }
}


export default function App({title, children,}: { title?: string; children?: React.ReactNode; }) {
    return (
        <>
            <ClientOnly>
                {() => createPortal(<Head title={title}/>, document.head)}
            </ClientOnly>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to="/not-found">Not Found</NavLink>
                <NavLink to="/error">Error Route</NavLink>
            </nav>

            {children ? children : <Outlet/>}

            <ScrollRestoration/>
            <Scripts/>
             <LiveReload />
        </>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    return (
        <App title={caught.statusText}>
            <div>
                <h1>
                    {caught.status} {caught.statusText}
                </h1>
                <h2>This is a catch boundary!</h2>
                <p>
                    <a href="/">Go back home</a>
                </p>
            </div>
        </App>
    );
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <App title="Error">
            <div>
                <h1>{error.message}</h1>
                <pre>{error.stack}</pre>
                <p>
                    <a href="/">Go back home</a>
                </p>
            </div>
        </App>
    );
}