const canvas = document.querySelector('canvas#main')
const ctx = canvas.getContext('2d')
const FPS = 15
let mouseX = 0
let mouseY = 0
let RVsettings
let numbers

// Notes 
// rectangle states: default, being compared,  identified as being in wrong spot and to be moved, in correct spot

/** Loads the settings for rectangle visualization (json file) into the RVsettings global object initialized in main.js. Note that RVsettings.rectangleMaxHeight is a number between 0 and 1 
 * 
 */
async function loadRVSettingsJSONIntoVar() {
  await fetch("./rectangle_visualization/settings.json")
    .then(response => response.json())
    .then(data => { RVsettings = data })
  RVsettings.rectangleMaxHeight *= canvas.height 
}

onmousemove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
}

/**
 * Code from https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/ that implements a bubble sort. Manipulates the array given 
 * @param { number[] } arr Array to be sorted 
 */
function bubbleSort(arr) {
    for(var i = 0; i < arr.length; i++) {
       
      // Last i elements are already in place 
      for(var j = 0; j < ( arr.length - i -1 ); j++) {
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        // comparing arr[j], arr[j+1]
        if(arr[j] > arr[j+1]) {
           
          // If the condition is true then swap them
          // j+1 in wrong spot 
          Utils.swap(arr, j, j+1)
        }
      }
      // arr[ arr.length - 1 - i ] is in the correct spot 
    }

}

async function bubbleSortAnim(arr) {
  for(var i = 0; i < arr.length; i++) {
    for(var j = 0; j < ( arr.length - i -1 ); j++) {
      // comparing arr[j], arr[j+1]
      RVDrawMethods.drawRectangleComparing(canvas, ctx, arr, [j, j+1], RVsettings.rectangleMaxHeight, RVsettings.padding, RVsettings.rectangleComparedColor, RVsettings.rectangleOutlineColor, RVsettings.backgroundColor)
      await Utils.timer(RVsettings.compareTime)

      if(arr[j] > arr[j+1]) {

        // j+1 in wrong spot 
        RVDrawMethods.drawRectangleWrongSpot(canvas, ctx, arr, j+1, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleWrongSpotColor, RVsettings.backgroundColor)
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
    RVDrawMethods.drawRectangleCorrectSpot(canvas, ctx, arr, arr.length - 1 - i, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.rectangleCorrectSpotColor, RVsettings.backgroundColor)
  }

}


async function onStart() {
  await loadRVSettingsJSONIntoVar()

  RVDrawMethods.drawBackground(canvas, RVsettings.backgroundColor)

  numbers = RVDrawMethods.drawRectangleBatch(canvas, ctx, RVsettings.numberOfRectangles, RVsettings.rectangleFillColor, RVsettings.rectangleOutlineColor, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.ignorePaddingErrorOn, RVsettings.ignoreSmallWidthErrorOn)

  // RVDrawMethods.replaceRectangle(canvas, ctx, RVsettings.numberOfRectangles, 2, RVsettings.rectangleMaxHeight, 0.5, RVsettings.padding, RVsettings.backgroundColor, RVsettings.rectangleFillColor, RVsettings.rectangleOutlineColor)

  bubbleSortAnim(numbers)


}


async function update() {
  
}

async function animationLoop() {
  await onStart()
  while (true) {
    await update()
    await Utils.timer(1000/FPS)
  }
}
animationLoop()