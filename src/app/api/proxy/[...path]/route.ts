export const runtime = 'nodejs';

async function handler(req: Request, { params }: { params: { path: string[] } }) {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!backendUrl) {
    return new Response('Missing BACKEND URL', { status: 500 });
  }

  const url = `${backendUrl}/${params.path.join('/')}`;

  console.log(`[PROXY] ${req.method} → ${url}`);

  try {
    const headers = new Headers(req.headers);

    headers.delete('host');
    headers.delete('content-length');

    const res = await fetch(url, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    } as RequestInit);

    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  } catch (error) {
    console.error('[PROXY ERROR]', error);

    return new Response(JSON.stringify({ error: 'Proxy failed', details: String(error) }), {
      status: 500,
    });
  }
}

export { handler as GET };
export { handler as POST };
export { handler as PUT };
export { handler as PATCH };
export { handler as DELETE };
export { handler as OPTIONS };
