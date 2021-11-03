export const checkFinish = (no_of_moves) => {
	let check = document.getElementsByClassName('active')
	if(check.length === 0){
		let game_complete = window.confirm("Game over. Total moves to save princess "+ no_of_moves);
		if (game_complete === true){
			window.location.reload()
		}
	}
}