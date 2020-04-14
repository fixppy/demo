/**
 * [fcDrawer 抽屉]
 * @基于layui drawer
 * @ver: 1.0
 * @date: 2020-3-19
 * @author: cm.yu
 */
// fcDrawer.render({
//     clickBtn:'.open1',
//     open:{
//         elem:'#demo1',
//         placement:'right',
//         title:'右侧打开的抽屉',
//         closable:true,
//         footer:false,
//         mask:true,
//         maskClosable:true,
//         theme:'light',
//         width:300,
//         zIndex:899,
//         btn:['取消','提交'],
//         sideBtn:true,
//     },
//     yes:function(index){
//         fcDrawer.close(index);
//     },
//     cancel:function(index){
//       return false; 
//     }
// });

layui.link('./js/lay-module/fcDrawer/fcDrawer.css');
layui.define(['jquery'],function (exports) {
	var $ =  layui.$;

    var obj = {
    	render: function (options) {
    		var defaults = {
                open:{
    				placement:'right',      //位置 top|right|bottom|left
    				footer:true,            //抽屉footer，默认关闭（打开状态，包含确定与取消按钮）		boolean
    				closable:true,          //是否显示右上角的关闭按钮		boolean
    				mask:true,              //是否展示遮罩		boolean
    				maskClosable:true,      //点击蒙层是否允许关闭	boolean
    				anim:1,                 //抽屉打开动画效果 Number
    				theme:'light',          //主题配色 dark|light
    				className:'',           //外层容器别名，用于自定义样式
                    keyboard:true,          //是否支持键盘 esc 关闭     boolean
                    sideBtn:false,           //侧边触发按钮    boolean 默认:false
                },
    		};
            var option = $.extend(true,defaults,options);
    		// console.log(option)

            // 是否存在open参数，定义了打开层的对象，以及配置信息
            if(options.open){
                obj.init(option);
            }else{
                console.log('%c 请设置drawer插件的open参数','color:red;')
            }
    		obj.listen(option);
    	},
        /**
         * 初始化
         */
        init:function(option){
            var _o = option.open,
                _e = $(_o.elem),
                _p = _e.find('.fc-drawer-panel');//，显示内容面板

            _e.attr('placement',_o.placement);
            _e.attr('theme',_o.theme);
            // 是否显示右上角的关闭按钮
            if(_o.closable) {
                _p.prepend('<button class="fc-drawer-close"><i class="layui-icon layui-icon-close"></i></button>');
            }

            // 抽屉面板标题，没有参数就不显示header结构
            if(_o.title) {
                if(_e.find('.fc-drawer-header').length < 1){
                    _p.prepend('<div class="fc-drawer-header"><h3>'+_o.title+'</h3></div>');
                }
            }

            // 是否显示footer
            if(_o.footer) {
                if(_e.find('.fc-drawer-footer').length < 1) {
                    // 修改btn文字
                    var _btn0 = 'Cancel',_btn1 = 'Submit';
                    if(_o.btn) {
                        _btn0 = _o.btn[0],_btn1 =  _o.btn[1];
                    }
                    _p.append('<div class="fc-drawer-footer"><button class="layui-btn layui-btn-sm layui-btn-normal">'+_btn1+'</button><button class="layui-btn layui-btn-sm layui-btn-primary fc-drawer-footer-close">'+_btn0+'</button></div>');
                }
            }

            // 是否显示遮罩
            if(_o.mask) {
                if(_e.find('.fc-drawer-mask').length < 1) {
                    _e.append('<div class="fc-drawer-mask"></div>');
                }
            }

            // 面板宽度
            if(_o.width) {
                _p.css({width:_o.width+'px'});
            }

            // 设置z-index
            if(_o.zIndex) {
                _e.css({'zIndex':_o.zIndex});
            }

            // 自定义classname
            if(_o.className) {
                _e.addClass(_o.className);
            }

            // 动画
            if(_o.anim == 2) {
                _p.wrap('<div class="fc-drawer-panel-effetc-2"></div>');
            }
            
            // 侧边触发按钮
            if(_o.sideBtn) {
                _p.prepend('<button class="fc-drawer-toggle-button"><i class="layui-icon layui-icon-set"></i></button>');
            }
        },
        /**
         * 监听
         * @param options
         */
        listen: function (option) {
            var _o = option.open,
                _e = $(option.open.elem),
                _c = $(option.clickBtn),
                _m = _e.find('.fc-drawer-mask'),
                _b = _e.find('.fc-drawer-toggle-button'),
                _cancel = _e.find('.fc-drawer-close, .fc-drawer-footer>button:nth-child(2)');
                _yes = _e.find('.fc-drawer-footer>button:nth-child(1)');

            // 点击显示抽屉面板
            _c.on('click',function(){
                _e.attr('drawer-open','true');
                $('body').addClass('fc-drawer-open-show-body');
            });

            // 点击侧边触发按钮控制抽屉的显示与隐藏
            _b.off().on('click',function(){
                if(_e.attr('drawer-open')){
                    obj.close(_e);
                }else{
                    _e.attr('drawer-open','true');
                    $('body').addClass('fc-drawer-open-show-body');  
                }
            });

            // 点击蒙层是否允许关闭
            if(_o.maskClosable) {
                _m.on('click',function(){
                    option.cancel?option.cancel(_e,function(){obj.close(_e);}):obj.close(_e);
                });
            }

            // 关闭抽屉面板，回调
            _cancel.on('click',function(){
                option.cancel?option.cancel(_e,function(){obj.close(_e);}):obj.close(_e);
            });

            // footer 确定按钮，回调
            _yes.on('click',function(){
                option.yes?option.yes(_e):obj.close(_e);
            });

            // 按键ESC退出
            if(_o.keyboard) {
                $(document).keydown(function(even){
                    if (even.which === 27){
                        if(_e.attr('drawer-open')) {
                            option.cancel?option.cancel(_e,function(){obj.close(_e);}):obj.close(_e);
                            return false;
                        }
                    }
                });
            }
        },
        /**
         * 关闭抽屉面板
         * @param  index 对应主层元素
         */
        close:function(index){
            index.removeAttr('drawer-open');
            index.addClass('fc-drawer-open');
            setTimeout(function(){
                index.removeClass('fc-drawer-open');
                $('body').removeClass('fc-drawer-open-show-body');
            },300);
        },
        /**
         * 自动打开抽屉面板
         * @param  eleme    面板ID
         */
        open:function(elem,params){
            if(elem[0] == '#' || elem[0] == '.'){
                //console.log('元素结构')
                $(elem).attr('drawer-open','true');
                $('body').addClass('fc-drawer-open-show-body');
                if(params && params.title) {
                    $(elem).find('.fc-drawer-header h3').html(params.title);
                }                
            }else{
                //console.log('普通内容')
            }
        },
    };
	exports("fcDrawer", obj);
})