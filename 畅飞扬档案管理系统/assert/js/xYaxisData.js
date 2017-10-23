function setXyAxisData( myChart,beginTimeStr, endTimeStr) {

	var timeArray = getTimeMinusArray(beginTimeStr,endTimeStr),
		timeArrayLength = timeArray.length;

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
				data: getRandomArray({
					length: timeArrayLength,
					min: myChart.getOption().yAxis[0].min,
					max: myChart.getOption().yAxis[0].max
				})
			},
			{
				data: getRandomArray({
					length: timeArrayLength,
					min: myChart.getOption().yAxis[0].min,
					max: myChart.getOption().yAxis[0].max
				})
			}
		],
	});

}