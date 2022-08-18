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
        return new Promise(res => setTimeout(res, ms))
    } 
}