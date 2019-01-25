
class TexturedOBJ extends LoadedOBJ {
	
	render() {
		
		useShader(gl, textureShader);
		
		sendUniformMatToGLSL(this.modelMatrix, "u_ModelMatrix");
		send2DTextureToGLSL(this.texture, 0, "u_Sampler");
		sendVertexBufferToGLSL(this.vertices, 3, "a_Position");
		sendTextureBufferToGLSL(this.vertices, 2, "a_TextureCoord"); 
		
		tellGLSLToDrawCurrentBuffer(this.vertices.length);
		
	}

	
}
