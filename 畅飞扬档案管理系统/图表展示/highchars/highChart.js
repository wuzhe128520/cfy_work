/*
 * BIHighchart工具类 
 * createTime 2014-12-22
 * author kt
 **/
var BiHighchart={
		//柱状图颜色
		colors:["#B25900","#FFBF00","#401000","#D96D00","#DD3700","#B28500",
	            "#006633","#698C00","#008C69","#6D00D9","#BF00FF","#69008C","#3600D9","#00698C","#B13F0E",
	            "#C57C10","#83A224","#3C8A3E","#449583","#7E9ABC"],
		/*
		   创建柱状图指标
		 @parame  id 展示图表的div的id号
		 @parame  title 大标题
		 @parame  categories ['12/平均','13/平均','1月','2月'];
		 @parame  unit 单位
		 @parame  [
		            {type:"column",name:"自工程不良个熟率",data:[null,null,null,30,30,30,30,30,30,30,30,30,30,30,30]},
		            {type:"pie",name:"平均自工程不良个熟率",data:[15,15,15,null,null,null,null,null,null,null,null,null,null,null,null]},
		            {type:"spline",name:"全球指标",data:[null,null,null,10,10,10,10,10,10,10,10,10,10,10,10]},
		            {type:"spline",name:"2014年upg指标",data:[null,null,null,20,20,20,20,20,20,20,20,20,20,20,20]}]
		 @parame  colors ["#ffffff","#000000","#ffffff","#000000"]
		 @parame  extendProp 属性参考api的格式 
		 */
		creatColumnTarget:function(id,title,categories,unit,series,colors,extendProp){
			if(unit.length<3){
	        	  unit="&nbsp;&nbsp;&nbsp;&nbsp;"+unit;
	          }
			var defaultObj={
	                chart: {
	                    plotBorderColor: '#d4d4d4',
	                    plotBorderWidth: 1,
	                    plotBackgroundColor:'#fdfce6'
	                },
	                title: {
	                    text: title,
	                    style:{
		                    "color": "#1a32b5", 
		                    "fontSize": "24px",
		                    "fontFamily":"微软雅黑"
	                    }
	                },
	                xAxis: {
	                    categories: categories,
	                    lineWidth: 1,
	                    lineColor: '#363636',
	                    tickPosition: 'inside',
	                    labels:{
	                      rotation:-45
	                    }  
	                },
	                tooltip:{
	                	valueSuffix:unit.replace(/&nbsp;/g, ""),
	                	valueDecimals:1
	                },
	                yAxis: {
//	                    stackLabels: {
//	                        enabled: true,
//	                        formatter: function () {
//	                        	var notZeroValue=0;
//	                        	var isNull=true;
//	                        	for(var i=0;i<series.length;i++){
//	                        		var seriesItem=series[i];
//	                        		if(seriesItem.type=="column"&&seriesItem.data[this.x]!=null){
//	                        			isNull=false;
//	                        			notZeroValue=seriesItem.data[this.x];
//	                        			break;
//	                        		}
//	                        	}
//	                        	if(isNull==false){
//	                        		if (this.total == 0) {
//		                                return notZeroValue;
//		                            } else {
//		                            	if(this.total!=null){
//		                            		return Highcharts.numberFormat(this.total, 1);
//		                            	}
//		                                return this.total;
//		                            }
//	                        	}else{
//	                        		return "";
//	                        	}
//	                        	
//	                        }
//	                    },
	                    title: {
			                align: 'high',
			                offset: 0,
			                text: unit,
			                rotation: 0,
			                y: -10,
			                useHTML:true
			            },
			            labels:{
			                x: -3,
			                y: 5
			            },
	                    lineWidth: 1,
	                    lineColor: '#363636',
	                    gridLineColor:'#d4d4d0'
	                },
	                credits: {
	                    enabled: false
	                },
	                plotOptions: {
	                    column: {
	                        stacking: 'normal',
	                        dataLabels: {
	                            enabled: true,
	                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || '#000000',
	                            formatter: function () {
//	                                if (this.total == this.y) {
//	                                    return "";
//	                                } else {
	                                	if(this.y!=null){
	                                		return Highcharts.numberFormat(this.y, 1);
	                                	}
	                                    return this.y;
//	                                }
	                            }
	                        }
	                    },
	                    spline: {
	                    	tooltip:{
	                    		pointFormat:'\u25CF {series.name}'
	                    	},
	                        events: {
	                            click: function (event) {
	                            	var chart= $('#'+id).highcharts();
	                            	var series=chart.series;
	                            	var splineIndex=new Array();
	                            	for(var i=0;i<chart.series.length;i++){
	                            		if(series[i].type=="spline"){
	                            			splineIndex.push(i);
	                            		}
	                            	}
	                            	var noCurrentSeriesCount=0;
	                            	if(splineIndex.length==1){return;}
	                            	for(var i=0;i<splineIndex.length;i++){
	                            	
	                            		if(splineIndex[i]==this.index){
	                            			var index=series.length-splineIndex.length;
	                            			series[splineIndex[i]].update({zIndex:index,dataLabels:{zIndex:index}});
	                            		}else{
	                            			noCurrentSeriesCount++;
	                            			var index=series.length-splineIndex.length+noCurrentSeriesCount;
	                            			series[splineIndex[i]].update({zIndex:index,dataLabels:{zIndex:index}});
	                            		}
	                            	}
	                            }
	                        }
	                    }
	                },
	                legend: {
	                    enabled: true,
	                    verticalAlign:'top',
	                    itemStyle:{
	                    	fontWeight:'normal'
	                    }
	                },
	                series: []
	            };
	            
	         //合并属性
	         defaultObj=$.extend(true,defaultObj,extendProp);
	         if(defaultObj.plotOptions.column.stacking=="percent"){
	           //提示
	           defaultObj.plotOptions.column.tooltip={
	        	   pointFormat:"{series.name}: <b>{point.percentage:.1f}</b>%"
	           } 
	         }
	         
	         
	         
            for(var k=0;k<series.length;k++){
            	var obj=series[k];
            	switch(obj.type){
            	   case  "line":
            	   case  "spline":
            		      //判断名称当中是否已经加了单位
            		      if(obj.name.indexOf(unit.replace(/&nbsp;/g, ""))==-1){
            		    	  var name=obj.name+Highcharts.numberFormat(obj.data[obj.data.length-1], 1)+unit.replace(/&nbsp;/g, "");
                		      obj.name=name;
            		      }
          	              var spline={color: colors[k]};
          	              spline=$.extend(true,spline,obj);
//          	              var data=spline.data;
//          	              for(var j=0;j<data.length;j++){
//          	                if(data[j]!=null&&data[j+1]==null){
//          	                    data[j]={
//          	                        dataLabels: {
//          	                            enabled: true,
//          	                            align: 'right',
//          	                            borderRadius: 5,
//          	                            borderColor: colors[k],
//          	                            backgroundColor: colors[k],
//          	                            borderWidth: 3,
//          	                            padding: 5,
//          	                            shadow: true,
//          	                            style: {
//          	                                fontWeight: '600',
//          	                                color: '#ffffff',
//          	                                fontSize: '8pt'
//          	                            },
//          	                            formatter: function () {
//          	                            	unit=unit.replace(/&nbsp;/g, "");
//          	                                return   this.series.name+"："+Highcharts.numberFormat(this.y, 1)+unit;
//          	                            },
//          	                            y: -5
//          	                        }, y: data[j]};
//          	                }
//          	              }
          	             defaultObj.series.push(spline);
            	    	break;
            	   default:
 		   	              var item={color:colors[k]};
 		   	              item=$.extend(true,item,obj);
 		   	              defaultObj.series.push(item);
            		   break;
            	}
            	
            }
	         //展示图表
	         $('#'+id).highcharts(defaultObj);
		},
		
		/*
		   创建网状图
		 @parame  id 展示图表的div的id号
		 @parame  title 大标题
		 @parame  categories ['人均銷售總利益金額', '目標經常利益金額達成率', '目标经常利益率达成率', '營業利益金額達成率', '人均附加值額'];
		 @parame  series=[
						   {type:"line",name: '全球目标',data: [50, 50, 50, 50, 50]},
						   {type:"line",name: '月度目标',data: [40, 40, 40, 40, 40]},
						   {type:"line",name: '全球标杆',data: [60, 60, 60, 60, 60]},
						   {type:"area",name: '月度实绩',data: [30, 30, 30, 30, 30]}];
		 @parame  extendProp 属性参考api的格式 
		 @parame  categoriesFace 跟 categories对应，存储脸图片地址
		 */
		createSpider:function(id,title,categories,series,colors,extendProp,categoriesFace){
			   var defaultObj={  
					    chart: {
					        polar: true,
					        backgroundColor:'#ffffff'
					    },
					    title: {
					        text: title,
					        x: -80
					    },
					    pane: {
					    	size: '80%',
					    	background:null
					    },
					    xAxis: {
					        categories: categories,
					        tickmarkPlacement: 'on',
					        lineWidth: 0,
					        labels:{
					          formatter:function(){
					        	var face="<div>";
					        	for(var i=0;i<categories.length;i++){
					        		if(categories[i]==this.value&&categoriesFace[i]!=""){
					        			if(BiHighchart.hasSVG()){
					        				face+='<svg width="24px" height="22px"><image xlink:href="'+categoriesFace[i]+'" width="24px" height="22px"/></svg>';
					        			}else{
					        				face+="<img src='"+categoriesFace[i]+"' style='width:24px'/>";
					        			}
					        			
					        			
					        			break;
					        		}
					        	}
					            var v=this.value.toString();
					            if(v.length>6){
					              var prevStr=v.substr(0,6);
					              var lastStr=v.substr(6);
					              return face+prevStr+"<br>"+lastStr+"</div>";
					            }
					            return face+v+"</div>";
					          },
					          useHTML:true
					        }
					    },
					    yAxis: {
					        gridLineInterpolation: 'polygon',
					        lineWidth: 0,
					        min: 0,
					        max:100
					    },
					    tooltip: {
					    	shared: false,
					        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.1f}</b></span><br/>'
					    },
					    legend: {
					    	layout: 'horizontal',
					        align: 'right',
					        verticalAlign: 'top',
					        y: 0,
					        width:120,
					        borderColor:"#cccccc",
				            borderWidth: 1,
				            floating:true,
				            itemStyle:{
				            		fontWeight:"normal"
				            }
					    },
					    series: []
			  };
			
			  //合并属性
			  defaultObj=$.extend(true,defaultObj,extendProp);
			  
			  //组合数据
			  for(var k=0;k<series.length;k++){
		         	var obj=series[k];
   	                var item={color:colors[k],pointPlacement:'on',marker:{enabled:false}};
   	                item=$.extend(true,item,obj);
   	                defaultObj.series.push(item);
		      }
		      
		      //展示图表
			 $("#"+id).highcharts(defaultObj);
			},
			
			
			/*
			   创建组合图
			 @parame  id 展示图表的div的id号
		     @parame  title 大标题
		     @parame  categories ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
		     @parame  unit  单位
		     @parame  series  [ {type:"column",
					                name:"管理科",
						            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
						        },{type:"column",
						            name:"模具工厂",
						            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
						        },
						        {type:"column",
						            name:"车体工厂",
						            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
						        }, {type:"line",
						            name:"编制",
						            data: [144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2]
						        }]
	         @parame  colors [{
				                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
				                stops: [[0, '#a15476'],
				                        [0.5, '#ffffff'],
				                        [1, '#a15476']]
								            },{
				                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
				                stops: [[0, '#252583'],
				                        [0.5, '#ffffff'],
				                        [1, '#252583']]
								            },{
				                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
				                stops: [[0, '#1a571a'],
				                        [0.5, '#ffffff'],
				                        [1, '#1a571a']]
								            },"#ff0000"];
		     @parame  extendProp 属性参考api的格式 
		     @parame  stacking 三种  "","normal","percent"
			 */
			createCombinations:function(id,title,categories,unit,series,colors,stacking,extendProp){
			       var defaultObj={
				        xAxis: {
				            categories: categories
				        },
				        title: {
							text: title
					    },
				        yAxis: {
		                   
				        },
				        plotOptions: {          
				        },
				        tooltip: {
				            formatter:function(){
				            	if(stacking=="percent"){
				            		return this.series.name+": <b>"+Highcharts.numberFormat(this.y, 1)+"</b> ("+this.percentage.toFixed(1)+"%)<br/>";
				            	}else{
				            		if(this.total==undefined){
				            			return this.series.name+": <b>"+Highcharts.numberFormat(this.y, 1)+unit.replace(/&nbsp;/g, "")+"</b>";
				            		}else{
				            			return "总计：<b>"+Highcharts.numberFormat(this.total, 1)+"</b><br/>"+this.series.name+": <b>"+Highcharts.numberFormat(this.y, 1)+unit.replace(/&nbsp;/g, "")+"</b>";
				            		}
				            		
				            	}
				            }
				        },
				        series: []
				    };
				    
				  //合并属性
				  defaultObj=$.extend(true,defaultObj,extendProp);
				  
				  //组合数据
				  for(var k=0;k<series.length;k++){
			         	var obj=series[k];
			            var item={color:colors[k]};
			            item=$.extend(true,item,obj);
			            defaultObj.series.push(item);
			      }
			      
			      //展示图表
				  $("#"+id).highcharts(defaultObj);
	  },
	  
	  
	  /*
	          创建正反堆叠条形图
	   @parame  id 展示图表的div的id号
	   @parame  title 大标题
	   @parame  categories ['0-4', '5-9', '10-14', '15-19',
	            '20-24', '25-29', '30-34', '35-39', '40-44',
	            '45-49', '50-54', '55-59', '60-64', '65-69',
	            '70-74', '75-79', '80-84', '85-89', '90-94',
	            '95-99', '100 +'];
	   @parame  series  [
					        {type:'bar',name:'Male',data: [-1746181, -1884428, -2089758, -2222362, -2537431, -2507081, -2443179,
					                    -2664537, -3556505, -3680231, -3143062, -2721122, -2229181, -2227768,
					                    -2176300, -1329968, -836804, -354784, -90569, -28367, -3878]},
					        {type:'line',name:'Female',data: [1656154, 1787564, 1981671, 2108575, 2403438, 2366003, 2301402, 2519874,
					                    3360596, 3493473, 3050775, 2759560, 2304444, 2426504, 2568938, 1785638,
					                    1447162, 1005011, 330870, 130632, 21208]}
					   ]
	   @parame  colors ["#ff0000","#00ff00"];
	   @parame  extendProp 属性参考api的格式 
	   */
	  createBar:function(id,title,categories,series,colors,extendProp){
		     var defaultObj={
		            chart: {
		                type: 'bar'
		            },
		            title: {
		                text: title
		            },
		            xAxis: [{
		                categories: categories
		            }
//		            , {
//		                opposite: true,
//		                categories: categories,
//		                linkedTo: 0
//		            }
		            ],
		            
		            yAxis: {
		                title: {
		                    text: null
		                },
		                labels: {
		                    formatter: function(){
		                        return Math.abs(this.value);
		                    }
		                }
		            },
		    
		            plotOptions: {
		                series: {
		                    stacking: "normal"
		                }
		            },
		    
		            tooltip: {
		                formatter: function(){
		                    return '<b>'+ this.series.name +'<br/>'+ this.point.category +':'+Highcharts.numberFormat(Math.abs(this.point.y), 0);
		                }
		            },
		    
		            series: []
		        };
		        
		        //合并属性
			    defaultObj=$.extend(true,defaultObj,extendProp);
			    
			    //组合数据
			    for(var k=0;k<series.length;k++){
		         	var obj=series[k];
		 	                var item={color:colors[k]};
		 	                item=$.extend(true,item,obj);
		 	                defaultObj.series.push(item);
		        }
		      
		        //展示图表
			    $("#"+id).highcharts(defaultObj);
		},
		
		
		/*创建仪表盘
		 @parame  id "container";
		 @parame  title "<span style=\"color:#4ea4e9\">在职：100%</span> <br/>离职率";
		 @parame  yAxisTitle "%<br/>离职率";
		 @parame  series [{name:"全体",data:[{y:50}]},{name:"外派人员离职率",data:[{y:80}]},{name:"正式员工离职率",data:[{y:100}]}];
		 @parame  colors ["#00befc","#1d992b","#fc9a00"];
		 @parame  plotBands [{from:0,to:50,color:'#55BF3B'},{from:50,to:80,color:'#DDDF0D'},{from:80,to:100,color:'#DF5353'}];
		 */
		createGauge:function(id,title,yAxisTitle,series,colors,plotBands,extendProp){
			  var defaultObj={
					    chart: {
					        type: 'gauge',
					        plotBackgroundColor: null,
					        plotBackgroundImage: null,
					        plotBorderWidth: 0,
					        plotShadow: false,
					        margin:0
					    },
					    
					    title: {
					        text: title,
					        align:"center",
					        floating:true,
					        verticalAlign:"bottom",
					        y:-25,
					        style:{
					          color:"#333333",
					          fontWeight:"bold",
					          fontSize:"12px",
					          textAlign:"center"
					        },
					        useHTML:true
					    },
					    plotOptions:{
					      gauge:{
					         pivot:{
					           backgroundColor:{
				                        radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
				                        stops: [
				                            [0, '#ffffff'],//#0e9dbd
				                            [0.1,'#aad1e0'],
				                            [1, '#7b9bbe']
				                        ]
				               },
					           borderWidth:0,
					           radius:12
					         },
					         dial: {
				                    radius: '100%',
				                    backgroundColor: '#fc9a00',
				                    baseWidth: 10,
				                    topWidth: 1,
				                    baseLength: '0%', // of radius
				                    rearLength: '0%'
				             }
					      }
					    },
					    pane: {
					        startAngle: -110,
					        endAngle: 110,
					        background: [{
					            backgroundColor: {
					                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					                stops: [
					                    [0, '#cccccc'],//#82c6fd   //最底层圆的颜色
					                    [1, '#cccccc']
					                ]
					            },
					            borderWidth: 0,
					            outerRadius: '110%'
					        }, {
					            backgroundColor: {
					                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					                stops: [
					                    [0, '#ffffff'],//#032a68
					                    [1, '#ffffff']
					                ]
					            },
					            borderWidth:0,
					            outerRadius: '107%'
					        }, {
				                // default background
				                backgroundColor:"#ffffff",//#031737
				                borderWidth: 0
					        }, {
					            backgroundColor: '#ffffff',
					            borderWidth: 0,
					            outerRadius: '105%',
					            innerRadius: '103%'
					        }]
					    },
					    
					    // the value axis
					    yAxis: {
					        min: 0,
					        
					        minorTickInterval: 'auto',
					        minorTickWidth: 1,
					        minorTickLength: 5,
					        minorTickPosition: 'inside',
					        minorTickColor: '#333333',
					
					        tickPixelInterval: 50,
					        tickWidth: 2,
					        tickPosition: 'inside',
					        tickLength: 10,
					        tickColor: '#333333',
					        labels: {
					            step: 2,
					            rotation: 'auto'
					        },
					        title: {
					            text:yAxisTitle,
				                style:{
				                   color:"#333333"
				                }
					        },
				            labels:{
				                style:{
				                    color:"#333333"
				                }
				            },
					        plotBands: []        
					    },
					    
					    series: [],
				        tooltip: {
				            valueSuffix: ' %',
				            valueDecimals:1
				        }
			   };
			    
			    
			    //合并属性
			    defaultObj=$.extend(true,defaultObj,extendProp);
			    
			    
			    //组合数据
				for(var k=0;k<series.length;k++){
		         	var obj=series[k];
		            var item={color:colors[k]};
		            var dialObj= {dial: {
		                    radius: '100%',
		                    backgroundColor: colors[k],
		                    baseWidth: 10,
		                    topWidth: 1,
		                    baseLength: '0%', // of radius
		                    rearLength: '0%'
		             }};
		            for(var i=0;i<obj.data.length;i++){
		               obj.data[i]=$.extend(true,obj.data[i],dialObj);
		            }
		            item=$.extend(true,item,obj);
		            defaultObj.series.push(item);
			    }
			    
			    
			    var plotBandsItem={thickness:'5%'};
			    for(var i=0;i<plotBands.length;i++){
			       plotBands[i]=$.extend(true,plotBands[i],plotBandsItem);
			       defaultObj.yAxis.plotBands.push(plotBands[i]);
			    }
			    
			    //展示图表
				$("#"+id).highcharts(defaultObj);
			},
		    hasSVG:function(){ 
				var SVG_NS = 'http://www.w3.org/2000/svg';
				return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect; 
			},
			init:function(){
				Highcharts.setOptions({lang:{
					resetZoom:"还原",
					resetZoomTitle:"还原到1:1"
				}});
			}
};
BiHighchart.init();

