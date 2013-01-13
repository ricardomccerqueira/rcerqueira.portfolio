/*!
 * forkit.js 0.2
 * http://lab.hakim.se/forkit-js
 * MIT licensed
 *
 * Created by Hakim El Hattab, http://hakim.se
 

 var forkitjs = {
	STATE_CLOSED:0,
	STATE_DETACHED:1,
	STATE_OPENED:2,

	TAG_HEIGHT:30,
	TAG_WIDTH:100,
	MAX_STRAIN:30,

	DRAG_THRESHOLD:0.36,

	VENDORS:[ 'Webkit', 'Moz', 'O', 'ms' ],

	dom:{
		ribbon: null,
		ribbonString: null,
		ribbonTag: null,
		curtain: null,
		closeButton: null
	},

	state:forkitjs.STATE_CLOSED,

	// Ribbon text, correlates to states
	closedText:'',
	detachedText:'',

	friction:1.04,
	gravity:1.5,

	// Resting position of the ribbon when curtain is closed
	closedX:forkitjs.TAG_WIDTH * 0.4,
	closedY:-forkitjs.TAG_HEIGHT * 0.5,

	// Resting position of the ribbon when curtain is opened
	openedX:forkitjs.TAG_WIDTH * 0.4,
	openedY:forkitjs.TAG_HEIGHT,

	velocity:0,
	rotation:45,

	curtainTargetY:0,
	curtainCurrentY:0,

	dragging:false,
	dragTime:0,
	dragY:0,

	anchorA:new Point( forkitjs.closedX, forkitjs.closedY ),
	anchorB:new Point( forkitjs.closedX, forkitjs.closedY ),

	mouse:new Point(),

	initialize:function(){
		forkitjs.dom.ribbon = document.querySelector( '.forkit' );
		forkitjs.dom.curtain = document.querySelector( '.forkit-curtain' );
		forkitjs.dom.closeButton = document.querySelector( '.forkit-curtain .close-button' );

		if( forkitjs.dom.ribbon ) {
			forkitjs.closedText = forkitjs.dom.ribbon.getAttribute( 'data-text' ) || '';
			forkitjs.detachedText = forkitjs.dom.ribbon.getAttribute( 'data-text-detached' ) || forkitjs.closedText;

			forkitjs.dom.ribbon.innerHTML = '<span class="string"></span><span class="tag">' + forkitjs.closedText + '</span>';
			forkitjs.dom.ribbonString = forkitjs.dom.ribbon.querySelector( '.string' );
			forkitjs.dom.ribbonTag = forkitjs.dom.ribbon.querySelector( '.tag' );

			forkitjs.dom.ribbon.addEventListener( 'click', forkitjs.onRibbonClick, false );
			document.addEventListener( 'mousemove', forkitjs.onMouseMove, false );
			document.addEventListener( 'mousedown', forkitjs.onMouseDown, false );
			document.addEventListener( 'mouseup', forkitjs.onMouseUp, false );
			document.addEventListener( 'touchstart', forkitjs.onTouchStart, false);
			document.addEventListener( 'touchmove', forkitjs.onTouchMove, false);
			document.addEventListener( 'touchend', forkitjs.onTouchEnd, false);
			window.addEventListener( 'resize', forkitjs.layout, false );

			if( forkitjs.dom.closeButton ) {
				forkitjs.dom.closeButton.addEventListener( 'click', forkitjs.onCloseClick, false );
			}

			forkitjs.animate();
		}
	},

	onMouseDown:function( event ) {
		if( forkitjs.dom.curtain && forkitjs.state === forkitjs.STATE_DETACHED ) {
			event.preventDefault();
			forkitjs.dragY = event.clientY;
			forkitjs.dragTime = Date.now();
			forkitjs.dragging = true;

		}
	},

	onMouseMove:function( event ) {
		forkitjs.mouse.x = event.clientX;
		forkitjs.mouse.y = event.clientY;
	},

	onMouseUp:function( event ) {
		if( forkitjs.state !== forkitjs.STATE_OPENED ) {
			forkitjs.state = forkitjs.STATE_CLOSED;
			forkitjs.dragging = false;
		}
	},

	onTouchStart:function( event ) {
		if( forkitjs.dom.curtain && state === forkitjs.TATE_DETACHED ) {
			event.preventDefault();
			var touch = event.touches[0];
			forkitjs.dragY = touch.clientY;
			forkitjs.dragTime = Date.now();
			forkitjs.dragging = true;
		}
	},

	onTouchMove:function( event ) {
		var touch = event.touches[0];
		forkitjs.mouse.x = touch.pageX;
		forkitjs.mouse.y = touch.pageY;
	},

	onTouchEnd:function( event ) {
		if( forkitjs.state !== forkitjs.STATE_OPENED ) {
			forkitjs.state = forkitjs.STATE_CLOSED;
			forkitjs.dragging = false;
		}
	},

	onRibbonClick:function( event ) {
		if( forkitjs.dom.curtain ) {
			event.preventDefault();

			if( forkitjs.state === forkitjs.STATE_OPENED ) {
				close();
			}
			else if( Date.now() - forkitjs.dragTime < 300 ) {
				open();
			}
		}
	},

	onCloseClick:function( event ) {
		event.preventDefault();
		close();
	},

	layout:function() {
		if( forkitjs.state === forkitjs.STATE_OPENED ) {
			forkitjs.curtainTargetY = window.innerHeight;
			forkitjs.curtainCurrentY = forkitjs.curtainTargetY;
		}
	},

	open:function() {
		forkitjs.dragging = false;
		forkitjs.state = forkitjs.STATE_OPENED;
	},

	close:function() {
		forkitjs.dragging = false;
		forkitjs.state = forkitjs.STATE_CLOSED;
		forkitjs.dom.ribbonTag.innerHTML = forkitjs.closedText;
	},

	detach:function() {
		forkitjs.state = forkitjs.STATE_DETACHED;
		forkitjs.dom.ribbonTag.innerHTML = forkitjs.detachedText;
	},

	animate:function() {
		forkitjs.update();
		forkitjs.render();

		forkitjs.requestAnimFrame( animate );
	},

	update:function() {
		var distance = forkitjs.distanceBetween( forkitjs.mouse.x, forkitjs.mouse.y, window.innerWidth, 0 );

		if( forkitjs.state === forkitjs.STATE_OPENED ) {
			forkitjs.curtainTargetY = Math.min( forkitjs.curtainTargetY + ( window.innerHeight - forkitjs.curtainTargetY ) * 0.2, window.innerHeight );
		}
		else {
			if( forkitjs.distance < forkitjs.TAG_WIDTH * 1.5 ) {
				forkitjs.detach();
			}

			else if( !forkitjs.dragging && forkitjs.state === forkitjs.STATE_DETACHED && forkitjs.distance > forkitjs.TAG_WIDTH * 2 ) {
				forkitjs.close();
			}

			if( forkitjs.dragging ) {
				forkitjs.curtainTargetY = Math.max( forkitjs.mouse.y - forkitjs.dragY, 0 );

				if( forkitjs.curtainTargetY > window.innerHeight * forkitjs.DRAG_THRESHOLD ) {
					forkitjs.open();
				}
			}
			else {
				forkitjs.curtainTargetY *= 0.8;
			}
		}

		forkitjs.curtainCurrentY += ( forkitjs.curtainTargetY - forkitjs.curtainCurrentY ) * 0.3;


		if( forkitjs.dragging || forkitjs.state === forkitjs.STATE_DETACHED ) {
			forkitjs.velocity /= forkitjs.friction;
			forkitjs.velocity += forkitjs.gravity;

			var containerOffsetX = forkitjs.dom.ribbon.offsetLeft;

			var offsetX = Math.max( ( ( forkitjs.mouse.x - containerOffsetX ) - forkitjs.closedX ) * 0.2, -forkitjs.MAX_STRAIN );

			forkitjs.anchorB.x += ( ( forkitjs.closedX + offsetX ) - forkitjs.anchorB.x ) * 0.1;
			forkitjs.anchorB.y += forkitjs.velocity;

			var strain = forkitjs.distanceBetween( forkitjs.anchorA.x, forkitjs.anchorA.y, forkitjs.anchorB.x, forkitjs.anchorB.y );

			if( forkitjs.strain > forkitjs.MAX_STRAIN ) {
				forkitjs.velocity -= Math.abs( strain ) / ( forkitjs.MAX_STRAIN * 1 );
			}

			var dy = Math.max( forkitjs.mouse.y - forkitjs.anchorB.y, 0 ),
				dx = forkitjs.mouse.x - ( containerOffsetX + forkitjs.anchorB.x );
		
			var angle = Math.min( 130, Math.max( 50, Math.atan2( dy, dx ) * 180 / Math.PI ) );

			forkitjs.rotation += ( forkitjs.angle - forkitjs.rotation ) * 0.1;
		}
		else if( forkitjs.state === forkitjs.STATE_OPENED ) {
			forkitjs.anchorB.x += ( forkitjs.openedX - forkitjs.anchorB.x ) * 0.2;
			forkitjs.anchorB.y += ( forkitjs.openedY - forkitjs.anchorB.y ) * 0.2;

			forkitjs.rotation += ( 90 - forkitjs.rotation ) * 0.02;
		}
		else {
			forkitjs.anchorB.x += ( forkitjs.anchorA.x - forkitjs.anchorB.x ) * 0.2;
			forkitjs.anchorB.y += ( forkitjs.anchorA.y - forkitjs.anchorB.y ) * 0.2;

			forkitjs.rotation += ( 45 - forkitjs.rotation ) * 0.2;
		}
	},

	render:function() {
		if( forkitjs.dom.curtain ) {
			forkitjs.dom.curtain.style.top = - 100 + Math.min( ( forkitjs.curtainCurrentY / window.innerHeight ) * 100, 100 ) + '%';
		}

		forkitjs.dom.ribbon.style[ forkitjs.prefix( 'transform' ) ] = forkitjs.transform( 0, forkitjs.curtainCurrentY, 0 );
		
		if(forkitjs.rotation < 65){
			$(".forkit").addClass('crop-it');
		}else{
			$(".forkit").removeClass('crop-it');
		}
		
		forkitjs.dom.ribbonTag.style[ forkitjs.prefix( 'transform' ) ] = forkitjs.transform(forkitjs.anchorB.x,forkitjs.anchorB.y,forkitjs.rotation );
		

		var dy = forkitjs.anchorB.y - forkitjs.anchorA.y,
			dx = forkitjs.anchorB.x - forkitjs.anchorA.x;

		var angle = Math.atan2( dy, dx ) * 180 / Math.PI;

		forkitjs.dom.ribbonString.style.width = forkitjs.anchorB.y + 'px';
		forkitjs.dom.ribbonString.style[ forkitjs.prefix( 'transform' ) ] = forkitjs.transform( forkitjs.anchorA.x, 0, angle );
	},

	prefix:function( property, el ) {
		var propertyUC = property.slice( 0, 1 ).toUpperCase() + property.slice( 1 );

		for( var i = 0, len = forkitjs.VENDORS.length; i < len; i++ ) {
			var vendor = forkitjs.VENDORS[i];

			if( typeof ( el || document.body ).style[ vendor + propertyUC ] !== 'undefined' ) {
				return vendor + propertyUC;
			}
		}

		return property;
	},

	transform:function( x, y, r ) {
		return 'translate('+x+'px,'+y+'px) rotate('+r+'deg)';
	},

	distanceBetween:function( x1, y1, x2, y2 ) {
		var dx = x1-x2;
		var dy = y1-y2;
		return Math.sqrt(dx*dx + dy*dy);
	}
 }

 /**
 * Defines a 2D position.
 
Point=function( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
},

Point.prototype.distanceTo=function( x, y ) {
	var dx = x-this.x;
	var dy = y-this.y;
	return Math.sqrt(dx*dx + dy*dy);
},

Point.prototype.clone=function() {
	return new Point( this.x, this.y );
},

Point.prototype.interpolate=function( x, y, amp ) {
	this.x += ( x - this.x ) * amp;
	this.y += ( y - this.y ) * amp;
},

window.requestAnimFrame=(function(){
	return  window.requestAnimationFrame 		||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
})()


$(function(){
		forkitjs.initialize();
});

*/

