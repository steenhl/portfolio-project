const useMyCallback =
	((n) => {
		console.log("useCallback " + n);
		return n;
	},
	[]);

export default useMyCallback;
