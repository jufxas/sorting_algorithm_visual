// drawing approach: first, draw the initial batch of rectangles. then, whenever a rectangle needs to be changed, ONLY change the pixels around that rectangle instead of re-drawing the entire batch. rectangle height information is stored in an array of numbers that're all 0 to 1 exclusive. any time a rectangle needs to change, information about its location is computed based off many inputs 

// collection of methods specifically for the rectangle visualization of the sorting algorithms 
// RV stands for Rectangle Visualization 
class RVDrawMethods {
  /**
   * 
   * @param {Element} canvas 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {RVSettings} settings
   */
  constructor(canvas, ctx, settings) {
    this.canvas = canvas
    this.ctx = ctx
    this.settings = settings
  }

  /**
   * Draws a rectangle to a given rendering context based off parameters 
   * @param { number } x x-coordinate of the rectangle's top left corner
   * @param { number } y y-coordinate of the rectangle's top left corner
   * @param { number } width width of the rectangle
   * @param { number } height height of the rectangle
   * @param { string? } outlineColor color of the outline of the rectangle; default is transparent 
   * @param { string? } fillColor color of the inside of the rectangle; default is transparent 
   * @param { number? } thickness width of the outline of the rectangle; default is 1 
   */
  drawRectangle(x, y, width, height, outlineColor = "transparent", fillColor = "transparent",  thickness = 1) {
      this.ctx.beginPath()
      this.ctx.lineWidth = thickness
      this.ctx.strokeStyle = outlineColor
      this.ctx.fillStyle = fillColor
      this.ctx.rect(x, y, width, height)
      this.ctx.fill()
      this.ctx.stroke()
  }

  /**
   * Fills the entire canvas with a single color 
   */
  drawBackground() {
      this.drawRectangle(0, 0, this.canvas.width, this.canvas.height, "transparent", this.settings.backgroundColor)
  }
  
  /**
   * Draws the initial batch of rectangles that have a randomized height 
   * @param { number[] } numbers array to be sorted 
   */
  drawRectangleBatch(numbers) {
    // calculating width and generating numbers for rectangle heights 
    const numberOfRectangles = numbers.length
    const rectangleWidth = Math.floor((this.canvas.width - this.settings.padding * this.settings.numberOfRectangles) / this.settings.numberOfRectangles)  // width is floored because weird decimals cause rendering issues. may result in right side having some empty space for some given inputs; but, empty space is more tolerable 
  
    if (rectangleWidth < 0 && !this.settings.ignorePaddingError) 
      throw new Error(`padding*numberOfRectangles (${this.padding*numberOfRectangles}) > canvas.width (${canvas.width}) will result in incorrect drawing of rectangles`)
    if (rectangleWidth < 1  && !this.settings.ignoreSmallWidthError) 
      throw new Error(`rectangleWidth of ${rectangleWidth} will result in incorrect drawing of rectangles `)
  
    let xCoord = 0 
    
    // drawing each rectangle 
    for (let i = 0; i < numberOfRectangles; i++) {
      const rectangleHeight = numbers[i] * this.settings.rectangleMaxHeight
      xCoord = i * (rectangleWidth + this.settings.padding)
      const yCoord = this.canvas.height - rectangleHeight
      this.drawRectangle(xCoord, yCoord, rectangleWidth, rectangleHeight, this.settings.rectangleOutlineColor, this.settings.rectangleFillColor)
    }
    
    return numbers 
  }

  /**
   * Replaces a rectangle in the (assumed to exist) rectangle batch. Method shouldn't be called if drawRectangleBatch hasn't already been called. This method will not error if there actually isn't a nthRectangle to change. 
   * @param { number } numberOfRectangles number of rectangles that were drawn 
   * @param { number } nthRectangle the nth rectangle in the batch to be replaced 
   * @param { number } heightPercentage 
   * @param { string? } fillColor
   */
  replaceRectangle(numberOfRectangles, nthRectangle, heightPercentage, fillColor) {
    const rectangleWidth = Math.floor((this.canvas.width - this.settings.padding * numberOfRectangles) / numberOfRectangles)
    const rectangleHeight = heightPercentage * this.canvas.height
    const yCoord = canvas.height - rectangleHeight
    const xCoord = nthRectangle * (rectangleWidth + this.settings.padding)
  
    // clear out rectangle 
    this.drawRectangle(xCoord, 0, rectangleWidth, canvas.height, this.settings.rectangleOutlineColor, this.settings.backgroundColor)
  
    // re-draw rectangle 
    this.drawRectangle(xCoord, yCoord, rectangleWidth, rectangleHeight, this.settings.rectangleOutlineColor, fillColor)
  }

  /**
   * Colors 'numbers.length' rectangles to the color 'rectangleComparedColor'. Method shouldn't be called if drawRectangleBatch hasn't already been called.
   * @param { number[] } numbers list of number to be sorted 
   * @param { number[] } indices list of indices of numbers being compared in the list to be sorted 
   */
   drawRectangleComparing(numbers, indices) {
    let numberOfRectangles = numbers.length

    for (let i = 0; i < indices.length; i++) {
      let nthRectangle = indices[i]
      let heightPercentage = numbers[nthRectangle]
      this.replaceRectangle(numberOfRectangles, nthRectangle, heightPercentage, this.settings.rectangleComparedColor)
    }
  }

  /**
   * Colors 'numbers.length' rectangles to the color 'rectangleWrongSpotColor'. Method shouldn't be called if drawRectangleBatch hasn't already been called. 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } index index of number being colored in the list to be sorted 
   */
  drawRectangleWrongSpot(numbers, index) {
    let numberOfRectangles = numbers.length
    let nthRectangle = index
    let heightPercentage = numbers[nthRectangle]
    this.replaceRectangle(numberOfRectangles, nthRectangle, heightPercentage, this.settings.rectangleWrongSpotColor)
  }

   /**
   * Colors 'numbers.length' rectangles to the color 'drawRectangleCorrectSpot'. Method shouldn't be called if drawRectangleBatch hasn't already been called. 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } index index of number being colored in the list to be sorted 
   */
  drawRectangleCorrectSpot(numbers, index) {

    let numberOfRectangles = numbers.length
    let nthRectangle = index
    let heightPercentage = numbers[nthRectangle]
    this.replaceRectangle(numberOfRectangles, nthRectangle, heightPercentage, this.settings.rectangleCorrectSpotColor)
      
  }

  /**
   * Swaps position of two rectangles given their indices in relation to the list to be sorted. Method shouldn't be called if drawRectangleBatch hasn't already been called. 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } indexA index of first element in numbers array to be swapped 
   * @param { number } indexB index of second element in numbers array to be swapped 
   */
  drawRectangleSwap(numbers, indexA, indexB) {
    let numberOfRectangles = numbers.length
    let heightPercentageA = numbers[indexA]
    let heightPercentageB = numbers[indexB]
    this.replaceRectangle(numberOfRectangles, indexA, heightPercentageB, this.settings.rectangleFillColor)
    this.replaceRectangle(numberOfRectangles, indexB, heightPercentageA, this.settings.rectangleFillColor)
  }
  
  /**
   * Changes rectangle to default color when comparison is done 
   * @param { number[] } numbers list of number to be sorted 
   * @param { number } index index of number being colored in the list to be sorted 
   */
  drawRectangleStoppedCompare(numbers, index) {
    let numberOfRectangles = numbers.length
    let heightPercentage = numbers[index]
    this.replaceRectangle(numberOfRectangles, index, heightPercentage, this.settings.rectangleFillColor)
  }


}