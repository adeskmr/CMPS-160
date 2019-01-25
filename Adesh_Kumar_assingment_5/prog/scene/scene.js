
const CUBE_SIZE = 0.3
const IMG_SIZE = 16
const FLOOR_LEVEL = 0.0
/**
 * Specifies a WebGL scene.
 *
 * @author "Adesh Kumar"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = [];
    gl.clearColor(0,0,0,1)
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.viewMatrix = new Matrix4(); 
    this.projMatrix = new Matrix4(); 
    this.camera = null
    this.shader = createShader(gl, ASSIGN4_VSHADER_TEXTURE, ASSIGN4_FSHADER_TEXTURE);
    useShader(gl, this.shader);
    this.Mapping()

    // this.addObj("cat.obj", "cat_diff.jpg", 1, FLOOR_LEVEL+0.5, -8)
    // this.addObj("teapot.obj", "TeapotTex.png", 9, FLOOR_LEVEL-0.3, -8)

  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry)
    // console.log(geometry)
  }

  async Mapping() {
    let colorsData = await this.loadImageData("./Color_map.png")
    let heightsData = await this.loadImageData("./height_map.png")
    let j = 0
    let i = 0
    let colors = []
    let heights = []
    while (j < (IMG_SIZE*IMG_SIZE*4)) { 
      colors[i] = [colorsData[j]/255, colorsData[j+1]/255, colorsData[j+2]/255, colorsData[j+3]/255]
      heights[i] = Math.round(heightsData[j]/255 * 2) 
      j += 4 
      i++ 
    }
    for (let z = 0; z < IMG_SIZE; z++) {
      for (let x = 0; x < IMG_SIZE; x++) {
        let index = x+z*IMG_SIZE 
        let textureName = "checkerboard.png"
        if(heights[index] == 0) {
          textureName = "flcl.jpg" 
        }
        let cube = new StaticCube(CUBE_SIZE, x, FLOOR_LEVEL, -z, heights[index], textureName)
        cube.color = colors[index]
        this.addGeometry(cube)
      }
    }
  }

  loadImageData(src){
    return new Promise((resolve, reject) => {
      let img = new Image(IMG_SIZE,IMG_SIZE)
      img.onload = () => resolve(sampleImageColor(img))
      img.onerror = reject
      img.src = src
    })
  }


  // addObj(name, texture, x, y, z) {
  //   return loadFile(name, (textData) => {
  //     let obj = new LoadedOBJ(textData)
  //     if(texture) {
  //       let path = "./"+texture
  //       create2DTexture(path, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, (texture) => {
  //         obj.texture = texture
  //       })
  //     }
  //     obj.flatData()
  //     obj.updateAnimation = function() {
  //       this.modelMatrix.rotate(1, 0, 1, 0)
  //     }
  //     obj.modelMatrix.translate(x,y,z)
  //     //Scaling it down
  //     obj.modelMatrix.scale(0.2,0.2,0.2)
  //     this.addGeometry(obj)
  //   })
  // }


  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation()
    }
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    gl.clearColor(0.2,0.2,0.2,1)
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    sendUniformMatToGLSL(scene.viewMatrix.elements, "u_ViewMatrix")
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render()
    }
  }
}

