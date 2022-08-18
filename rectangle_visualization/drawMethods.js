// Note: make common parameter ordering more consistent across methods 


// collection of methods specifically for the rectangle visualization of the sorting algorithms 
// RV stands for Rectangle Visualization 
class RVDrawMethods {
  /**
   * Draws a rectangle to a given rendering context based off parameters 
   * @param { CanvasRenderingContext2D } ctx the canvas rendering context to draw the rectangle on 
   * @param { number } x x-coordinate of the rectangle's top left corner
   * @param { number } y y-coordinate of the rectangle's top left corner
   * @param { number } width width of the rectangle
   * @param { number } height height of the rectangle
   * @param { string? } outlineColor color of the outline of the rectangle; default is transparent 
   * @param { string? } fillColor color of the inside of the rectangle; default is transparent 
   * @param { number? } thickness width of the outline of the rectangle; default is 1 
   */
  static drawRectangle(ctx, x, y, width, height, outlineColor = "transparent", fillColor = "transparent",  thickness = 1) {
      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = outlineColor
      ctx.fillStyle = fillColor
      ctx.rect(x, y, width, height)
      ctx.fill()
      ctx.stroke()
  }

  /**
   * Fills the entire canvas with a single color 
   * @param { Element } canvas background to be drawn on
   * @param { string } color color of the background 
   */
  static drawBackground(canvas, color) {
      RVDrawMethods.drawRectangle(canvas.getContext('2d'), 0, 0, canvas.width, canvas.height, "transparent", color)
  }
  
  /**
   * Draws the initial batch of rectangles that have a randomized height 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number } numberOfRectangles number of rectangles to be drawn 
   * @param { string } rectangleFillColor fill color of the rectangle 
   * @param { string } rectangleOutlineColor outline color of the rectangle 
   * @param { number } padding number of pixels between each rectangle
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels; rectangle height is determined by multiplying this by a number from 0 to 1 from some unsorted list 
   * @param { boolean } ignorePaddingError determines if an error is thrown when padding is too large due to the constraints of the canvas width and number of rectangles; defaulted to false 
   * @param { boolean } ignoreSmallWidthError determines if an error is thrown when rectangle width is too small (less than 1) due to the constraints of the canvas width, padding, and number of rectangles; defaulted to false 
   * @return { number[] } array of numbers from 0 to 1 representing the rectangle heights 
   */
  static drawRectangleBatch(canvas, ctx, numberOfRectangles, rectangleFillColor, rectangleOutlineColor, padding, rectangleMaxHeight, ignorePaddingError = false, ignoreSmallWidthError = false) {
    // calculating width and generating numbers for rectangle heights 
    const rectangleWidth = (canvas.width - padding * numberOfRectangles) / numberOfRectangles 
  
    if (rectangleWidth < 0 && !ignorePaddingError) 
      throw new Error(`padding*numberOfRectangles (${padding*numberOfRectangles}) > canvas.width (${canvas.width}) will result in incorrect drawing of rectangles`)
    if (rectangleWidth < 1  && !ignoreSmallWidthError) 
      throw new Error(`rectangleWidth of ${rectangleWidth} will result in incorrect drawing of rectangles `)
  
    const numbers = Utils.generateNumbers(numberOfRectangles)
    let xCoord = 0 
    
    // drawing each rectangle 
    for (let i = 0; i < numberOfRectangles; i++) {
      const rectangleHeight = numbers[i] * rectangleMaxHeight
      xCoord = i * (rectangleWidth + padding)
      const yCoord = canvas.height - rectangleHeight
      RVDrawMethods.drawRectangle(ctx, xCoord, yCoord, rectangleWidth, rectangleHeight, rectangleOutlineColor, rectangleFillColor)
    }
    
    return numbers 
  }

  /**
   * Replaces a rectangle in the (assumed to exist) rectangle batch. Method shouldn't be called if drawRectangleBatch hasn't already been called. This method will not error if there actually isn't a nthRectangle to change. 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number } numberOfRectangles number of rectangles that were drawn 
   * @param { number } nthRectangle the nth rectangle in the batch to be replaced 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { number } heightPercentage number from 0 to 1 that's multiplied to rectangleMaxHeight to get the rectangle height 
   * @param { number } padding number of pixels between each rectangle in the batch 
   * @param { string } wipeoutColor fill & outline color used to 'remove' the rectangle; should be same as background color 
   * @param { string } rectangleFillColor fill color of the rectangle 
   * @param { string } rectangleOutlineColor outline color of the rectangle 
   */
  static replaceRectangle(canvas, ctx, numberOfRectangles, nthRectangle, rectangleMaxHeight, heightPercentage, padding, wipeoutColor, rectangleFillColor, rectangleOutlineColor) {
    const rectangleWidth = (canvas.width - padding * numberOfRectangles) / numberOfRectangles 
    const rectangleHeight = heightPercentage * rectangleMaxHeight
    const yCoord = canvas.height - rectangleHeight
    const xCoord = nthRectangle * (rectangleWidth + padding)
  
    // clear out rectangle 
    RVDrawMethods.drawRectangle(ctx, xCoord, 0, rectangleWidth, canvas.height, wipeoutColor, wipeoutColor)
  
    // re-draw rectangle 
    RVDrawMethods.drawRectangle(ctx, xCoord, yCoord, rectangleWidth, rectangleHeight, rectangleOutlineColor, rectangleFillColor)
  }

