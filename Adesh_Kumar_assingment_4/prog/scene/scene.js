/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
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
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.enable(this.gl.DEPTH_TEST);
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
    this.geometries = []; // Geometries being drawn on canvas
    this.render();
    console.log("clear")

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    for( var i = 0; i < this.geometries.length; i++){
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
    gl.clear(gl.COLOR_BUFFER_BIT);
    for( var i = 0; i < this.geometries.length; i++){
      this.geometries[i].render();
    }
    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
