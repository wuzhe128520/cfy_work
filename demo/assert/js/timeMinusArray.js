/**
 * @param timeStrBegin: 开始时间字符串
 * @param timeStrEnd: 结束时间字符串
 * @param option: obj;其他参数,默认接收dateType属性表示计算类别:  1代表计算年、2代表计算年月、3代表计算年月日
 * @return array;根据dateType的不同，返回不同的日期数组
 * 依赖: jquery,moment.min.js
 * 调用示例：getTimeMinusArray(20150101, 201601201, {dateType: 1});
 */
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
		
		//计算后的日期数组(此函数的返回值)
		dateAry = [];

		//以年计算
		if(option.dateType === 1) {
			for(var y = beginYear; y <= endYear; y++ ) {
				dateAry.push(y.toString());
			}
		}
		

		//以月计算
		if(option.dateType === 2){

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
						dateAry.push(parseInt((i+String(j < 10?'0' + j: j)), 10));
					}

				}
		}

		//以天计算
		/*
		* 需求：
		*   获取两个时间点之间的每一天
		*
		* */
		if(option.dateType === 3){

			var difDay = momentTimeTwo.diff(momentTimeOne,'days'),//两时间相差的天
				beginDay = momentTimeOne.date(),            //开始的日期的天
				endDay = momentTimeTwo.date(),           //结束日期的天
				countDay = 0;

				//循环年
				debugger;
				for(var currentYear = beginYear; currentYear <= endYear; currentYear++) {

					/*默认起始结束月份为1月和12月*/
					var begin = 1,
						 end =12;

					/*循环月 begin*/
					if(currentYear === beginYear) {
						begin = beginMonth;
					}

					if(currentYear === endYear){
						end = endMonth;
					}

					for(var currentMonth = begin; currentMonth <= end; currentMonth++) {

							var lastDayMoment = {},
								lastDay = 0,

								//默认开始的天为每月1号(除了开始月份)
								newDay = 1;

							//如果是起始时间，则开始天数为beginDay
							if(currentYear === beginYear && currentMonth === begin){
								newDay = beginDay;
							}

							/*计算结束天数，有两种情况：
							    1、如果开始年份和结束年份相等:
							        则只需要比较月份是否相同

							    2、如果开始年份和结束年份不相等；
							        则需要同时比较年份和月份是否相等
						     */
							if(beginYear === endYear) {
								if( currentMonth === endMonth) {
									lastDay = endDay;
								} else {
									lastDay = calcMonthDays(currentYear, currentMonth);
								}
							} else {
								if( currentYear === endYear && currentMonth === endMonth) {
									lastDay = endDay;
								} else {
									lastDay = calcMonthDays(currentYear, currentMonth);
								}
							}
							for(var currentDay = newDay; currentDay <= lastDay ; currentDay++ ) {
								dateAry.push(currentYear.toString() + (currentMonth < 10?'0' + currentMonth: currentMonth.toString()) + (currentDay < 10 ? '0' + currentDay : currentDay.toString()));
								countDay++;
							}
					}
				}
		}

		//计算当前月份有多少天
		function calcMonthDays(currentYear, currentMonth) {
			return moment(currentYear.toString() + (currentMonth < 10 ? '0' +currentMonth:currentMonth.toString()),'YYYY-MM').endOf('month').date();
		}
		console.log('参考天数：', difDay,'实际计算天数：' + countDay + '返回数组: \r\n'+dateAry);
		return dateAry;
}