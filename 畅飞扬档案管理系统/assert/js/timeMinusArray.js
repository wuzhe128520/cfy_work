/**
 * 需求，根据传入的两个时间字符串，返回他们之间所有的年份和月份组成的一个数组
 * @param timeStrBegin: 开始时间字符串
 * @param timeStrEnd: 结束时间字符串
 * 依赖: moment.min.js
 * 调用示例：getTimeMinusArray(20150101, 201601201)
 */
function getTimeMinusArray(timeStrBegin, timeStrEnd) {

	var momentTimeOne = moment(timeStrBegin.toString()),
		momentTimeTwo = moment(timeStrEnd.toString()),

		//开始年份
		beginYear = momentTimeOne.year(),

		//开始月份
		beginMonth = momentTimeOne.month() + 1,

		//结束年份
		endYear = momentTimeTwo.year(),

		//结束月份
		endMonth = momentTimeTwo.month() + 1,

		timeMonthAry = [];

	for( var i = beginYear; i<= endYear; i++) {

		var begin = 1,
			end =12;

		if(i === beginYear) {
			begin = beginMonth;
		}

		if(i === endYear) {
			end = endMonth;
		}

		for(var j = begin; j <= end; j++) {
			timeMonthAry.push(parseInt((i+String(j < 10?'0' + j: j)), 10));
		}

	}
	return timeMonthAry;
}