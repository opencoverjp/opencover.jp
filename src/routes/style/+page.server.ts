import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await fetch('/api/v1/style');
  if (!response.ok) {
    throw error(500, 'Failed to fetch styles');
  }
  const styles = await response.json();
  return { styles };
}
