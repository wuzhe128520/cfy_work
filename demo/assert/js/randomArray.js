/**
 *
 * @param options: 对象。包括最小值，最大值，长度等值
 * @returns {Array}
 * 随机生成拥有length个元素的数组
 */
function getRandomArray(options) {

	var defaultOption = {
			min: 1||options.min,
			max: 100||options.max,
			length: 0||options.length
		},
		ary = [];

	$.extend(defaultOption, options);

	for (var i = 0; i < defaultOption.length; i++) {
		//随机获取length个数值
		if(defaultOption.isFloat) {
			ary.push(randomNum(defaultOption.min, defaultOption.max, true));
		} else {
			ary.push(randomNum(defaultOption.min, defaultOption.max));
		}

	}
	return ary;
}