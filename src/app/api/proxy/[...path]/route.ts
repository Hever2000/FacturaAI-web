import { NextRequest } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://facturaai.onrender.com/v1';

async function handler(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${API_BASE_URL}/${path.join('/')}`;

  console.log(`[PROXY] ${req.method} ${url}`);

  const headers = new Headers(req.headers);
  headers.delete('host');

  const body = req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined;

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  } catch (error) {
    console.error(`[PROXY] Error:`, error);
    return Response.json({ error: 'Proxy request failed' }, { status: 502 });
  }
}

export { handler as GET };
export { handler as POST };
export { handler as PUT };
export { handler as PATCH };
export { handler as DELETE };
