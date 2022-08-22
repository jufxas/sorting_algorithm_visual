// collection of utility functions 
class Utils {
    /**
     * Generates a list of random numbers of length count between 0 and 1 inclusive 
     * @param { number } count Length of the list of random numbers 
     * @return { number[] } List of random numbers between 0 and 1 
     */
    static generateNumbers(count) { 
        let numbersArray = []
        for (let i = 0; i < count; i++) {
            numbersArray.push(Math.random())
        }
        return numbersArray
    }

    /**
     * First, generates a list of numbers of constant slope, then, shuffles that list 
     * @param { number } count Length of the list of random numbers 
     * @param { number? } a minimum value of the list; default is 0 
     * @param { number? } b maximum value of the list; default is 1 
     * @return { number[] } List of random numbers between 0 and 1 
     */
    static generateNumbersLinear(count, a = 0, b = 1) {
        let numbersArray = []
        let slope = (b - a) / count 
        for (let i = 0; i < count; i++) {
            numbersArray.push(a + slope * i)
        }
        return Utils.shuffleArray(numbersArray)
    }

    /**
     * Shuffles the elements of an array 
     * @param { number[] } array 
     * @returns { number[] } shuffled array 
     */
    static shuffleArray(array) {
        let currentIndex = array.length,  randomIndex
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array
      }

    /**
     * Swaps two elements in an array based off array indices
     * Ex: x=[1,2,3], swap(x, 0, 1) -> x=[2,1,3]
     * @param { any[] } array - target array to swap two indices  
     * @param { number } a - index of first element
     * @param { number } b - index of second element
     */
    static swap(array, a, b) {
        [array[a], array[b]] = [array[b], array[a]]
    }

    /**
     * Delays the program for some given input
     * @param { number } ms how many milliseconds the program will wait for 
     * @returns new promise to incur waiting
     */
    static timer(ms) {
        if (ms == 0) return 
        return new Promise(res => setTimeout(res, ms))
    } 
}