// This file runs BEFORE any page loads. If the visitor hasn't entered the
// right username/password, they get a login prompt instead of the site.
//
// IMPORTANT: the real username/password are NOT written here — they live
// in Vercel's dashboard as "Environment Variables" (see README-lock.md).
// That's on purpose: this repo is public on GitHub, so anything typed
// directly into this file would be visible to anyone who opens it.

export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  const validUser = process.env.locked;
  const validPass = process.env.locked;

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded); // "username:password"
      const separatorIndex = decoded.indexOf(':');
      const user = decoded.slice(0, separatorIndex);
      const pass = decoded.slice(separatorIndex + 1);

      if (user === validUser && pass === validPass) {
        return; // correct — let the request through
      }
    }
  }

  // No credentials, or wrong ones — ask the browser to show a login popup
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected"',
    },
  });
}
