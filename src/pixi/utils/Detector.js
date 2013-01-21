/**
 * @author Mat Groves http://matgroves.com/
 */
var PIXI = PIXI || {};

/**
 * This helper function will automatically detect which renderer you should be using.
 * WebGL is the preferred renderer as it is a lot fastest. If webGL is not supported by the browser then this function will return a canvas renderer
 * @param the width of the renderers view
 * @param the height of the renderers view
 * @return A new Renderer
 */
PIXI.autoDetectRenderer = function(width, height)
{
	if(!width)width = 800;
	if(!height)height = 600;
	
	// BORROWED from Mr Doob (mrdoob.com)
	var webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )()
	
	//console.log(webgl);
	if( webgl )
	{
		return new PIXI.WebGLRenderer(width, height) 
	}
	
	return	new PIXI.CanvasRenderer(width, height);
}


