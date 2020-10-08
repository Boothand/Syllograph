function BoxCollision(sizeX, sizeY)
{
	this.sizeX = sizeX;
	this.sizeY = sizeY;

	this.overlap = function (x, y, originX, originY)
	{
		var ourX = originX;//this.getXPos();
		var ourY = originY;//this.getYPos();
		// console.log("Our x: " + ourX);


		// console.log("Clicked x: " + x);
		if (x > ourX &&
			x < ourX + this.sizeX &&
			y > ourY &&
			y < ourY + this.sizeY)
		{
			return true;
		}

		return false;
	}
}