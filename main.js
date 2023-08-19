const canvas = document.querySelector('canvas#main')
const ctx = canvas.getContext('2d')
const FPS = 15
let mouseX = 0
let mouseY = 0




/** Loads the settings for rectangle visualization (json file) into the RVsettings global object initialized in main.js. Note that RVsettings.rectangleMaxHeight is a number between 0 and 1 
 * 
 */


onmousemove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
}

async function onStart() {
  let settings = await RVSettings.generateFromJSON("./rectangle_visualization/settings.json", canvas.height)
  let numbers = Utils.generateNumbersLinear(settings.numberOfRectangles)

  let drawer = new RVDrawMethods(canvas, ctx, settings)
  drawer.drawBackground()
  drawer.drawRectangleBatch(numbers)

  let sorter = new RVsortingAlgorithms(drawer)
  sorter.bubbleSort(numbers)

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