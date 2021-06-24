import { screenshot } from './generateImage';

export async function handleRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const duration = searchParams.get('ms_duration');
  const reward = searchParams.get('xlm_reward');
  const quest = searchParams.get('quest');
  const set = searchParams.get('set');

  const base64String = await screenshot({ set, quest, reward });
  return new Response(base64String);
}