var STATE_CLOSED = 0,
	STATE_DETACHED = 1,
	STATE_OPENED = 2,

	TAG_HEIGHT = 30,
	TAG_WIDTH = 100,
	MAX_STRAIN = 30,

	// Factor of page height that needs to be dragged for the
	// curtain to fall
	DRAG_THRESHOLD = 0.36;

	VENDORS = [ 'Webkit', 'Moz', 'O', 'ms' ];

var dom = {
		ribbon: null,
		ribbonString: null,
		ribbonTag: null,
		curtain: null,
		closeButton: null
	},

	// The current state of the ribbon
	state = STATE_CLOSED,

	// Ribbon text, correlates to states
	closedText = '',
	detachedText = '',

	friction = 1.04;
	gravity = 1.5,

	// Resting position of the ribbon when curtain is closed
	closedX = TAG_WIDTH * 0.4,
	closedY = -TAG_HEIGHT * 0.5,

	// Resting position of the ribbon when curtain is opened
	openedX = TAG_WIDTH * 0.4,
	openedY = TAG_HEIGHT,

	velocity = 0,
	rotation = 45,

	curtainTargetY = 0,
	curtainCurrentY = 0,

	dragging = false,
	dragTime = 0,
	dragY = 0,

	anchorA = new Point( closedX, closedY ),
	anchorB = new Point( closedX, closedY ),

	mouse = new Point();

