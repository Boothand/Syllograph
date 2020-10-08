function FillStyle()
{
	this.normalFillStyle = 'rgba(200, 200, 200, 1)';
	this.highlightedFillStyle = 'rgba(220, 220, 220, 1)';
	this.clickedFillStyle = 'rgba(230, 230, 230, 1)';

	this.highlight = function ()
	{
		this.fillStyle = this.highlightedFillStyle;
	};

	this.click = function ()
	{
		this.fillStyle = this.clickedFillStyle;
	};

	this.normal = function ()
	{
		this.fillStyle = this.normalFillStyle;
	};

	this.fillStyle = this.normalFillStyle;
}
function MenuButtonFillStyle()
{
	FillStyle.call(this);

	this.normalFillStyle = "#888888";
	this.highlightedFillStyle = "#AAAAAA";
	this.clickedFillStyle = "#CCCCCC";

	this.normal();
}
