const canvas = document.querySelector('canvas#main')
const ctx = canvas.getContext('2d')
const FPS = 15
let mouseX = 0
let mouseY = 0
let RVsettings
let numbers

// Notes 
// rectangle states: default, being compared,  identified as being in wrong spot and to be moved, in correct spot
// i am considering removing rectangleOutlineColor as an option 

// What to do next: 
// Implement more sorting algorithms (like 4-6 total)
// Create UI for customization (sketch in figma first)
// consider removing the 'rectangle' prefix in ./rectangle_visualization/settings.json as it is redundant 
// consider changing wipeoutColor to just backgroundColor
// make params align with settings.json formatting so we can just do destructuring 
// consider having a red line go through the rectangles when reading instead and when sorting is done

// Completed: 
// document utils 
// give bubblesort alg actual parameters 

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

async function onStart() {
  await loadRVSettingsJSONIntoVar()
  numbers = Utils.generateNumbers(RVsettings.numberOfRectangles, 0.01, 1)
  let paramValues = [...Object.values(RVsettings)]

  RVDrawMethods.drawBackground(canvas, RVsettings.backgroundColor)

  RVDrawMethods.drawRectangleBatch(canvas, ctx, numbers, RVsettings.rectangleFillColor, RVsettings.rectangleOutlineColor, RVsettings.padding, RVsettings.rectangleMaxHeight, RVsettings.ignorePaddingErrorOn, RVsettings.ignoreSmallWidthErrorOn)

  RVsortingAlgorithms.selectionSort(numbers, canvas, ctx, ...paramValues)


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