function initialize() {

	dom.ribbon = document.querySelector( '.forkit' );
	dom.curtain = document.querySelector( '.forkit-curtain' );
	dom.closeButton = document.querySelector( '.forkit-curtain .close-button' );
	dom.resumeButton = document.querySelector( '.resumebutton' );

	if( dom.ribbon ) {

		// Fetch label texts from DOM
		closedText = dom.ribbon.getAttribute( 'data-text' ) || '';
		detachedText = dom.ribbon.getAttribute( 'data-text-detached' ) || closedText;

		// Construct the sub-elements required to represent the
		// tag and string that it hangs from
		dom.ribbon.innerHTML = '<span class="string"></span><span class="tag">' + closedText + '</span>';
		dom.ribbonString = dom.ribbon.querySelector( '.string' );
		dom.ribbonTag = dom.ribbon.querySelector( '.tag' );

		// Bind events
		dom.ribbon.addEventListener( 'click', onRibbonClick, false );
		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mousedown', onMouseDown, false );
		document.addEventListener( 'mouseup', onMouseUp, false );
		document.addEventListener( 'touchstart', onTouchStart, false);
		document.addEventListener( 'touchmove', onTouchMove, false);
		document.addEventListener( 'touchend', onTouchEnd, false);
		window.addEventListener( 'resize', layout, false );

		dom.resumeButton.addEventListener( 'click', resumeButtonClick, false );

		if( dom.closeButton ) {
			dom.closeButton.addEventListener( 'click', onCloseClick, false );
		}

		// Start the animation loop
		animate();

	}

}

