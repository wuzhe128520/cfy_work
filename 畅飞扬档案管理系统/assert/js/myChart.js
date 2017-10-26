/*
 需求：
    根据type类型来创建echarts的最基础的option配置;
 分析：
	 1、series的data 默认以数组形式给出么？xAxis的值默认也以数组形式给出么？
	 2、饼状图(环形图)是不需要轴线的，只需要series参数
	 3、能画出一个图表需要的最基础的参数(骨架):
	    var option = {

	    };

 */

(function($,chart, factory) {
	return factory(chart, $);
})(jQuery,echarts, function(chart, $) {

	/*
	设置echarts的option
	*/
	function setOption(type) {

		//一般都具有的配置
		/*
		* 0：柱状图配置
		* 1：折线图(包括曲线图)配置
		* 2：饼图配置
		* 3：环形图配置
		* */
		MyCharts.__DEFAULT_OPTION__ = {
			title: {
				text: option.text,
				left: 'center', //居中text,
				top: 'top'
			},
			tooltip : {

			},
			legend: {
				//图例列表的布局朝向
				orient: 'vertical',

				//图例组件离容器左侧的距离
				left: 'left',
				data: option.legendData
			},
			series:
				{
					name: option.seriesName||'', //移动到图形上显示的名字

					//显示饼图
					type: option.type||'pie',

					data: option.seriesData||[]
				}

		};
	}

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