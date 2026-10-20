import { auth } from '@clerk/nextjs/server';
import { loadWorkspaceHistory } from '@/lib/workspace-history.server';
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
export async function GET(request:Request) {
  const {userId}=await auth();
  if(!userId)return json({error:'Sign in to access your history.'},401);
  const cursor=new URL(request.url).searchParams.get('cursor') ?? undefined;
  if(cursor && (cursor.length>4096 || /[\x00-\x1f]/.test(cursor)))return json({error:'Invalid history cursor.'},400);
  try {const page=await loadWorkspaceHistory(userId,cursor);return page.available?json(page):json({error:'History storage is unavailable.'},503);}
  catch{return json({error:'Unable to load history. Please retry.'},500);}
}
