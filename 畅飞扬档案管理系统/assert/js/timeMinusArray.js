/**
 * 需求，根据传入的两个时间字符串，返回他们之间所有的年份和月份组成的一个数组
 * @param timeStrBegin: 开始时间字符串
 * @param timeStrEnd: 结束时间字符串
 * 依赖: moment.min.js
 * 调用示例：getTimeMinusArray(20150101, 201601201)
 */

/*
*目前匹配的是月份;
*匹配周
*匹配日
* (计算两个日期之间有多少天？然后循环月份和一个月的天数)
* */
function getTimeMinusArray(timeStrBegin, timeStrEnd, option) {

	var momentTimeOne = moment(timeStrBegin.toString()),
		momentTimeTwo = moment(timeStrEnd.toString()),

		//开始年份
		beginYear = momentTimeOne.year(),

		//开始月份;
		beginMonth = momentTimeOne.month() + 1,

		//结束年份
		endYear = momentTimeTwo.year(),

		//结束月份
		endMonth = momentTimeTwo.month() + 1,

		timeMonthAry = [];

		//获取月份数据
		/*if(option.dateType === 1){
				var   begin = 1,
						end =12;

				for( var i = beginYear; i<= endYear; i++) {
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
		}*/

		//获取天的数据
		/*
		* 需求：
		*   获取两个时间点之间的每一天
		*
		* */
		if(option.dateType === 2){

			var difDay = momentTimeTwo.diff(momentTimeOne,'days'),//两时间相差的天
				beginDay = momentTimeOne.date(),            //开始的日期的天
				endDay = momentTimeTwo.date(),           //结束日期的天
				countDay = 0;
				//循环年
				for(var currentYear = beginYear; currentYear <= endYear; currentYear++) {

					var begin = 1,
						 end =12;

					//循环月
					if(currentYear === beginYear) {
						begin = beginMonth;
					}

					if(currentYear === endYear){
						end = endMonth;
					}
					for(var currentMonth = begin; currentMonth <= end; currentMonth++) {

							debugger;
							var lastDayMoment = {},
								lastDay = 0,
								newDay = 1;

							if(currentYear === beginYear && currentMonth===begin){
								newDay = beginDay;
							}

							if( currentYear !== endYear) {
								 lastDayMoment = moment(momentTimeOne.format('YYYY-MM')).endOf('month'), //'当前月的最后一天的日期'
								 lastDay = lastDayMoment.date();
							} else {
								lastDay = endDay;
							}

							for(var currentDay = newDay; currentDay <= lastDay ; currentDay++ ) {
								timeMonthAry.push(currentYear.toString() + String(currentMonth < 10?'0' + currentMonth: currentMonth) + currentDay.toString());
								countDay++;
							}
						}
				}
				if(countDay === difDay) {
					alert('计算正确，总共' + difDay + '天');
				} else {
					alert('计算错误' + countDay + "天");
				}
		}


		return timeMonthAry;
}