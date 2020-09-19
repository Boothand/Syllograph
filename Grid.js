function Grid(ctx, spacing)
{
	this.ctx = ctx;
	this.spacing = spacing;

	this.xOffset = 0;
	this.yOffset = 0;

	this.drawGrid = function (gridSpacing)
	{
		this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';

		for (var xPos = 0; xPos < window.innerWidth; xPos += gridSpacing)
		{
			this.ctx.beginPath();

			var offset = this.xOffset % gridSpacing;

			this.ctx.moveTo(xPos + offset, 0);
			this.ctx.lineTo(xPos + offset, window.innerHeight);


			this.ctx.stroke();
		}

		for (var yPos = 0; yPos < window.innerHeight; yPos += gridSpacing)
		{
			this.ctx.beginPath();

			var offset = this.yOffset % gridSpacing;

			this.ctx.moveTo(0, yPos + offset);
			this.ctx.lineTo(window.innerWidth, yPos + offset);


			this.ctx.stroke();
		}
	}

	this.draw = function ()
	{
		this.drawGrid(this.spacing);
		this.drawGrid(this.spacing * 4);
	}
}