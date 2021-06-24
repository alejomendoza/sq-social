import { fabric } from 'fabric';

const canvas = () => {
  const canvas = new fabric.StaticCanvas(null, {
    width: 600,
    height: 315,
    renderOnAddRemove: false,
  });

  var text = new fabric.Text('Hello world', {
    left: 100,
    top: 100,
    fill: '#FFF',
  });

  canvas.add(text);
  canvas.renderAll();

  const image = canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
  return image;
};

export async function handleRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const duration = searchParams.get('ms_duration');
  const reward = searchParams.get('xlm_reward');
  const quest = searchParams.get('quest');
  const set = searchParams.get('set');

  const base64String = await canvas();
  return new Response(base64String);
}
