import { auth } from "@/auth";

export const proxy = auth((req) => {
  const loggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isTasks = pathname === "/tasks" || pathname.startsWith("/tasks/");

  if (isTasks && !loggedIn) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", pathname);
    return Response.redirect(login);
  }

  if (isAuthPage && loggedIn) {
    return Response.redirect(new URL("/tasks", req.url));
  }

  return undefined;
});

export const config = {
  matcher: ["/tasks", "/tasks/:path*", "/login", "/register"],
};
