/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
 	
class LoadedOBJ extends Geometry {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(objStr, yVal, redColor, greenColor, blueColor) {
    super();
    // Construct the Mesh object containg the OBJ file's information
    
    var objMesh = new OBJ.Mesh(objStr);
    // Textures array to switch between textures
   // console.log(objStr);
	this.currentAngle = 0.0;
    
    this.yVal = yVal;
    
    // Construct the necessary amount of vertex objects within this.vertices
    for (var i = 0; i < objMesh.indices.length; i++) {
      this.vertices[i] = new Vertex();
      this.vertices[i].color.push(redColor, greenColor, blueColor, 1.0);
    }
    // Add the vertex points, normals, and uv coordinates in OBJ
    var transAndScaleVal = this.addVertexPoints(objMesh.indices, objMesh.vertices);
    this.addVertexNormals(objMesh.indices, objMesh.vertexNormals);
    this.addVertexTextureCoordinates(objMesh.indices, objMesh.textures);

    // Modify loadedOBJ's modelMatrix to present OBJ correctly
   
    this.moveOBJToCenterOfScreen(transAndScaleVal[0], yVal);
    this.scaleOBJToFitOnScreen(transAndScaleVal[1]);
      
     
  }

  /**
   * Adds the point information to the vertices of LoadedOBJ. Also keeps
   * track of the largest x-y-z coordinate absolute value and the center of
   * the LoadedOBJ. Does so for displaying geometry correctly. Uses indices to
   * put points in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} points The points being added
   * @returns {Array} centerPoint at index 0, necessary scale at index 1
   */
  addVertexPoints(indices, points) {
    var vertexHasNotBeenEncountered = new Array(points.length / 3);
    vertexHasNotBeenEncountered.fill(true);

    var largestCoordinateValue = 1.0;
    var centerPoint = [0.0, 0.0, 0.0];

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i];
      var xyz = [points[index * 3], points[index * 3 + 1], points[index * 3 + 2]];

      if (vertexHasNotBeenEncountered[index]) {
        // Compare xyz to largestCoordinateValue
        for (var j = 0; j < 3; j++) {
          if (Math.abs(xyz[j]) > largestCoordinateValue) {
            largestCoordinateValue = Math.abs(xyz[j]);
          }
        }

        // Continue computing the centerPoint of LoadedOBJ
        centerPoint[0] += xyz[0];
        centerPoint[1] += xyz[1];
        centerPoint[2] += xyz[2];

        vertexHasNotBeenEncountered[index] = false;
      }

      this.vertices[i].points = xyz;
    }

    centerPoint[0] /= -(points.length / 3);
    centerPoint[1] /= -(points.length / 3);
    centerPoint[2] /= -(points.length / 3);
	
    return [centerPoint, 1 / largestCoordinateValue];
  }

  /**
   * Adds the normals information to LoadedOBJ's vertices. Uses indices to
   * add normals in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} normals The normals being added
   */
  addVertexNormals(indices, normals) {
    // If normals information is invalid, set all normals to just null
    if (this.isInvalidParameter(normals)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].normal = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var xyz = [normals[index * 3], normals[index * 3 + 1], normals[index * 3 + 2]];

        this.vertices[i].normal = new Vector3(xyz);
      }
    }
  }

  /**
   * Adds the texture information to LoadedOBJ's vertices. Uses indices to
   * add texture coordinates in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ's vertices
   * @param {Array} textures The textures being added
   */
  addVertexTextureCoordinates(indices, textures) {
    // If textures information is invalid, set vertex.uv to null for all vertices.
    if (this.isInvalidParameter(textures)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].uv = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var uv = [textures[index * 2], textures[index * 2 + 1]];

        this.vertices[i].uv = uv;
      }
    }
  }

  /**
   * Determines if a parameter (points, normals, textures) is invalid.
   *
   * @private
   */
  isInvalidParameter(parameter) {
    if (parameter == null) {
      return true;
    }
    if (parameter == []) {
      return true;
    }
    if (isNaN(parameter[0])) {  // Can be array of just NaN
      return true;
    }

    return false;
  }

  /**
   * Modifes the LoadedOBJ's modelMatrix to move the LoadedOBJ to the
   * center of the canvas.
   *
   * @private
   * @param {Array} transValue An array containing translation value for x, y, z
   * axis (indices: 0, 1, 2)
   */
  moveOBJToCenterOfScreen(transValue, yVal) {
    this.modelMatrix.setTranslate(transValue[0], yVal, transValue[2]);
  }
    


  /**
   * Modifies the LoadedOBJ's modelMatrix to scale the LoadedOBJ to fit
   * within the canvas. Assumes moveOBJToCenterOfScreen() has been called
   * beforehand and modelMatrix is defined.
   *
   * @private
   * @param {Number} scaleValue Amount LoadedOBJ will be scaled by
   */
  scaleOBJToFitOnScreen(scaleValue) {
      
    var scaleMatrix = new Matrix4();
  

    scaleMatrix.setScale(scaleValue/15, scaleValue/15, scaleValue/15);
    this.modelMatrix = scaleMatrix.multiply(this.modelMatrix);
     
  }
  
  /*setShader()
  {
	if (document.getElementById("chooseTextureFile").files[0] == undefined)
	{
		var colorShader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER);
		useShader(gl, colorShader);
	}
	else
	{
		var textureShader = createShader(gl, ASSIGN4_VSHADER_TEXTURE, ASSIGN4_FSHADER_TEXTURE);
		useShader(gl, textureShader);
	}
  }*/
  
  updateAnimation()
  {
	var tempMatrix = new Matrix4();
    var tempMatrix2 = new Matrix4();
    var tempMatrix3 = new Matrix4();
    
    
	tempMatrix.setRotate(this.currentAngle, 0, 1, 0);
	this.modelMatrix = tempMatrix.multiply(this.modelMatrix);
	 //tempMatrix3.setTranslate(this.xVal, this.yVal, this.zVal);
     // this.modelMatrix = tempMatrix3.multiply(this.modelMatrix);
     // this.modelMatrix.setRotate(30, 0, 1, 0);
   // this.modelMatrix = tempMatrix2.multiply(this.modelMatrix);
	this.currentAngle = (this.currentAngle/100 + 3.0) % 360;
	
  }
  
 // render(){
	
	//if (document.getElementById("chooseTextureFile").files[0] == undefined)
	//{
		//var colorShader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER);
	//	useShader(gl, colorShader);
		
	//	sendVertexBufferToGLSL(this.vertices, 3, "a_Position");
	//	sendColorBufferToGLSL(this.vertices, 4, "a_Color");
	//	sendUniformMatToGLSL(this.modelMatrix, "u_ModelMatrix");
	//	tellGLSLToDrawCurrentBuffer(this.vertices.length);
	//}
	 
	//else
	//{
		//var textShader = createShader(gl, ASSIGN4_VSHADER_TEXTURE, ASSIGN4_FSHADER_TEXTURE);
		//useShader(gl, textShader);
		
		
	//	create2DTexture(texture, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, function(texture) {
	//	 send2DTextureToGLSL(texture, 0, 'u_Sampler')});
    
		
 // }
}

