/**
 * Bundle of functions that implements a sorting algorithm visualization using RVDrawMethods, Utils, and choice global variables 
 */
class RVsortingAlgorithms {
  /**
   * Implements rectangle visualization for bubble sort algorithm. Global elements expected to exist: canvas, ctx, RVsettings, Utils 
   * @param { number[] } array to be sorted 
   */
  static async bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          // comparing arr[j], arr[j+1]
          RVDrawMethods.drawRectangleComparing(canvas, ctx, arr, [j, j+1], RVsettings.rectangleMaxHeight, RVsettings.padding, RVsettings.rectangleComparedColor, RVsettings.rectangleOutlineColor, RVsettings.backgroundColor)
          await Utils.timer(RVsettings.compareTime)
    
          if(arr[j] > arr[j+1]) {
    
            // j+1 in wrong spot 
            RVDrawMethods.drawRectangleWrongSpot(canvas, ctx, arr, j+1, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleWrongSpotColor, RVsettings.rectangleOutlineColor, RVsettings.backgroundColor)
            await Utils.timer(RVsettings.wrongSpotTime)
    
            // swap 
            RVDrawMethods.drawRectangleSwap(canvas, ctx, arr, j, j+1, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleFillColor, RVsettings.rectangleOutlineColor, RVsettings.backgroundColor)
            Utils.swap(arr, j, j+1)
            await Utils.timer(RVsettings.swapTime)
          } else { 
            RVDrawMethods.drawRectangleStoppedCompare(canvas, ctx, arr, j, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleOutlineColor, RVsettings.rectangleFillColor, RVsettings.backgroundColor)
            RVDrawMethods.drawRectangleStoppedCompare(canvas, ctx, arr, j+1, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleOutlineColor, RVsettings.rectangleFillColor, RVsettings.backgroundColor)
          }
        }
        // arr[ arr.length - 1 - i ] is in the correct spot 
        RVDrawMethods.drawRectangleCorrectSpot(canvas, ctx, arr, arr.length - 1 - i, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleOutlineColor, RVsettings.rectangleCorrectSpotColor, RVsettings.backgroundColor)
        await Utils.timer(RVsettings.correctSpotTime)
      }
  }
}