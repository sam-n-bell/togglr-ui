export default function(context) {
    if (context.store.getters["authentication/isUserAuthenticated"]) {
        return context.redirect("/");
    }
}