//最简单的折线图
var chart4 = new CfyCharts('main4', {
	text: "王者荣耀各类型英雄出场次数",
	type: 'line',
	tooltip: {
		trigger: 'none',
		axisPointer: {
			type: 'cross'
		}
	},
	seriesName: '出场次数',
	legendData: ['出场次数'],
	seriesData: [100, 200, 300, 150, 250],
	xAxis: {
		type: 'category',
		data: ['打野', '肉', '辅助', '射手', '法师'],
		axisTick: {
			alignWithLabel: false, //保证刻度线和标签对齐
			interval: 0 //强制显示所有刻度
		},
		axisPointer: {
			label: {

				//文本标签文字的格式化器
				formatter: function (params) { //params 包含：value轴为当前值，axis.type为category时，值为axis.data里的数值。如果aixs.type为'time,其值为时间戳';
					return '出场次数  ' + params.value
						+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
				}
			}
		}
	},
	yAxis: {
		type: 'value',
	}
});
chart4.showEcharts();


//最简单的饼图
var chart = new CfyCharts('main', {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	text: "王者荣耀各类型英雄胜率",
	type: 'pie',
	seriesName: '英雄类别',
	legendData: ['打野', '肉', '辅助', '射手', '法师'],
	seriesData: [
		{value: 20, name: '打野'},
		{value: 30, name: '肉'},
		{value: 40, name: '辅助'},
		{value: 50, name: '射手'},
		{value: 60, name: '法师'},
	],
	series: {
		center: ['50%', '60%']
	}
});
chart.showEcharts();

//最简单的折线图
var chart4 = new CfyCharts('main4', {
	text: "王者荣耀各类型英雄出场次数",
	type: 'line',
	tooltip: {
		trigger: 'none',
		axisPointer: {
			type: 'cross'
		}
	},
	seriesName: '出场次数',
	legendData: ['出场次数'],
	seriesData: [100, 200, 300, 150, 250],
	xAxis: {
		type: 'category',
		data: ['打野', '肉', '辅助', '射手', '法师'],
		axisTick: {
			alignWithLabel: false, //保证刻度线和标签对齐
			interval: 0 //强制显示所有刻度
		},
		axisPointer: {
			label: {

				//文本标签文字的格式化器
				formatter: function (params) { //params 包含：value轴为当前值，axis.type为category时，值为axis.data里的数值。如果aixs.type为'time,其值为时间戳';
					return '出场次数  ' + params.value
						+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
				}
			}
		}
	},
	yAxis: {
		type: 'value',
	}
});
chart4.showEcharts();
