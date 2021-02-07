/**
 * Function generates the radndom number between 1 and the max parameter passed
 * @param max limit to generate the random number
 */
export function getRandomNumber(max: number):number {
    return Math.floor(Math.random() * max);
}

/**
 * Function returns the description with ... after specified length
 * @param description description of a particular film
 * @param length length after the description should be truncated
 */
export function getTruncatedDescription(description:string, length:number):string {
    return description?.length > length ? description.substr(0, length - 1) + "..."  : description;
}