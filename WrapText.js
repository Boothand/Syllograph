function WrapText(context, text, lineHeight)
{
	this.newlines = 1;
	this.text = text;
	this.context = context;
	this.lineHeight = lineHeight;

	this.font = '16pt Calibri';
	this.fillStyle = '#333';

	this.sizeX = 0;


	this.update = function (x, y, maxWidth, offsetFirstLine)
	{
		var words = this.text.split(' ');
		var line = '';
		this.newlines = 1;

		this.context.font = this.font;
		this.context.fillStyle = this.fillStyle;
		
		y += (offsetFirstLine ? this.lineHeight : 0);


		for (var n = 0; n < words.length; n++)
		{
			var testLine = line + words[n] + ' ';
			var metrics = this.context.measureText(testLine);
			var testWidth = metrics.width;

			this.sizeX = testWidth;


			if (testWidth > maxWidth && n > 0)
			{
				this.context.fillText(line, x, y);
				line = words[n] + ' ';
				y += this.lineHeight;

				this.newlines++;
			}
			else
			{
				line = testLine;
			}
		}


		this.context.fillText(line, x, y);


	}
}