function onMouseDown( event ) {
	if( dom.curtain && state === STATE_DETACHED ) {
		event.preventDefault();
		dragY = event.clientY;
		dragTime = Date.now();
		dragging = true;

	}
}

function onMouseMove( event ) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

function onMouseUp( event ) {
	if( state !== STATE_OPENED ) {
		state = STATE_CLOSED;
		dragging = false;
	}
}

function onTouchStart( event ) {
	if( dom.curtain && state === STATE_DETACHED ) {
		event.preventDefault();
		var touch = event.touches[0];
		dragY = touch.clientY;
		dragTime = Date.now();
		dragging = true;
	}
}

function onTouchMove( event ) {
	var touch = event.touches[0];
	mouse.x = touch.pageX;
	mouse.y = touch.pageY;
}

function onTouchEnd( event ) {
	if( state !== STATE_OPENED ) {
		state = STATE_CLOSED;
		dragging = false;
	}
}

function resumeButtonClick(event){
	event.preventDefault();
	if( state === STATE_OPENED ) {
		close();
	}
	else{
		open();
	}
}

function onRibbonClick( event ) {
	if( dom.curtain ) {
		event.preventDefault();

		if( state === STATE_OPENED ) {
			close();
		}
		else {
			open();
		}
	}
}

function onCloseClick( event ) {
	event.preventDefault();
	close();
}

function layout() {
	if( state === STATE_OPENED ) {
		curtainTargetY = window.innerHeight;
		curtainCurrentY = curtainTargetY;
	}
}

function open() {
	dragging = false;
	state = STATE_OPENED;
	$("body").css("overflow","hidden");
}

function close() {
	dragging = false;
	state = STATE_CLOSED;
	dom.ribbonTag.innerHTML = closedText;
	$("body").css("overflow","auto");
}

function detach() {
	state = STATE_DETACHED;
	dom.ribbonTag.innerHTML = detachedText;
}

function animate() {
	update();
	render();

	requestAnimFrame( animate );
}

