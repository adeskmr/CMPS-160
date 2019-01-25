
var movingDistance = 0.1
var upperAngleBound = 18
var map = {};
var oldx = 0
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {
  document.getElementById("projMatrix").addEventListener("change", function(event) {
    switch (parseInt(event.target.value)) {
      case MatrixEnum.projection:
        scene.camera.orthogonal = false
        break;
      case MatrixEnum.orthogonal:
        scene.camera.orthogonal = true
        break;
      default:
        return;
    }
    scene.camera.updateProjection()
  })
  document.getElementById("fov").addEventListener("change", function(event) {
    fov = parseInt(event.target.value)
    scene.camera.updateProjection()
  })
  document.getElementById("near").addEventListener("change", function(event) {
    near = parseFloat(event.target.value)
    scene.camera.updateProjection()
  })
  document.getElementById("far").addEventListener("change", function(event) {
    far = parseInt(event.target.value)
    scene.camera.updateProjection()
  })
  document.addEventListener("keydown", function(event) {
    if(event.key != "w" && event.key != "s" && event.key != "d" && event.key != "a" && event.key != "j" && event.key != "k") return
    map[event.key] = true;
    //We use map to allow combinations of presses
    if(map.w) {
      scene.camera.forward(movingDistance)
    } else if(map.s) {
      scene.camera.backward(movingDistance)
    }
    if(map.d) {
      scene.camera.right(movingDistance)
    } else if(map.a) {
      scene.camera.left(movingDistance)
    }

    //Rotating
    if(map.k) {
      scene.camera.rotate(-upperAngleBound/3)
    } else if(map.j) {
      scene.camera.rotate(upperAngleBound/3)
    }
    scene.camera.updateCamera()

  })

  document.addEventListener("keyup", function(event) {
    map[event.key] = false //We clear the key from the map
  })

  canvas.addEventListener("mousemove", function(event) {
    let left = (oldx-event.pageX)/3
    let right = (event.pageX - oldx)/3
    left > upperAngleBound? left = upperAngleBound : left = left
    right > upperAngleBound? right = -upperAngleBound : right = -right
    if (event.pageX < oldx) {
        scene.camera.rotate(left)
    } else if (event.pageX > oldx) {
        scene.camera.rotate(right)
    }
    scene.camera.updateCamera()
    oldx = event.pageX;
  })

}

