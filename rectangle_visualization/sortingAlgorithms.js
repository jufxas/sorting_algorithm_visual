/**
 * Bundle of functions that implements a sorting algorithm visualization using RVDrawMethods, Utils, and choice global variables 
 */
class RVsortingAlgorithms {
  /**
   * 
   * @param {RVDrawMethods} rvDrawer 
   */
  constructor(rvDrawer) {
    this.rvDrawer = rvDrawer
  }
  /** Implements rectangle visualization for bubble sort algorithm
   * 
   * @param { number[] } arr array to be sorted 
   */
  async bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          // comparing arr[j], arr[j+1]
          this.rvDrawer.drawRectangleComparing(arr, [j, j + 1])
          await Utils.timer(this.rvDrawer.settings.compareTime)
    
          if(arr[j] > arr[j+1]) {
            
            // j+1 in wrong spot
            this.rvDrawer.drawRectangleWrongSpot(arr, j + 1)
            await Utils.timer(this.rvDrawer.settings.wrongSpotTime)
    
            // swap 
            this.rvDrawer.drawRectangleSwap(arr, j, j+1)
            Utils.swap(arr, j, j + 1)
            await Utils.timer(this.rvDrawer.settings.swapTime)

          } else { 
            // unread
            this.rvDrawer.drawRectangleStoppedCompare(arr, j)
            this.rvDrawer.drawRectangleStoppedCompare(arr, j + 1)
            await Utils.timer(this.rvDrawer.settings.stoppedCompareTime)
          }
        }
        // arr[ arr.length - 1 - i ] is in the correct spot 
        this.rvDrawer.drawRectangleCorrectSpot(arr, arr.length - 1 - i)
        await Utils.timer(this.rvDrawer.settings.correctSpotTime)
      }
  }

  /** Implements rectangle visualization for selection sort algorithm
   * 
   * @param { number[] } arr array to be sorted 
   */
  async selectionSort(arr) {
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
          this.rvDrawer.drawRectangleComparing(arr, [j, min_idx])
          await Utils.timer(this.rvDrawer.settings.compareTime)

          if (arr[j] < arr[min_idx]) {
              min_idx = j;
              new_min = true 
          }
        }
        
        if (new_min) {
          // arr[min_idx] is in the wrong spot 
          this.rvDrawer.drawRectangleWrongSpot(arr, min_idx)
          await Utils.timer(this.rvDrawer.settings.wrongSpotTime)
        }

        // Swap the found minimum element with the first element
         this.rvDrawer.drawRectangleSwap(arr, min_idx, i)
         Utils.swap(arr, min_idx, i);
         await Utils.timer(this.rvDrawer.settings.swapTime)

         // arr[i] is in correct spot 
        this.rvDrawer.drawRectangleCorrectSpot(arr, i)
        await Utils.timer(this.rvDrawer.settings.correctSpotTime)

         // unread the rectangles ahead 
         for (let v = i + 1; v < n; v++) {
          this.rvDrawer.drawRectangleStoppedCompare(arr, v)
         }
         await Utils.timer(this.rvDrawer.settings.stoppedCompareTime)
    }

     // arr[n-1] is in correct spot 
    this.rvDrawer.drawRectangleCorrectSpot(arr, n-1)
    await Utils.timer(this.rvDrawer.settings.correctSpotTime)

   }  
}