function update() {
	// Distance between mouse and top right corner
	var distance = distanceBetween( mouse.x, mouse.y, window.innerWidth, 0 );

	// If we're OPENED the curtainTargetY should ease towards page bottom
	if( state === STATE_OPENED ) {
		curtainTargetY = Math.min( curtainTargetY + ( window.innerHeight - curtainTargetY ) * 0.2, window.innerHeight );
	}
	else {

		// Detach the tag when hovering close enough
		if( distance < TAG_WIDTH * 1.5 ) {
			detach();
		}
		// Re-attach the tag if the user moved away
		else if( !dragging && state === STATE_DETACHED && distance > TAG_WIDTH * 2 ) {
			close();
		}

		if( dragging ) {
			// Updat the curtain position while dragging
			curtainTargetY = Math.max( mouse.y - dragY, 0 );

			// If the threshold is crossed, open the curtain
			if( curtainTargetY > window.innerHeight * DRAG_THRESHOLD ) {
				open();
			}
		}
		else {
			curtainTargetY *= 0.8;
		}

	}

	// Ease towards the target position of the curtain
	curtainCurrentY += ( curtainTargetY - curtainCurrentY ) * 0.3;

	// If we're dragging or detached we need to simulate
	// the physical behavior of the ribbon
	if( dragging || state === STATE_DETACHED ) {

		// Apply forces
		velocity /= friction;
		velocity += gravity;

		var containerOffsetX = dom.ribbon.offsetLeft;

		var offsetX = Math.max( ( ( mouse.x - containerOffsetX ) - closedX ) * 0.2, -MAX_STRAIN );

		anchorB.x += ( ( closedX + offsetX ) - anchorB.x ) * 0.1;
		anchorB.y += velocity;

		var strain = distanceBetween( anchorA.x, anchorA.y, anchorB.x, anchorB.y );

		if( strain > MAX_STRAIN ) {
			velocity -= Math.abs( strain ) / ( MAX_STRAIN * 1 );
		}

		var dy = Math.max( mouse.y - anchorB.y, 0 ),
			dx = mouse.x - ( containerOffsetX + anchorB.x );

		// Angle the ribbon towards the mouse but limit it avoid extremes
	
		var angle = Math.min( 130, Math.max( 50, Math.atan2( dy, dx ) * 180 / Math.PI ) );
		

		rotation += ( angle - rotation ) * 0.1;
	}
	// Ease ribbon towards the OPENED state
	else if( state === STATE_OPENED ) {
		anchorB.x += ( openedX - anchorB.x ) * 0.2;
		anchorB.y += ( openedY - anchorB.y ) * 0.2;

		rotation += ( 90 - rotation ) * 0.02;
	}
	// Ease ribbon towards the CLOSED state
	else {
		anchorB.x += ( anchorA.x - anchorB.x ) * 0.2;
		anchorB.y += ( anchorA.y - anchorB.y ) * 0.2;

		rotation += ( 45 - rotation ) * 0.2;
	}
}

function render() {

	if( dom.curtain ) {
		dom.curtain.style.top = - 100 + Math.min( ( curtainCurrentY / window.innerHeight ) * 100, 100 ) + '%';
	}

	dom.ribbon.style[ prefix( 'transform' ) ] = transform( 0, curtainCurrentY, 0 );
	
	if(rotation < 65){
		$(".forkit").addClass('crop-it');
	}else{
		$(".forkit").removeClass('crop-it');
	}
	
	dom.ribbonTag.style[ prefix( 'transform' ) ] = transform( anchorB.x, anchorB.y, rotation );
	

	var dy = anchorB.y - anchorA.y,
		dx = anchorB.x - anchorA.x;

	var angle = Math.atan2( dy, dx ) * 180 / Math.PI;

	dom.ribbonString.style.width = anchorB.y + 'px';
	dom.ribbonString.style[ prefix( 'transform' ) ] = transform( anchorA.x, 0, angle );

}

function prefix( property, el ) {
	var propertyUC = property.slice( 0, 1 ).toUpperCase() + property.slice( 1 );

	for( var i = 0, len = VENDORS.length; i < len; i++ ) {
		var vendor = VENDORS[i];

		if( typeof ( el || document.body ).style[ vendor + propertyUC ] !== 'undefined' ) {
			return vendor + propertyUC;
		}
	}

	return property;
}

function transform( x, y, r ) {
	return 'translate('+x+'px,'+y+'px) rotate('+r+'deg)';
}

function distanceBetween( x1, y1, x2, y2 ) {
	var dx = x1-x2;
	var dy = y1-y2;
	return Math.sqrt(dx*dx + dy*dy);
}

 
function Point( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
}

Point.prototype.distanceTo = function( x, y ) {
	var dx = x-this.x;
	var dy = y-this.y;
	return Math.sqrt(dx*dx + dy*dy);
};

Point.prototype.clone = function() {
	return new Point( this.x, this.y );
};

Point.prototype.interpolate = function( x, y, amp ) {
	this.x += ( x - this.x ) * amp;
	this.y += ( y - this.y ) * amp;
};

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame 		||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
})();

$(function(){
		initialize();
});
