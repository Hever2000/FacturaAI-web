import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://facturaai.onrender.com/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');
  const url = `${API_BASE_URL}/${pathStr}`;

  const authHeader = request.headers.get('authorization');

  console.log(`[PROXY] GET ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[PROXY] GET error:`, error);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 502 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');
  const url = `${API_BASE_URL}/${pathStr}`;

  const authHeader = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');

  console.log(`[PROXY] POST ${url}`);

  try {
    let body: BodyInit | null = null;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = formData;
    } else {
      const json = await request.json();
      body = JSON.stringify(json);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
        ...(contentType ? { 'Content-Type': contentType } : {}),
      },
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[PROXY] POST error:`, error);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 502 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');
  const url = `${API_BASE_URL}/${pathStr}`;

  const authHeader = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');

  console.log(`[PROXY] PUT ${url}`);

  try {
    let body: BodyInit | null = null;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = formData;
    } else {
      const json = await request.json();
      body = JSON.stringify(json);
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
        ...(contentType ? { 'Content-Type': contentType } : {}),
      },
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[PROXY] PUT error:`, error);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 502 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');
  const url = `${API_BASE_URL}/${pathStr}`;

  const authHeader = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');

  console.log(`[PROXY] PATCH ${url}`);

  try {
    let body: BodyInit | null = null;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = formData;
    } else {
      const json = await request.json();
      body = JSON.stringify(json);
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
        ...(contentType ? { 'Content-Type': contentType } : {}),
      },
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[PROXY] PATCH error:`, error);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 502 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');
  const url = `${API_BASE_URL}/${pathStr}`;

  const authHeader = request.headers.get('authorization');

  console.log(`[PROXY] DELETE ${url}`);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[PROXY] DELETE error:`, error);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 502 });
  }
}
