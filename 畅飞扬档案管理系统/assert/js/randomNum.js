/**
 *
 * @param minNum: 最小值
 * @param maxNum: 最大值
 * @returns {number} 随机返回一个处于最小值和最大值之间的数(不包含最大值)
 *
 */
function randomNum(minNum, maxNum) {
	if (! (maxNum < minNum)) return Math.floor(Math.random() * (maxNum - minNum) + minNum)
}