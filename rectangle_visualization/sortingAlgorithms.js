/**
 * Bundle of functions that implements a sorting algorithm visualization using RVDrawMethods, Utils, and choice global variables 
 */
class RVsortingAlgorithms {
  /** Implements rectangle visualization for bubble sort algorithm
   * 
   * @param { number[] } arr array to be sorted 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { string } backgroundColor background color of the canvas
   * @param { string } rectangleOutlineColor fill outline color of the rectangle 
   * @param { string } rectangleFillColor default fill color of the rectangle 
   * @param { string } rectangleComparedColor color of rectangle when it is being compared 
   * @param { string } rectangleWrongSpotColor color of rectangle when it is known to be in the wrong spot
   * @param { string } rectangleCorrectSpotColor color of rectangle when it is known to be in the right spot
   * @param { number } compareTime time in ms paused after drawRectangleComparing is called 
   * @param { number } wrongSpotTime time in ms paused after drawRectangleWrongSpot is called 
   * @param { number } correctSpotTime time in ms paused after drawRectangleCorrectSpot is called 
   * @param { number } swapTime time in ms paused after drawRectangleSwap is called 
   * @param { number } stoppedCompareTime time in ms paused after drawRectangleStoppedCompare is called 
   * @param { number } padding number of pixels between each rectangle in the batch 
   */
  static async bubbleSort(arr, canvas, ctx, rectangleMaxHeight, backgroundColor, rectangleOutlineColor, rectangleFillColor, rectangleComparedColor, rectangleWrongSpotColor, rectangleCorrectSpotColor, compareTime, wrongSpotTime, correctSpotTime, swapTime, stoppedCompareTime, padding) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          // comparing arr[j], arr[j+1]
          RVDrawMethods.drawRectangleComparing(canvas, ctx, arr, [j, j+1], rectangleMaxHeight, padding, rectangleComparedColor, rectangleOutlineColor, backgroundColor)
          await Utils.timer(compareTime)
    
          if(arr[j] > arr[j+1]) {
    
            // j+1 in wrong spot 
            RVDrawMethods.drawRectangleWrongSpot(canvas, ctx, arr, j+1, padding, rectangleMaxHeight, rectangleWrongSpotColor, rectangleOutlineColor, backgroundColor)
            await Utils.timer(wrongSpotTime)
    
            // swap 
            RVDrawMethods.drawRectangleSwap(canvas, ctx, arr, j, j+1, padding, rectangleMaxHeight, rectangleFillColor, rectangleOutlineColor, backgroundColor)
            Utils.swap(arr, j, j+1)
            await Utils.timer(swapTime)
          } else { 
            // unread
            RVDrawMethods.drawRectangleStoppedCompare(canvas, ctx, arr, j, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleFillColor, backgroundColor)
            RVDrawMethods.drawRectangleStoppedCompare(canvas, ctx, arr, j+1, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleFillColor, backgroundColor)
            await Utils.timer(stoppedCompareTime)
          }
        }
        // arr[ arr.length - 1 - i ] is in the correct spot 
        RVDrawMethods.drawRectangleCorrectSpot(canvas, ctx, arr, arr.length - 1 - i, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleCorrectSpotColor, backgroundColor)
        await Utils.timer(correctSpotTime)
      }
  }

  /** Implements rectangle visualization for selection sort algorithm
   * 
   * @param { number[] } arr array to be sorted 
   * @param { Element } canvas canvas to be drawn on 
   * @param { CanvasRenderingContext2D } ctx canvas rendering context to be drawn on 
   * @param { number } rectangleMaxHeight maximum height a rectangle can be in pixels
   * @param { string } backgroundColor background color of the canvas
   * @param { string } rectangleOutlineColor fill outline color of the rectangle 
   * @param { string } rectangleFillColor default fill color of the rectangle 
   * @param { string } rectangleComparedColor color of rectangle when it is being compared 
   * @param { string } rectangleWrongSpotColor color of rectangle when it is known to be in the wrong spot
   * @param { string } rectangleCorrectSpotColor color of rectangle when it is known to be in the right spot
   * @param { number } compareTime time in ms paused after drawRectangleComparing is called 
   * @param { number } wrongSpotTime time in ms paused after drawRectangleWrongSpot is called 
   * @param { number } correctSpotTime time in ms paused after drawRectangleCorrectSpot is called 
   * @param { number } swapTime time in ms paused after drawRectangleSwap is called 
   * @param { number } stoppedCompareTime time in ms paused after drawRectangleStoppedCompare is called 
   * @param { number } padding number of pixels between each rectangle in the batch 
   */
   static async selectionSort(arr, canvas, ctx, rectangleMaxHeight, backgroundColor, rectangleOutlineColor, rectangleFillColor, rectangleComparedColor, rectangleWrongSpotColor, rectangleCorrectSpotColor, compareTime, wrongSpotTime, correctSpotTime, swapTime, stoppedCompareTime, padding) {
    let i, j, min_idx;
    let n = arr.length
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        let new_min = false 
        for (j = i + 1; j < n; j++) {
          // comparing arr[j], arr[min_idx]
          RVDrawMethods.drawRectangleComparing(canvas, ctx, arr, [j, min_idx], rectangleMaxHeight, padding, rectangleComparedColor, rectangleOutlineColor, backgroundColor)
          await Utils.timer(compareTime)

          if (arr[j] < arr[min_idx]) {
              min_idx = j;
              new_min = true 
          }
        }
        
        if (new_min) {
          // arr[min_idx] is in the wrong spot 
          RVDrawMethods.drawRectangleWrongSpot(canvas, ctx, arr, min_idx, padding, rectangleMaxHeight, rectangleWrongSpotColor, rectangleOutlineColor, backgroundColor)
          await Utils.timer(wrongSpotTime)
        }

        // Swap the found minimum element with the first element
         RVDrawMethods.drawRectangleSwap(canvas, ctx, arr, min_idx, i, padding, rectangleMaxHeight, rectangleFillColor, rectangleOutlineColor, backgroundColor)
         Utils.swap(arr,min_idx, i);
         await Utils.timer(swapTime)

         // arr[i] is in correct spot 
         RVDrawMethods.drawRectangleCorrectSpot(canvas, ctx, arr, i, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleCorrectSpotColor, backgroundColor)
         await Utils.timer(correctSpotTime)

         // unread rectangles ahead 
         for (let v = i + 1; v < n; v++) {
          RVDrawMethods.drawRectangleStoppedCompare(canvas, ctx, arr, v, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleFillColor, backgroundColor)
         }
         await Utils.timer(stoppedCompareTime)


    }

     // arr[n+1] is in correct spot 
     RVDrawMethods.drawRectangleCorrectSpot(canvas, ctx, arr, n-1, padding, rectangleMaxHeight, rectangleOutlineColor, rectangleCorrectSpotColor, backgroundColor)
     await Utils.timer(correctSpotTime)

   }
}