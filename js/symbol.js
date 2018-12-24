function Symbol(character, y){
	this.symbol = String.fromCharCode(character);
	this.color = "#00ff00";
	this.opacity = 1;		//not transparent
	this.y = y;

	this.fade = function(amount){
		this.opacity -= amount;
		if(this.opacity < 0){
			opacity = 0;
			return 1;
		}
		return 0;
	}

}
