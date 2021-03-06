/**
 * 调用示例：
 *  		readTxt(
			 file,
			 function(data){ //data时读取后返回的json
									console.log('读取txt成功……');
									console.log(data);
								},
			 function(){
									console.log('开始读取咯……');
									progress.style.display = 'block';
								},
			 true
 );
 */
var readTxt = (function(w) {

	//常量
    var __DEFAULT__ = {
    	exp: {
    		trim: /\//g, //匹配'/'
		    rn: /;.*\r\n/g, //匹配 *.换行,
            space: /^\s+|\s+$/g  //匹配首位空格
	    },
	    errorMsg: {
    		readError: "读取文件出错！",
		    interruptError: "读取文件异常中断！"
	    }
    };

	//保存txt解析后的数据
    var ary = [],

	    //存储对象keys的数组
	    attrs = [],

	    //存储所有行的数据的数组
	    vals = [];

	function read(file, successFn, beforeFn, isShowProgress, rowSeparator, cellSeparator) {

		var reader = new FileReader();

		//开始读取数据之前触发
		reader.onloadstart = function() {
			beforeFn && beforeFn();
		};

		//读取中触发(读取进度)
		reader.onprogress = function(e) {
			if(typeof isShowProgress === 'boolean' && isShowProgress) {
				var loaded = e.loaded,
					total = e.total,
				    percent = parseFloat(loaded/total).toFixed(2);
					showProgress(percent,progressId);
			}
		};

		function showProgress(p, progressId) {
		    var progress = document.getElementById(progressId);
			progress.style.display = 'block';
			percent.style.width = p*100 +'%';
			percent.innerHTML = p*100 +'%';
		}
		//文件读取出错
		reader.onerror = function() {
			//提示错误
			comm.layer.alert(__DEFAULT__.errorMsg.readError);
		};

		//文件读取中断触发
		reader.onabort = function() {
			comm.layer.alert(__DEFAULT__.errorMsg.interruptError);
		};

		//文件读取完成后调用，不管读取成功还是失败
		reader.onloadend = function() {
			reader = null;
		};

		//文件成功读取触发
		reader.onload = function(){
			var txtData = this.result,
				data = read.parseTxtToAry(txtData);
			successFn && successFn(data);
		};

		reader.readAsText(file, "gb2312");
	}

	//过滤数组空元素
	read.removeAryEmptyEle = function(ary) {
        debugger;
		if(!this.isArray( ary )) {
			throw new Error(ary + "必须是一个数组");
		}

		return ary.filter(function(item){

			return item !== "";
		});

	};

	//清除首位空格
	read.trim = function(str) {
	    return str.replace(__DEFAULT__.exp.space,'');
    };

	//获取txt解析后的每一行的单个对象
	read.getTxtObj = function(ary) {
		var json = {};
		if(!this.isArray(ary)) {
			throw new Error(ary + " 不是一个数组");
		}
		for(var k = 0, size = ary.length; k < size; k++) {
			json[attrs[k]] = ary[k];
		}
		return json;
	};

	//是否是数组
	read.isArray = function(ary) {
		return typeof ary === 'object' && typeof ary.length !== "undefined" && ary instanceof Array;
	};

	//将txt数据转换为数组形式
	read.parseTxtToAry = function(txtData) {
		debugger;
		//分析行数据;
		var rowsAry = read.removeAryEmptyEle(txtData.split(__DEFAULT__.exp.rn)),

			//存储txt文件从第二条开始的所有数据
			vals = [];

		//存储txt文件第一行的数据(即表头)
		attrs = read.removeAryEmptyEle(rowsAry[0].split( __DEFAULT__.exp.trim ));

		for(var i = 1,length = rowsAry.length; i < length; i++ ){
			var row = rowsAry[i],
			    valAry =  row.split( __DEFAULT__.exp.trim );

			if(valAry.length > 0) {

			    //去除每个单元格值的空格
                valAry = valAry.map(function( item ){
                    return read.trim( item );
                });
				vals.push( valAry );
			}
		}

		for(var j = 0, l = vals.length; j < l; j++) {
			var obj = read.getTxtObj(vals[j]);
				//需要判断obj是否为空
				ary.push(obj);
		}
		return ary;
	};

	return read;
})(window);
