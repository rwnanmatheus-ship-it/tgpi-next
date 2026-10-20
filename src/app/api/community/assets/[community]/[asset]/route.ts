import { auth } from '@clerk/nextjs/server';
import { CommunityError } from '@/lib/community/model';
import { readCommunityAsset } from '@/lib/community/assets.server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(_request:Request,{params}:{params:Promise<{community:string;asset:string}>}){const headers={'Cache-Control':'private, no-store',Vary:'Cookie, Authorization','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox"};try{const {userId}=await auth(),{community,asset}=await params;const bytes=await readCommunityAsset(userId||'',community,asset);return new Response(new Uint8Array(bytes),{headers:{...headers,'Content-Type':'image/webp'}});}catch(e){return Response.json({error:'Image unavailable.'},{status:e instanceof CommunityError?e.status:503,headers});}}
