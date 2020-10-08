function OnClickObjectMember(object)
{
	this.object = object;
	this.isHovered = false;
}



function OnClickObject()
{
	this.objects = [];

	this.dragging = false;
	this.draggedNode = null;

	this.addObject = function (obj)
	{
		var newObj = new OnClickObjectMember(obj);
		this.objects.push(newObj);

	}

	this.onMouseMove = function (x, y, mouseDeltaX, mouseDeltaY)
	{
		if (this.dragging)
		{
			if (this.draggedNode != null)
			{
				this.draggedNode.x += mouseDeltaX;
				this.draggedNode.y += mouseDeltaY;
			}

			return;
		}

		var overlapped = false;

		for (var i = this.objects.length - 1; i >= 0; i--)
		{
			var outerObject = this.objects[i];
			var innerObject = this.objects[i].object;

			if (overlapped == false &&
				innerObject.collision.overlap(x, y, innerObject.getXPos(), innerObject.getYPos()))
			{
				overlapped = true;

				if (outerObject.isHovered == false)
				{
					outerObject.isHovered = true;
					innerObject.fillStyleObj.highlight(); 
					innerObject.onMouseEnter();
				}
			}
			else
			{
				if (outerObject.isHovered)
				{
					outerObject.isHovered = false;
					innerObject.fillStyleObj.normal();
					innerObject.onMouseExit();
				}
			}
		}
	}

	this.onclick = function (x, y)
	{
		// In reverse so it checks the objects
		// that are drawn on top first:
		for (var i = this.objects.length - 1; i >= 0; i--)
		{
			var obj = this.objects[i].object;

			// True = handled event
			// False = unhandled event
			if (obj.onclick(x, y) == true)
			{
				this.dragging = true;
				this.draggedNode = obj;
				obj.fillStyleObj.click();

				return;
			}
		}

		this.draggedNode = null;

	};

	this.onrelease = function (x, y)
	{
		// In reverse so it checks the objects
		// that are drawn on top first:
		for (var i = this.objects.length - 1; i >= 0; i--)
		{
			var obj = this.objects[i].object;

			if (obj == this.draggedNode)
			{
				obj.fillStyleObj.highlight();
				obj.onrelease(x, y);
				break;
			}
		}

		this.dragging = false;
	};
}
