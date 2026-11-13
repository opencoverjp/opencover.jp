import isbn3 from 'isbn3';

/** 1つの本棚に並べられる最大冊数（上流へのサブリクエスト数の上限も兼ねる） */
export const MAX_BOOKS = 20;

/** 本棚 URL の ISBN 列（カンマ区切り）を正規化する：ISBN-13・重複除去・件数制限 */
export function parseShelfIsbns(param: string): string[] {
	return [
		...new Set(
			param
				.split(',')
				.map((s) => isbn3.parse(s.trim()))
				.filter((p) => p?.isValid)
				.map((p) => p!.isbn13 as string)
		)
	].slice(0, MAX_BOOKS);
}
