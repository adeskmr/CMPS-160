/**
 * Specifies a WebGL scene.
 *
 * @author "adesh kumar"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    this.color = [];
	
    var pos = [0, 0,-1]; // when keys a or d are pushed to pan, change pos and cen by same value
    var cen = [0, 0, 1];
    var up  = [0, 1, 0];
    var fov = zoomSlider.value/1;
    var aspect_ratio = 4/3;
    var near = nearSlider.value/1;
    var far = farSlider.value/1;
      
    this.camera = new Camera(pos, cen, up, fov, aspect_ratio, near, far);

	// Specify the color for clearing <canvas>
	gl.clearColor(0.2, 0.2, 0.2, 1.0);

	// Clear <canvas>`
	gl.clear(gl.COLOR_BUFFER_BIT);

    // Recommendations: Setting the canvas's clear color and clearing the canvas
    // here is a good idea.
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    this.geometries = [];
	this.render();

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
      
    this.camera.update();
    
    for (var i = 0; i < this.geometries.length; i++)
	{
		this.geometries[i].updateAnimation();
	}

    // Recomendations: No rendering should be done here. Your Geometry objects
    // in this.geometries should update their animations themselves through
    // their own .updateAnimation() methods.
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   
	for (var i = 0; i < this.geometries.length; i++)
	{
        sendUniformMatToGLSL(this.camera.viewMatrix, "u_ViewMatrix");
        sendUniformMatToGLSL(this.camera.projMatrix, "u_ProjMatrix");
		this.geometries[i].render();
	}

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