/*实例1
var categories=['12/平均', '13/平均', '14/平均', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月','11月','12月'];
          var series=[
            {type:"column",name:"自工程不良个熟率",data:[null,null,null,30,30,30,30,30,30,30,30,30,30,30,30]},
            {type:"pie",name:"平均自工程不良个熟率",data:[15,15,15,null,null,null,null,null,null,null,null,null,null,null,null]},
            {type:"spline",name:"全球指标",data:[null,null,null,10,10,10,10,10,10,10,10,10,10,10,10]},
            {type:"spline",name:"2014年upg指标",data:[null,null,null,20,20,20,20,20,20,20,20,20,20,20,20]}];
          var colors=[{
				                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
				                stops: [[0, '#5a6952'],
				                        [0.5, '#ffffff'],
				                        [1, '#5a6952']]
				            },
				            {
				                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
				                stops: [[0, '#4572A7'],
				                        [0.5, '#ffffff'],
				                        [1, '#4572A7']]
				            },
			            "#0033cc","#ff3333"];
          BiHighchart.creatColumnTarget("container","自工程不良个数率",categories,'PPM',series,colors,null);
*/


/*创建网格图
 *var categories=['人均銷售總利益金額', '目標經常利益金額達成率', '目标经常利益率达成率', '營業利益金額達成率', '人均附加值額'];
		var id="container";
		var title="";
		var series=[
		   {type:"line",name: '全球目标',data: [50, 50, 50, 50, 50]},
		   {type:"line",name: '月度目标',data: [40, 40, 40, 40, 40]},
		   {type:"line",name: '全球标杆',data: [60, 60, 60, 60, 60]},
		   {type:"area",name: '月度实绩',data: [30, 30, 30, 30, 30]}];
	    var colors=["#12a012","#ff0000","#cc6702","#0636c9"];
	    var p={legend: {
					    	layout: 'horizontal',
					        align: 'right',
					        verticalAlign: 'top',
					        y: 0,
					        width:190,
					        borderColor:"#ff0000",
				            borderWidth: 2
					    }}
	     var categoriesFace=["http://www.baidu.com/img/baidu_jgylogo3.gif","","","","http://www.baidu.com/img/baidu_jgylogo3.gif"];
	    BiHighchart.createSpider("container",title,categories,series,colors,null,categoriesFace);
 */





