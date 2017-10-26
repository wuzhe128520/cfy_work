/**
 *
 * @param minNum: 最小值
 * @param maxNum: 最大值
 * @param isReturnedFloat: 是否返回浮点数
 * @returns {number} 随机返回一个处于最小值和最大值之间的数(不包含最大值)
 *
 */
function randomNum(minNum, maxNum, isReturnedFloat) {
	if (maxNum < minNum){return};
	if(isReturnedFloat){
		return  (Math.random() * (maxNum - minNum) + minNum).toFixed(2);
	}
	return Math.floor(Math.random() * (maxNum - minNum) + minNum);
}