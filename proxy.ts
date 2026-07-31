import { NextResponse, type NextRequest } from "next/server";

// Serves the data.vexloft.com subdomain transparently from the /data route tree,
// so data.vexloft.com/sales === vexloft.com/data/sales. Every other host is untouched.
export function proxy(req: NextRequest): NextResponse {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const isDataSubdomain = host.startsWith("data.");
  if (!isDataSubdomain) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  if (url.pathname === "/data" || url.pathname.startsWith("/data/")) {
    return NextResponse.next();
  }
  url.pathname = url.pathname === "/" ? "/data" : `/data${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any request that targets a static asset (has a file extension).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
