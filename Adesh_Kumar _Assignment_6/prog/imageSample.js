/**
 * Samples the color of each pixel in an image.
 *
 * @param {Image} image The image whose color data is being sampled
 * @returns {Array} A 1-D array of RGBA values in row-major order
 */
function sampleImageColor(image) {
  var canvas = document.createElement('canvas');

  canvas.height = image.height;
  canvas.width = image.width;
  console.log(canvas);
  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  var colorData = context.getImageData(0, 0, image.width, image.height).data;

  return colorData;
}
