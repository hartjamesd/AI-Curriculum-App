import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (!key) return Response.json(null);
  const value = await redis.get(key);
  return Response.json(value);
}

export async function POST(request: Request) {
  const { key, value } = await request.json();
  if (!key) return Response.json({ error: 'Missing key' }, { status: 400 });
  await redis.set(key, value);
  return Response.json({ ok: true });
}
