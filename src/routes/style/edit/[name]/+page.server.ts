import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { name } = params;

  // get style
  let response = await fetch(`/api/v1/style/${name}`);
  if (!response.ok) {
    throw error(500, 'Failed to fetch styles');
  }
  const style = await response.json();

  // get css
  response = await fetch(`/api/v1/style/css/${name}`);
  if (!response.ok) {
    throw error(500, 'Failed to fetch styles');
  }
  const css = await response.text();

  return { style, css };
}
