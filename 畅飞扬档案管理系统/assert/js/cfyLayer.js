/**
 * Created by Administrator on 2017/9/28.
 */
var cfyLayer = {
	dialog: function(t) {
		var e = {
			type: t.type||1,
			title: t.title||'新消息提醒',
			content: t.content||"消息内容",
			closeBtn: 1,
			scrollbar: 1,
			area: t.area || ["200px", "200px"]
		};
		if (t.btn && t.methods && comm.type("array" === t.btn) && (e.btn = t.btn, "array" === comm.type(t.methods))) for (var o = t.btn.length,
			                                                                                                                  a = 0; a < o; a++) 0 == a ? e.yes = n[0] : e["btn" + (a + 1)] = n[a];
		$.extend(e, t);
		layer.config({
			skin: 'layui-layer-lan'
		});
		return	layer.open(e)
	},
	alert: function(t, e, o) {
		layer.alert(t, e, o)
	},
	confirm: function(t, e, o, n) {
		layer.confirm(t, e, o, n)
	},
	msg: function(t, e, o) {
		layer.msg(t, e, o)
	},
	tips: function(t, e, o) {
		layer.tips(t, e, o)
	},
	close: function(t) {
		layer.close(t)
	},
	photos: function(t, e) {
		var o = {
			anim: 5
		};
		e && $.extend(o, e),
			t.url ? comm.ajax.commAjax({
				url: t.url,
				successFn: function(t) {
					o.photos = t,
						layer.photos(o)
				}
			}) : t.id && (o.photos = id, layer.photos(o))
	}
};