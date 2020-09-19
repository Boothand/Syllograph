var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.width = "100%";
canvas.style.height = "100%";

var ctx = canvas.getContext("2d");


var mouse =
{
	x: undefined,
	y: undefined
}

const BUTTON_SELECT = 0;
const BUTTON_PAN = 1;

function getProperMouseCoords(event)
{
	var bounds = canvas.getBoundingClientRect();
	var mouseX = event.pageX - bounds.left - scrollX;
	var mouseY = event.pageY - bounds.top - scrollY;

	mouseX /= bounds.width;
	mouseY /= bounds.height;

	mouseX *= canvas.width;
	mouseY *= canvas.height;

	return [mouseX, mouseY];
}



window.addEventListener('mousemove',
	function (event)
	{
		var mouseCoords = getProperMouseCoords(event);

		mouse.x = mouseCoords[0];
		mouse.y = mouseCoords[1];
	});


window.addEventListener('mousedown',
	function (event)
	{
		if (event.button == BUTTON_SELECT)
		{
			var mouseCoords = getProperMouseCoords(event);

			onSelectClicked(mouseCoords[0], mouseCoords[1]);
		}

		if (event.button == BUTTON_PAN)
		{
			onPanButtonDown();
		}
	});

window.addEventListener('mouseup',
	function (event)
	{
		if (event.button == BUTTON_SELECT)
		{
			var mouseCoords = getProperMouseCoords(event);

			onSelectReleased(mouseCoords[0], mouseCoords[1]);
		}

		if (event.button == BUTTON_PAN)
		{
			onPanButtonUp();
		}
	});

window.addEventListener('resize',
	function ()
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});


function OnClickObject()
{
	this.objects = [];

	this.onclick = function (x, y)
	{
		// In reverse so it checks the objects
		// that are drawn on top first:
		for (var i = this.objects.length - 1; i >= 0; i--)
		{
			var obj = this.objects[i];

			// True = handled event
			// False = unhandled event
			if (obj.onclick(x, y) == true)
			{
				break;
			}
		}
	}

	this.onrelease = function (x, y)
	{
		this.objects.forEach(obj =>
		{
			obj.onrelease(x, y);
		});
	}
}

var onSelectClicked = function (x, y)
{
	onClickObj.onclick(x, y);
}

var onSelectReleased = function (x, y)
{
	onClickObj.onrelease(x, y);
}



var grid = new Grid(ctx, 25);

var onClickObj = new OnClickObject();

var nodes = [];

var nodeWidth = 0;

for (var i = 0; i < 3; i++)
{
	var node = new ArgumentNode((nodeWidth + 100) * i, 300, onClickObj);
	nodeWidth = node.sizeX;

	nodes.push(node);
}





var mouseDeltaX = 0;
var mouseDeltaY = 0;

var lastMouseX = 0;
var lastMouseY = 0;

var holdingPan = false;



function onPanButtonDown()
{
	holdingPan = true;
}

function onPanButtonUp()
{
	holdingPan = false;
}

function update()
{
	requestAnimationFrame(update);

	// Clear all:
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	// Input:
	mouseDeltaX = mouse.x - lastMouseX;
	mouseDeltaY = mouse.y - lastMouseY;

	lastMouseX = mouse.x;
	lastMouseY = mouse.y;



	// Grid:
	// Panning the grid:
	if (holdingPan)
	{
		if (isNaN(mouseDeltaX) == false)
			grid.xOffset += mouseDeltaX;

		if (isNaN(mouseDeltaY) == false)
			grid.yOffset += mouseDeltaY;
	}

	grid.draw();


	// Nodes:
	nodes.forEach(node =>
	{
		node.xOffset = grid.xOffset;
		node.yOffset = grid.yOffset;

		node.update(mouseDeltaX, mouseDeltaY);
	});

	


}

update();

