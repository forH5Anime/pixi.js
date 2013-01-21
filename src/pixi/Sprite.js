/**
 * @author Mat Groves http://matgroves.com/
 */
var PIXI = PIXI || {};

PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0;
PIXI.blendModes.SCREEN = 1;

/**
 * @class A Sprite
 * @augments PIXI.DisplayObjectContainer
 * @constructor
 * @param {PIXI.textures.Texture} texture {@link PIXI.textures.Texture}
 * @return A new Sprite.
 */
PIXI.Sprite = function(texture)
{
	PIXI.DisplayObjectContainer.call( this );
	
	/**
	 * The anchor sets the origin point of the texture.
	 * The default is 0,0 this means the textures origin is the top left 
	 * Setting than anchor to 0.5,0.5 means the textures origin is centered
	 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
	 * @type #Point
	 */
	this.anchor = new PIXI.Point();
	
	/**
	 * The texture that the sprite is using
	 * @type #Point
	 */
	this.texture = texture;
	
	/**
	 * The blend mode of sprite.
	 * currently supports PIXI.blendModes.NORMAL and PIXI.blendModes.SCREEN
	 * @type uint
	 */
	this.blendMode = PIXI.blendModes.NORMAL;
	
	/**
	 * The width of the sprite (this is initially set by the texture)
	 * @type #Number
	 */
	this.width = 1;
	
	/**
	 * The height of the sprite (this is initially set by the texture)
	 * @type #Number
	 */
	this.height = 1;
	
	if(texture.baseTexture.hasLoaded)
	{
		this.width   = this.texture.frame.width;
		this.height  = this.texture.frame.height;
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}
	
	this.renderable = true;
}

// constructor
PIXI.Sprite.constructor = PIXI.Sprite;
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

/**
 * The PIXI texture that is displayed by the sprite
 * @param {PIXI.Texture} texture {@link PIXI.Texture}
 */
PIXI.Sprite.prototype.setTexture = function(texture)
{
	// stop current texture;
	if(this.texture.baseTexture != texture.baseTexture)
	{
		this.textureChange = true;	
	}
	
	this.texture = texture;
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
	
}

/**
 * @private
 */
PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
	this.width   = this.texture.frame.width;
	this.height  = this.texture.frame.height;
	this.updateFrame = true;
}

// some helper functions..


/**
 * 
 * Helper function that creates a sprite that will contain a texture from the TextureCache based on tjhe frameId
 * The frame ids are created when a Texture packer file has been loaded
 * @param The frame Id of the texture in the cache
 * @return {PIXI.Sprite} texture {@link PIXI.Sprite}
 */
PIXI.Sprite.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache" + this);
	return new PIXI.Sprite(texture);
}

/**
 * 
 * Helper function that creates a sprite that will contain a texture based on an image url
 * If the image is not in the texture cache it will be loaded
 * @param The image url of the texture
 * @return {PIXI.Sprite} texture {@link PIXI.Sprite}
 */
PIXI.Sprite.fromImage = function(imageId)
{
	var texture = PIXI.Texture.fromImage(imageId);
	return new PIXI.Sprite(texture);
}

