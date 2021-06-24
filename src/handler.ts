export async function handleRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const duration = searchParams.get('ms_duration');
  const reward = searchParams.get('xlm_reward');
  const quest = searchParams.get('quest');
  const set = searchParams.get('set');
  
  return new Response(`${duration} - ${reward} - ${quest} - ${set}`)
}
