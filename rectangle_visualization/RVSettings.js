class RVSettings {
    /**
     * 
     * @param {number} rectangleMaxHeight 
     * @param {string} backgroundColor 
     * @param {string} rectangleOutlineColor 
     * @param {string} rectangleFillColor 
     * @param {string} rectangleComparedColor 
     * @param {string} rectangleWrongSpotColor 
     * @param {string} rectangleCorrectSpotColor 
     * @param {number} compareTime 
     * @param {number} wrongSpotTime 
     * @param {number} correctSpotTime 
     * @param {number} swapTime 
     * @param {number} stoppedCompareTime 
     * @param {number} padding 
     * @param {number} numberOfRectangles 
     * @param {boolean} ignorePaddingErrorOn 
     * @param {boolean} ignoreSmallWidthErrorOn 
     */
    constructor(rectangleMaxHeight, backgroundColor, rectangleOutlineColor, rectangleFillColor, rectangleComparedColor, rectangleWrongSpotColor, rectangleCorrectSpotColor, compareTime, wrongSpotTime, correctSpotTime, swapTime, stoppedCompareTime, padding, numberOfRectangles, ignorePaddingErrorOn, ignoreSmallWidthErrorOn) {
        this.rectangleMaxHeight = rectangleMaxHeight
        this.backgroundColor = backgroundColor 
        this.rectangleOutlineColor = rectangleOutlineColor
        this.rectangleFillColor = rectangleFillColor
        this.rectangleComparedColor = rectangleComparedColor
        this.rectangleWrongSpotColor = rectangleWrongSpotColor 
        this.rectangleCorrectSpotColor = rectangleCorrectSpotColor
        this.compareTime = compareTime
        this.wrongSpotTime = wrongSpotTime
        this.correctSpotTime = correctSpotTime   
        this.swapTime = swapTime 
        this.stoppedCompareTime = stoppedCompareTime
        this.padding = padding
        this.numberOfRectangles = numberOfRectangles
        this.ignorePaddingErrorOn = ignorePaddingErrorOn
        this.ignoreSmallWidthErrorOn = ignoreSmallWidthErrorOn   
    }
    static async generateFromJSON(filePath, canvasHeight) {
        let jsonFileSettings
        await fetch(filePath)
            .then(response => response.json())
            .then(data => { jsonFileSettings = data })
        jsonFileSettings.rectangleMaxHeight *= canvasHeight
        return new RVSettings(
            jsonFileSettings.rectangleMaxHeight,
            jsonFileSettings.backgroundColor, 
            jsonFileSettings.rectangleOutlineColor,
            jsonFileSettings.rectangleFillColor, 
            jsonFileSettings.rectangleComparedColor,
            jsonFileSettings.rectangleWrongSpotColor,
            jsonFileSettings.rectangleCorrectSpotColor, 
            jsonFileSettings.compareTime,
            jsonFileSettings.wrongSpotTime,
            jsonFileSettings.correctSpotTime,
            jsonFileSettings.swapTime,
            jsonFileSettings.stoppedCompareTime,
            jsonFileSettings.padding,
            jsonFileSettings.numberOfRectangles,
            jsonFileSettings.ignorePaddingErrorOn,
            jsonFileSettings.ignoreSmallWidthErrorOn
        )

    }
}