function ArgumentNode(x, y, onClickObj, fillStyleObj)
{
	this.x = x;
	this.y = y;
	this.xOffset = 0;
	this.yOffset = 0;

	this.sizeX = 500;
	this.sizeY = 250;

	this.clickedX = 0;
	this.clickedY = 0;

	// this.normalFillStyle = 'rgba(200, 200, 200, 1)';
	// this.highlightedFillStyle = 'rgba(220, 220, 220, 1)';
	// this.clickedFillStyle = 'rgba(230, 230, 230, 1)';

	// this.fillStyle = this.normalFillStyle;
	this.fillStyleObj = fillStyleObj;

	this.collision = new BoxCollision(this.sizeX, this.sizeY);

	this.innerPadding = 10;
	this.bottomPadding = 60;

	this.premises = [];

	this.premises.push(new Premise("P1: This is a test premise and very long and wraps onto a new line and so on and wraps onto a new line and so on and wraps onto a new line and so on", this.sizeX - this.innerPadding));
	this.premises.push(new Premise("P2: This is a second test premise", this.sizeX - this.innerPadding));
	this.premises.push(new Premise("P3: This is a third test premise", this.sizeX - this.innerPadding));

	// Register to onclick object:
	onClickObj.addObject(this);



	this.onclick = function (x, y)
	{
		if (this.collision.overlap(x, y, this.getXPos(), this.getYPos()))
		{
			// this.fillStyle = this.clickedFillStyle;

			return true;
		}

		return false;
	}

	this.onrelease = function (x, y)
	{
		if (this.collision.overlap(x, y, this.getXPos(), this.getYPos()))
		{
			// this.fillStyle = this.highlightedFillStyle;

			return true;
		}

		return false;
	}


	this.onMouseEnter = function ()
	{
		// this.fillStyle = this.highlightedFillStyle;
	}

	this.onMouseExit = function ()
	{
		// this.fillStyle = this.normalFillStyle;
	}


	this.getXPos = function () { return this.x + this.xOffset; }
	this.getYPos = function () { return this.y + this.yOffset; }

	this.update = function (mouseDeltaX, mouseDeltaY)
	{
		this.draw(mouseDeltaX, mouseDeltaY);
	}

	this.draw = function (mouseDeltaX, mouseDeltaY)
	{
		ctx.fillStyle = this.fillStyleObj.fillStyle;//this.fillStyle;

		roundRect(
			ctx,
			this.x + this.xOffset,
			this.y + this.yOffset,
			this.sizeX,
			this.sizeY,
			10,
			true,
			true);
		

		var totalHeightPremises = 0;

		if (this.premises.length > 0)
		{
			var xPos = this.getXPos() + this.innerPadding * 0.5;
			var yPos = this.getYPos();// + this.premises[0].lineHeight;

			this.premises.forEach(premise =>
			{
				premise.update(xPos, yPos);

				totalHeightPremises += premise.getHeight();

				yPos += premise.getHeight();
			});

		}

		this.sizeY = totalHeightPremises + this.bottomPadding;

		this.collision.sizeY = this.sizeY;
	};
}