  /**
   * Colors 'numbers.length' rectangles to the color 'rectangleComparedColor'. Method shouldn't be called if drawRectangleBatch hasn't already been called.
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number[] } indices list of indices of numbers being compared in the list to be sorted 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { number } padding number of pixels between each rectangle in the batch 
   * @param { string } rectangleComparedColor color to set the rectangles to 
   * @param { string } wipeoutColor fill & outline color used to wipe out the previous rectangle; should be same as background color 
   */
  static drawRectangleComparing(canvas, ctx, numbers, indices, rectangleMaxHeight, padding, rectangleComparedColor, rectangleOutlineColor, wipeoutColor) {

    let numberOfRectangles = numbers.length
    for (let i = 0; i < indices.length; i++) {
      let nthRectangle = indices[i]
      let heightPercentage = numbers[nthRectangle]
      RVDrawMethods.replaceRectangle(canvas, ctx, numberOfRectangles, nthRectangle, rectangleMaxHeight, heightPercentage, padding, wipeoutColor, rectangleComparedColor, rectangleOutlineColor)
    }
  }

  /**
   * Colors 'numbers.length' rectangles to the color 'rectangleWrongSpotColor'. Method shouldn't be called if drawRectangleBatch hasn't already been called. 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } index index of number being colored in the list to be sorted 
   * @param { number } padding number of pixels between each rectangle in the batch 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { string } rectangleWrongSpotColor color to set the rectangle to 
   * @param { string } wipeoutColor fill & outline color used to wipe out the previous rectangle; should be same as background color 
   */
  static drawRectangleWrongSpot(canvas, ctx, numbers, index, padding, rectangleMaxHeight, rectangleWrongSpotColor, wipeoutColor) {

    let numberOfRectangles = numbers.length
    let rectangleOutlineColor = rectangleWrongSpotColor
    let nthRectangle = index
    let heightPercentage = numbers[nthRectangle]
    RVDrawMethods.replaceRectangle(canvas, ctx, numberOfRectangles, nthRectangle, rectangleMaxHeight, heightPercentage, padding, wipeoutColor, rectangleWrongSpotColor, rectangleOutlineColor)
    
  }

   /**
   * Colors 'numbers.length' rectangles to the color 'drawRectangleCorrectSpot'. Method shouldn't be called if drawRectangleBatch hasn't already been called. 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } index index of number being colored in the list to be sorted 
   * @param { number } padding number of pixels between each rectangle in the batch 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { string } rectangleCorrectSpotColor color to set the rectangle to 
   * @param { string } wipeoutColor fill & outline color used to wipe out the previous rectangle; should be same as background color 
   */
  static drawRectangleCorrectSpot(canvas, ctx, numbers, index, padding, rectangleMaxHeight, rectangleCorrectSpotColor, wipeoutColor) {

    let numberOfRectangles = numbers.length
    let rectangleOutlineColor = rectangleCorrectSpotColor
    let nthRectangle = index
    let heightPercentage = numbers[nthRectangle]
    RVDrawMethods.replaceRectangle(canvas, ctx, numberOfRectangles, nthRectangle, rectangleMaxHeight, heightPercentage, padding, wipeoutColor, rectangleCorrectSpotColor, rectangleOutlineColor)
      
  }

  /**
   * Swaps position of two rectangles given their indices in relation to the list to be sorted. Method shouldn't be called if drawRectangleBatch hasn't already been called. 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } indexA index of first element in numbers array to be swapped 
   * @param { number } indexB index of second element in numbers array to be swapped 
   * @param { number } padding number of pixels between each rectangle in the batch 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { string } rectangleFillColor fill color of the rectangle 
   * @param { string } rectangleOutlineColor outline color of the rectangle 
   * @param { string } wipeoutColor fill & outline color used to wipe out the previous rectangle; should be same as background color 
   */
  static drawRectangleSwap(canvas, ctx, numbers, indexA, indexB, padding, rectangleMaxHeight, rectangleFillColor, rectangleOutlineColor, wipeoutColor) {
    let numberOfRectangles = numbers.length
    let heightPercentageA = numbers[indexA]
    let heightPercentageB = numbers[indexB]

    RVDrawMethods.replaceRectangle(canvas, ctx, numberOfRectangles, indexA, rectangleMaxHeight, heightPercentageB, padding, wipeoutColor, rectangleFillColor, rectangleOutlineColor)
    RVDrawMethods.replaceRectangle(canvas, ctx, numberOfRectangles, indexB, rectangleMaxHeight, heightPercentageA, padding, wipeoutColor, rectangleFillColor, rectangleOutlineColor)
  }

  static drawRectangleStoppedCompare(canvas, ctx, numbers, index, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleFillColor, wipeoutColor) {
    let numberOfRectangles = numbers.length
    let height = numbers[index]

    RVDrawMethods.replaceRectangle(canvas, ctx, numberOfRectangles, index, rectangleMaxHeight, height, padding, wipeoutColor, rectangleFillColor, rectangleOutlineColor)
  }


}