function Premise(text, width)
{
	this.width = width;
	this.text = text;
	this.lineHeight = 25;

	this.newlines = 0;

	this.getHeight = function ()
	{
		return this.lineHeight * this.newlines;
	}


	this.wrapText = function (context, text, x, y, maxWidth, lineHeight)
	{
		var words = text.split(' ');
		var line = '';
		this.newlines = 1;

		for (var n = 0; n < words.length; n++)
		{
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			
			if (testWidth > maxWidth && n > 0)
			{
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;

				this.newlines++;
			}
			else
			{
				line = testLine;
			}
		}

		context.fillText(line, x, y);


	}

	this.update = function (x, y)
	{
		this.draw(x, y);
	}

	this.draw = function (x, y)
	{
		ctx.font = '16pt Calibri';
		ctx.fillStyle = '#333';

		this.wrapText(ctx, this.text, x, y, this.width, this.lineHeight);
	}
}




function ArgumentNode(x, y, onClickObj)
{
	this.x = x;
	this.y = y;
	this.xOffset = 0;
	this.yOffset = 0;

	this.sizeX = 500;
	this.sizeY = 250;

	this.clickedX = 0;
	this.clickedY = 0;

	this.fillStyle = 'rgba(200, 200, 200, 1)';
	this.originalFillStyle = this.fillStyle;

	this.boxCollision = new BoxCollision(this.sizeX, this.sizeY);

	this.dragged = false;

	this.innerPadding = 10;
	this.bottomPadding = 60;

	this.premises = [];

	this.premises.push(new Premise("P1: This is a test premise and very long and wraps onto a new line and so on and wraps onto a new line and so on and wraps onto a new line and so on", this.sizeX - this.innerPadding));
	this.premises.push(new Premise("P2: This is a second test premise", this.sizeX - this.innerPadding));
	this.premises.push(new Premise("P3: This is a third test premise", this.sizeX - this.innerPadding));

	// Register to onclick object:
	onClickObj.objects.push(this);



	this.onclick = function (x, y)
	{
		if (this.boxCollision.validClick(x, y, this.getXPos(), this.getYPos()))
		{
			this.dragged = true;
			this.fillStyle = 'rgba(220, 220, 220, 1)';

			return true;
		}

		return false;
	}

	this.onrelease = function (x, y)
	{
		this.dragged = false;
		this.fillStyle = this.originalFillStyle;
	}



	this.getXPos = function () { return this.x + this.xOffset; }
	this.getYPos = function () { return this.y + this.yOffset; }

	this.update = function (mouseDeltaX, mouseDeltaY)
	{
		if (this.dragged)
		{
			this.x += mouseDeltaX;
			this.y += mouseDeltaY;
		}
		
		this.draw(mouseDeltaX, mouseDeltaY);
	}

	this.draw = function (mouseDeltaX, mouseDeltaY)
	{
		ctx.fillStyle = this.fillStyle;

		ctx.fillRect(
			this.x + this.xOffset,
			this.y + this.yOffset,
			this.sizeX,
			this.sizeY);
		

		var totalHeightPremises = 0;

		if (this.premises.length > 0)
		{
			var xPos = this.getXPos() + this.innerPadding * 0.5;
			var yPos = this.getYPos() + this.premises[0].lineHeight;

			this.premises.forEach(premise =>
			{
				premise.update(xPos, yPos);

				totalHeightPremises += premise.getHeight();

				yPos += premise.getHeight();
			});

		}

		this.sizeY = totalHeightPremises + this.bottomPadding;

		this.boxCollision.sizeY = this.sizeY;
	};
}
