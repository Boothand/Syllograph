function Button(ctx, text, x, y, onClickObj, fillStyleObj)
{
	this.text = text;
	this.ctx = ctx;

	this.x = x;
	this.y = y;
	this.sizeX = 100;
	this.sizeY = 30;
	this.xOffset = 0;
	this.yOffset = 0;

	this.onClickObj = onClickObj;
	this.fillStyleObj = fillStyleObj;

	this.onClickObj.addObject(this);

	this.collision = new BoxCollision(this.sizeX, this.sizeY);

	this.wrapText = new WrapText(ctx, text, 25);



	this.getXPos = function ()
	{
		return this.x + this.xOffset;
	}

	this.getYPos = function ()
	{
		return this.y + this.yOffset;
	}

	this.onMouseEnter = function ()
	{
		
	}

	this.onMouseExit = function ()
	{

	}

	this.onclick = function (x, y)
	{
		if (this.collision.overlap(x, y, this.x, this.y))
		{
			console.log("Button clicked: " + this.text);
			return true;
		}

		return false;
	}

	this.onrelease = function (x, y)
	{

	}

	this.update = function (x, y)
	{
		this.x = x;
		this.y = y;
		this.draw(x, y);
	}

	this.draw = function (x, y)
	{
		this.ctx.fillStyle = this.fillStyleObj.fillStyle;

		roundRect(
			this.ctx,
			x,
			y,
			this.sizeX,
			this.sizeY,
			2,
			true,
			true);
		
		this.wrapText.update(this.getXPos(), this.getYPos(), this.sizeX, true);

		this.sizeX = this.wrapText.sizeX;

	}
}