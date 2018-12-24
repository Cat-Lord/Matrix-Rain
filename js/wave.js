let colors = ["#ffffff", "#e6ffe6", "#b3ffb3", "#00ff00"];

function Wave(row, char_size){
	this.symbols = new Array();
	this.symbols_limit = Math.floor(Math.random()*40 + 7);
	this.x = row;
	this.y = 0;
	this.shift = char_size;
	this.head = 4;

	this.outOfBounds = function(height){
		if(this.symbols.length > 1){
			//if the last element of the symbol array is out of window
			if(this.symbols[0].y > height)
				return true;
			else return false;
		}
		return false;
	}

	this.update = function(){
		if(this.symbols.length > this.head*2 && Math.random() > 0.2){
			let pos = Math.floor(Math.random()*(this.symbols.length));
			let old_symbol = this.symbols[pos];
			this.symbols[pos] = copy_symbol(old_symbol); 
		}

		this.symbols.push(new Symbol(20102 + Math.floor(Math.random()*40), this.y));


		for(let i = this.symbols.length-1, j = 0; i > 0 && j < colors.length; j++, i--){
			this.symbols[i].color = colors[j];
		}	
	
		//if we reached maximum amount of characters, start fading the tail
		if(this.symbols.length > this.symbols_limit){
			let i = 0; 
			let limit = this.head;
			let opc = 0.3;
			for(i; i < limit; i++){
				if(this.symbols[i].fade(opc) == 1)
					this.symbols.shift();
				opc -= 0.1;
				if(opc < 0.1)
					opc = 0.1;
			}
		}
		this.y += this.shift;
	}
	
	this.show = function(ctx){
		//console.log("Drawing on: [" + this.x + ", " + this.y + "]");
		for(let i = 0; i < this.symbols.length; i++){
			ctx.fillStyle = this.symbols[i].color;
			ctx.globalAlpha = this.symbols[i].opacity;

			ctx.fillText(this.symbols[i].symbol, this.x, this.symbols[i].y);
		}
		ctx.globalAlpha = 1;
	}
}

function copy_symbol(old){
	let character      =  20102 + Math.floor(Math.random()*40);
	let new_symbol     = new Symbol(character, old.y);
	new_symbol.opacity = old.opacity;
	new_symbol.color   = old.color;
	return new_symbol;
}
