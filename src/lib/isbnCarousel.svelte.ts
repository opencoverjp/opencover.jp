/**
 * Shared play/pause carousel lifecycle used by the ISBN demos.
 * The caller supplies what to do on start, on each tick, and on stop, so the
 * interval bookkeeping and `isPlaying` state live in one place.
 */
type CarouselOptions = {
	length: number;
	interval: number;
	/** Runs once when the carousel (re)starts, before the first tick. */
	onStart?: () => void;
	/** Runs on start (index 0) and on every interval tick with the current index. */
	onIndex?: (index: number) => void;
	/** Runs when the carousel stops. */
	onStop?: () => void;
	/** Whether the carousel begins playing. */
	initialPlaying?: boolean;
};

export function createCarousel({
	length,
	interval,
	onStart,
	onIndex,
	onStop,
	initialPlaying = true
}: CarouselOptions) {
	let isPlaying = $state(initialPlaying);
	let index = 0;
	let intervalId: ReturnType<typeof setInterval> | null = null;

	function start() {
		if (intervalId) clearInterval(intervalId);
		// index は停止・再生をまたいで保持する（元の実装と同じ挙動）
		onStart?.();
		onIndex?.(index);
		intervalId = setInterval(() => {
			index = (index + 1) % length;
			onIndex?.(index);
		}, interval);
	}

	function stop() {
		if (intervalId) clearInterval(intervalId);
		intervalId = null;
		onStop?.();
	}

	function toggle() {
		isPlaying = !isPlaying;
		if (isPlaying) start();
		else stop();
	}

	return {
		get isPlaying() {
			return isPlaying;
		},
		start,
		stop,
		toggle
	};
}
