function Premise(text, width)
{
	this.width = width;
	this.text = text;
	// this.lineHeight = 25;
	// this.newlines = 0;
	this.wrapText = new WrapText(ctx, text, 25);

	this.getHeight = function ()
	{
		return this.wrapText.lineHeight * this.wrapText.newlines;
	};




	this.update = function (x, y)
	{
		this.draw(x, y);
	};

	this.draw = function (x, y)
	{

		this.wrapText.update(x, y, this.width, true);

		// this.wrapText(ctx, this.text, x, y, this.width, this.lineHeight);
	};
}
