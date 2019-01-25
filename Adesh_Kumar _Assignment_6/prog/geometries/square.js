/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author "Adesh Kumar"
 * @this {Square}
 */
class Square extends Geometry {
  /**  
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor(size, centerX, centerY) {
	
	super();
	this.generateSquareVerticesWithNormals(size, centerX, centerY);
    
   // this.modelMatrix.setScale(this.size, 1, this.size);
    // Recommendations: Remember that Square is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
   generateSquareVerticesWithNormals(size, centerX, centerY) {

		function vecs_of_flat_arr(arr, n) {
			let ret = [];
			for (let i = 0; i < arr.length / n; i++) {
				let vec = [];
				for (let j = 0; j < n; j++) {
					vec.push(arr[i * n + j]);
				}
				ret.push(vec);
			}
			return ret;
		}

    var squareVertex1 = new Vertex();
    squareVertex1.points.push(centerX - size, centerY, centerX + size);
    squareVertex1.color.push(0.5, 0.5, 0.5, 1);
    squareVertex1.normal = new Vector3([0, 1, 0]);
    this.vertices.push(squareVertex1);
    
    var squareVertex2 = new Vertex();
    squareVertex2.points.push(centerX - size, centerY, centerX - size);
    squareVertex2.color.push(0.5, 0.5, 0.5, 1);
    squareVertex2.normal = new Vector3([0, 1, 0]);
    this.vertices.push(squareVertex2);
    
    var squareVertex3 = new Vertex();
    squareVertex3.points.push(centerX + size, centerY, centerX + size);
    squareVertex3.color.push(0.5, 0.5, 0.5, 1);
    squareVertex3.normal = new Vector3([0, 1, 0]);
    this.vertices.push(squareVertex3);
    
       var squareVertex4 = new Vertex();
    squareVertex4.points.push(centerX - size, centerY, centerX - size);
    squareVertex4.color.push(0.5, 0.5, 0.5, 1);
    squareVertex4.normal = new Vector3([0, 1, 0]);
    this.vertices.push(squareVertex4);
    
    var squareVertex5 = new Vertex();
    squareVertex5.points.push(centerX + size, centerY, centerX + size);
    squareVertex5.color.push(0.5, 0.5, 0.5, 1);
    squareVertex5.normal = new Vector3([0, 1, 0]);
    this.vertices.push(squareVertex5);
    
    var squareVertex6 = new Vertex();    
    squareVertex6.points.push(centerX + size, centerY, centerX - size);
    squareVertex6.color.push(0.5, 0.5, 0.5, 1);
    squareVertex6.normal = new Vector3([0, 1, 0]);
    this.vertices.push(squareVertex6);
	
       
   }

}

