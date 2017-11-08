/*
 需求：
    根据type类型来创建echarts的最基础的option配置;
 分析：
	 1、series的data 默认以数组形式给出么？xAxis的值默认也以数组形式给出么？
	 2、饼状图(环形图)是不需要轴线的，只需要series参数
	 3、能画出一个图表需要的最基础的参数(骨架):
	    var option = {
	        tooltip: {
				//trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			text: "图表的主标题",
			type: '图表的类型',
			seriesName: '鼠标移上去显示的信息',
			legendData: ['图例', '相关', '的', '数组', '数据'],
			seriesData: [
							{value: 20, name: '图例'},
							{value: 30, name: '相关'},
							{value: 40, name: '的'},
							{value: 50, name: '数组'},
							{value: 60, name: '数据'}
						  ],

	    };

 */
/**
 *
 * @param type
 * 1：柱状图配置
 * 2：折线图(包括曲线图)配置
 * 3：饼图配置
* @param option: 用户传递过来的新配置
 *
 * 传入类型、传入相关的数据展示图表
 */
function setOption(types, option) {

	//需要作为返回值返回的新的配置信息
	var newOption = {},

		//默认显示最简单的饼图
		__DEFAULT_OPTION = {
			title: {
				text: option.text||"图形的标题",
				left: 'center',
				top: 'top'
			},
			tooltip: {

			},
			legend: {
				//图例列表的布局朝向
				orient: 'vertical',

				//图例组件离容器左侧的距离
				left: 'left',
				data: option.legendData
			},
			series: {
				name: option.seriesName||'', //移动到图形上显示的名字(与tooltip有关联)

				//显示饼图
				type: option.type||'pie',

				data: option.seriesData||[]
			}
		};

	//将属性合并到newOption
	$.extend(true, newOption, __DEFAULT_OPTION, option);

	var forceAttrs = {};
	switch (types) {

		//如果是柱状图
		case 1:

			//x轴的轴名数组(可能存在多根x轴线,相应的series.data也会有多个维度的数组)
			var series = newOption.series,
				xAxis = newOption.xAxis;

			//必须设置的属性
			forceAttrs = {

				//series的name与legend关联
				series: {
					type: 'bar',
					name: newOption.legend.data[0] //单个图例的情况下
				},
				yAxis: {
					type : 'value'
				}
			};

			$.extend(true,newOption,forceAttrs);
			if(!series){
				throw new Error('series参数不能为空');
			}

			if(_.isArray(series)){

				//如果有多个x轴存在,循环x轴(即双曲线或多曲线)
				var manyXattrs = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
							show: 'false'
						},
						grid: {
							containLabel: true
						}
					}
				};

				var legendDataDouble = newOption.legend.data;

				for(var j = 0,l = series.length; j < l; j++) {
					//将legened.data与series.data关联起来
					series[j]['type'] = "bar";
					series[j]['name'] = legendDataDouble[j];
				}
				$.extend(true,newOption,{series: series}, manyXattrs);
			}
			break;

		//如果是折线图(先以单个x轴为主)
		case 2:
			var xAxisLine = newOption.xAxis,
				legendLine = newOption.legend.data,
				seriesLine = newOption.series;

			newOption['yAxis'] = {};
			newOption['tooltip'] = {
				trigger: 'none',
				axisPointer: {
					type: 'cross'
				}
			};

			//如果x轴是数组形式，说明是多条曲线(通过series来判断是否是多条曲线，通过xAxis的length来判断是否是多条x轴的曲线)
			//如果是多条曲线、legend和series都应该是数组形式
			if(_.isArray(seriesLine)) {

				for(var m = 0, s = seriesLine.length; m < s; m++) {
					seriesLine[m]['name'] = legendLine[m];
					seriesLine[m]['type'] = 'line';
				}

				for(var k = 0,size = xAxisLine.length; k < size;k++) {
					xAxisLine[k]['axisTick'] = {
							alignWithLabel: false, //保证刻度线和标签对齐
							interval: 0 //强制显示所有刻度
					};
					xAxisLine[k]['axisLine'] = {onZero: false};
					xAxisLine[k]['type'] = 'category';
					(function(k){
						xAxisLine[k]['axisPointer'] = {
							label: {
								formatter: function(params){
									return legendLine[k] + ' '+ params.value
										+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
								}
							}
						}
					})(k);
				}

				if (size > 1) {
					//设置多余的x轴都使用第一条x轴的seriesData(否则，鼠标移上去，其他轴的数据显示不了)
					seriesLine[size-1]['xAxisIndex'] = 1;
				}

				$.extend(newOption,{series: seriesLine},{xAxis: xAxisLine});
			}

			if(_.isPlainObject(xAxisLine)){
				forceAttrs = {
					tooltip: {
						axisPointer: {
							type: 'cross'
						}
					},
					series: {
						type: 'line',
						name: newOption.legend.data[0] //单个图例的情况下
					},
					xAxis: {
						axisTick: {
							alignWithLabel: false,
							interval: 0 //强制显示所有刻度
						},
						axisPointer: {
							label: {
								formatter: function(params) {
									return params.value
										+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
								}
							}
						}
					},
					yAxis: {
						type : 'value'
					}
				};
				$.extend(true,newOption,forceAttrs);
				console.log(newOption);
			}
		break;
		default:
			var legendData = newOption.legend.data,
				seriesData = newOption.series.data,
				newSeriesData = [];

			for(var i = 0,length = seriesData.length; i < length; i++) {
				newSeriesData.push({
					value:seriesData[i],
					name: legendData[i]
				})
			}
			newOption.series.data = newSeriesData;
	}
	return newOption;
}