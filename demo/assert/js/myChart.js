/**
 *  依赖于echartOption.js
 */
(function($,chart, factory, setChartOption) {
	return factory(chart, $, setChartOption);
})(jQuery,echarts, function(chart, $, setChartOption) {

	/*
	设置echarts的option
	*/
	function MyCharts(targetId, option, chartType) {
		this.targetId = targetId;
		this.option = setChartOption(chartType, option);
		this.chart = echarts.init(document.getElementById(targetId));
	}

	MyCharts.prototype = {
		showEcharts: function() {
			this.chart.setOption(this.option);
		},
		updateEchartsView: function(newOption) {
			this.removeEchartsData();
			$.extend(true, this.option, newOption);
			this.showEcharts();
		},
		getOption: function() {
			return this.option;
		},
		removeEchartsData: function() {
			if(this.series && this.series.data){
				this.series.data = null;
			}
			if(this.legend && this.legend.data){
				this.legend.data = null;
			}
			if(this.xAxis && this.xAxis.data) {
				this.xAxis.data = null;
			}
			if(this.yAxis && this.yAxis.data) {
				this.yAxis.data = null;
			}
		}
	};

	return window.CfyCharts = MyCharts;
},setChartOption);