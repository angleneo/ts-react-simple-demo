const setRouter = (state = "", action) => {
	switch (action.type) {
		case 'GOTO_VIEW':
			return {
				Index: action.Index
			};
		default :
			return state;
	}
}

export default setRouter;