/**
 * Shared CORS helpers for API endpoints.
 */

/** Build the standard permissive CORS headers, optionally overriding allowed methods. */
export function corsHeaders(methods = 'GET, OPTIONS'): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': methods,
		'Access-Control-Allow-Headers': 'Content-Type'
	};
}

/** Standard 204 response for an OPTIONS preflight request. */
export function preflightResponse(methods = 'GET, OPTIONS'): Response {
	return new Response(null, { status: 204, headers: corsHeaders(methods) });
}
