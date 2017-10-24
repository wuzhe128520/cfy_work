function setXyAxisData( myChart,beginTimeStr, endTimeStr, isFloat) {

	var timeArray = getTimeMinusArray(beginTimeStr,endTimeStr),
		timeArrayLength = timeArray.length,
		newData =  getRandomArray({
			length: timeArrayLength,
			min: myChart.getOption().yAxis[0].min,
			max: myChart.getOption().yAxis[0].max,
			isFloat: isFloat
		});
	console.log(newData);
	myChart.setOption({
		xAxis: [
			{
				data: timeArray,
			},
			{
				data: timeArray,
			}
		],
		series: [
			{
				data: newData,
			},
			{
				data: getRandomArray({
					length: timeArrayLength,
					min: myChart.getOption().yAxis[0].min,
					max: myChart.getOption().yAxis[0].max,
					isFloat: isFloat
				})
			}
		],
	});

}