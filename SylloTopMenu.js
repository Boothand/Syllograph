function SylloTopMenu(onClickObj)
{
	this.onClickObj = onClickObj;
	this.buttons = []


	this.addButton = function (text)
	{
		var buttonStyleObj = new MenuButtonFillStyle();
		// buttonStyleObj.normalFillStyle = "#888888";
		// buttonStyleObj.highlightedFillStyle = "#AAAAAA";
		// buttonStyleObj.clickedFillStyle = "#CCCCCC";
		// buttonStyleObj.normal();
		
		var button = new Button(ctx, text, 0, 0, this.onClickObj, buttonStyleObj);

		this.buttons.push(button);
	}

	this.addButton("TestButton");
	this.addButton("TestButton 2");
	this.addButton("TestButton 3");


	this.update = function ()
	{
		this.draw();
	}

	this.draw = function ()
	{

		ctx.fillStyle = "#444444";
		ctx.fillRect(0, 0, canvas.width, 50);

		var xPos = 0;
		for (var i = 0; i < this.buttons.length; i++)
		{
			var button = this.buttons[i];

			button.update(xPos, 0);
			xPos += button.sizeX;
		}
	}
}