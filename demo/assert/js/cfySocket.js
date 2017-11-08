/**
 * Created by Administrator on 2017/9/28.
 */
/**
 * @author wuzhe
 * @param url
 * @param msgCallbak
 * @returns {{disconnect: Function, sendMsg: Function}}
 * ps: ������layer.js��socket.min.js
 */
var cfySocket = function(url, msgCallbak) {
	var ws = null; //websocket����

	var connect = function() {
		ws = new SockJS(url, null);

		//连接成功回调
		ws.onopen = function(event) {
			console.log("连接成功");
		};

		//接收服务器消息
		ws.onmessage = function(event) {
			msgCallbak(event.data);
		};

		//连接关闭
		ws.onclose = function(event) {
			console.log("连接关闭");
		};
	};

	connect();

	return {

		disconnect: function() {
			if(ws != null) {
				ws.close();
				ws = null;
			}
		},

		sendMsg: function( message ) {
			if(ws != null) {
				ws.send(message);
			} else {
				comm.layer.alert('��δ����ws���ӣ�');
			}
		}
	};
};
