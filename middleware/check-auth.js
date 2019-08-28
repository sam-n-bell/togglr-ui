export default function({
    server,
    store,
    req
}) {
    // If nuxt generate, pass this middleware
    if (server && !req) return;
}