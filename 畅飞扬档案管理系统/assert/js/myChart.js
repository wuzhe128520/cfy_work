(function($,chart, factory) {
	return factory(chart, $);
})(jQuery,echarts, function(chart, $) {

	/*
	设置echarts的option
	*/
	function MyCharts(targetId, option) {

		MyCharts.__DEFAULT_OPTION__ = {

			//图表的标题
			title: {
				text: option.text,
				left: 'center', //居中text,
				top: 'top'
			},

			//提示框
			tooltip : {

			},

			//图例
			legend: {
				//图例列表的布局朝向
				orient: 'vertical',

				//图例组件离容器左侧的距离
				left: 'left',
				data: option.legendData
			},

			//最重要的数据
			series:
				{
					name: option.seriesName||'', //移动到图形上显示的名字(与tooltip有关联)

					//显示饼图
					type: option.type||'pie',

					data: option.seriesData||[]
				}

		};

		this.targetId = targetId;
		this.option = $.extend(true, MyCharts.__DEFAULT_OPTION__,option);
		this.chart = echarts.init(document.getElementById(targetId));
	}

	MyCharts.prototype = {
		showEcharts: function() {
			this.chart.setOption(this.option);
		},
		updateEchartsView: function(newOption) {
			$.extend(true, this.option, newOption);
			this.showEcharts();
		},
		getOption: function() {
			return this.option;
		}
	};

	return window.CfyCharts = MyCharts;
});