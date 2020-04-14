layui.link('js/lay-module/wangeditor/wangeditor.css');
layui.define('wangeditor',function(exports){
    var editor = {
        render:function(elem) {
            // 配置菜单
            var configMenus = [
                'source',
                '|',
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                '|',
                'quote',
                // 'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                '|',
                'link',
                'unlink',
                'table',
                'emotion',
                '|',
                'img',
                // 'video',
                // 'location',
                'insertcode',
                // '|',
                'undo',
                'redo',
                'fullscreen'             
            ];
            if(Array.isArray(elem)){
                layui.each(elem,function(i,d){
                    window['x_'+d] = layui.wangeditor(d);
                    window['x_'+d].config.menus = configMenus;
                    window['x_'+d].create();
                })
            }else{
                var d = elem;
                window['x_'+d] = layui.wangeditor(d);
                window['x_'+d].config.menus = configMenus;
                window['x_'+d].create();
            };
        },
        add:function(param){  //初始化内容
            window['x_'+param.elem].$txt.html(param.txt)
        },
        getHtml:function(param){ //获取编辑器区域完整html代码
            return window['x_'+param].$txt.html();
        },
        getTxt:function(param){  // 获取编辑器纯文本内容
            return window['x_'+param].$txt.text();
        },
        getFormatTxt:function(param){    // 获取格式化后的纯文本
            return window['x_'+param].$txt.formatText();
        },
        disable:function(param){ // 禁用
            window['x_'+param].disable();
        },
        enable:function(param){ // 启用
            window['x_'+param].enable();
        },
        clear:function(param){   //清空内容
            window['x_'+param].$txt.html('<p><br></p>');
        },
        append:function(param){   //追加内容
            window['x_'+param.elem].$txt.append(param.txt);
        },
    };
	exports('editor',editor);
});