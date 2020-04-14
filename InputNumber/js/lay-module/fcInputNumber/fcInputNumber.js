/**
 * [InputNumber 计数器]
 * @基于layui
 * @ver: 1.0
 * @date: 2020-3-26
 * @author: cm.yu
 */
layui.link('./js/lay-module/fcInputNumber/fcInputNumber.css');
layui.define(['jquery'],function (exports) {
	var $ =  layui.$;

    var obj = {
        /**
         * 渲染数字输入框，动态生成的，改变参数的
         * @params:不带参数，对当前页面重渲染一下。携带参数会改变指定的数字输入框的设置
         */
        render:function(params) {
            obj.init(params);
        },
        /**
         * 初始化
         */
        init:function(params) {
            var _input = $('.fc-input-number');  // 标记的input
            //var _elem = $('.fc-input-number-wrap');
            var config = {
                min:0,                      // 最小值  number
                max:100,                    // 最大值  number
                step:1,                     // 每次改变步数，可以为小数 number
                precision:0,                // 数值精度 number，如step设置为小数，精度必须同步
                size:'large',               // 输入框大小 large | middle | small
                controlsPosition:'default', // 控制按钮位置 default | right
                disabled:false,             // 禁止
                value:0,                    // 当前值
            }

            // render 携带参数时候，对指定的数字输入框进行重渲染
            if(params) {
                // 当前input的filter标识，识别标识符，可进行设置参数
                var _filter = _input.attr('fc-filter');
                params.map(function(item,index) {
                    //console.log(item[_filter])
                    for(var key in item[_filter]) {
                        //console.log(item[_filter][key])
                        if(key === 'value') {
                            $('[fc-filter='+_filter+']').val(item[_filter][key]);
                        }else{
                            $('[fc-filter='+_filter+']').attr(key,item[_filter][key]);
                        }
                    }
                })
            }

            // 遍历当前页面的input，渲染成数字输入框
            _input.each(function(index,d) {


                // 数字输入框size
                var _sizeClass = '';
                var _sizeTag = $(d).attr('size');
                if(_sizeTag) {
                    switch (_sizeTag) {
                        case 'large':
                            _sizeClass = ' fc-input-number-lg';
                            break;
                        case 'small':
                            _sizeClass = ' fc-input-number-sm';
                    }
                }

                // 控制按钮位置
                var _arrowDown = '<svg t="1585278382788" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4679" width="11" height="11"><path d="M138.692 478.323h795.364v35.349h-795.364z" p-id="4680" fill="#707070"></path></svg>';
                var _arrowUp = '<svg t="1585278555200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9707" width="11" height="11"><path d="M992 480h-448v-448C544 12.8 531.2 0 512 0s-32 12.8-32 32v448h-448c-19.2 0-32 12.8-32 32s12.8 32 32 32h448v448c0 19.2 12.8 32 32 32s32-12.8 32-32v-448h448c19.2 0 32-12.8 32-32s-12.8-32-32-32z" p-id="9708" fill="#8a8a8a"></path></svg></span>';
                var _arrowDown1 = '<svg t="1585373572128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3938" width="12" height="12"><path d="M864 352c-8.2 0-16.4 3.1-22.6 9.4L512 690.7 182.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l352 352c12.5 12.5 32.8 12.5 45.3 0l352-352c12.5-12.5 12.5-32.8 0-45.3-6.2-6.3-14.4-9.4-22.6-9.4z" p-id="3939" fill="#8a8a8a"></path></svg>';
                var _arrowUp1 = '<svg t="1585373437473" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3104" width="12" height="12"><path d="M864 672c-8.2 0-16.4-3.1-22.6-9.4L512 333.3 182.6 662.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l352-352c12.5-12.5 32.8-12.5 45.3 0l352 352c12.5 12.5 12.5 32.8 0 45.3-6.2 6.3-14.4 9.4-22.6 9.4z" p-id="3105" fill="#8a8a8a"></path></svg>';

                var _positionClass = '';
                var _position = $(d).attr('position');
                if(_position) {
                    switch (_position) {
                        case 'right':
                            _positionClass = ' fc-input-number-right';
                            _arrowUp = _arrowUp1;
                            _arrowDown = _arrowDown1;                            
                            break;
                    }
                }

                // 当前input的禁止状态
                var _disabledClass = '';
                var _disabledTag = $(d).prop('disabled');
                config.disabled ? _disabledClass = ' fc-input-number-wrap-disabled' : '';
                _disabledTag ?  _disabledClass = ' fc-input-number-wrap-disabled' : '';

                // 当前input value值
                var _value = $(d).val();
                _value==='' ? _value = config.value : '';
                $(d).val(_value);

                // 渲染前判断结构是否已生成
                if($(d).parent().hasClass('fc-input-number-wrap')){
                    var _state = $(d).prop('disabled');
                    if(_state){
                       $(d).parent().addClass('fc-input-number-wrap-disabled');
                    }else{
                       $(d).parent().removeClass('fc-input-number-wrap-disabled');
                    }
                }else{
                    $(d).wrap('<div class="fc-input-number-wrap'+_disabledClass+''+_sizeClass+''+_positionClass+'"></div>');
                    $(d).before('<span class="fc-input-number-handler fc-input-number-handler-down">'+_arrowDown+'</span>');
                    $(d).after('<span class="fc-input-number-handler fc-input-number-handler-up">'+_arrowUp+'</span>');
                }
            });
            obj.listen(_input,config);
        },
        /**
         * 监听
         *  _input:输入框  ,  config:配置
         */
        listen:function(_input,config) {
            var _handler = $('.fc-input-number-handler'),
                _handlerUp = $('.fc-input-number-handler-up'),
                _handlerDown = $('.fc-input-number-handler-down');

            // 移除所有click，防止重复
            _handler.off('click');

            // 控制器 增加数字
            _handlerUp.on('click',function(){
                var _thisInput = $(this).siblings('input');
                obj.handler(_thisInput,config,'up');
            });
            // 控制器 减少数字
            _handlerDown.on('click',function() {
                var _thisInput = $(this).siblings('input');
                obj.handler(_thisInput,config,'down');
            });

            _input.unbind('focus');
            _input.unbind('blur');
            _input.focus(function() {
                $(this).parent().attr('focus','');
                obj.onKeydown($(this),config);
            });

            _input.blur(function() {
                $(this).parent().removeAttr('focus');
                $(this).unbind('keydown');
                obj.blur($(this),config); //监听失去焦点事件
            });
        },
        /**
         * 按键up down 事件
         * _input:当前焦点input ， config:配置
         */
        onKeydown:function(_thisInput,config) {
            _thisInput.bind('keydown',function(event){
            　　switch(event.keyCode){
                    case 38: //向上键
                        $(this).next().trigger('click');
                        // obj.handler(_thisInput,config,'up');
                        break;
                    case 40: // 向下键
                        $(this).prev().trigger('click');
                        // obj.handler(_thisInput,config,'down');
                        break;
                }
            });
        },
        /**
         * 总控制器
         * e:input , c:配置参数 , t:控制器类型up|down 
         */
        handler:function(e,c,t) {
            // 获取input元素中定义的配置参数，和默认的配置合并，生成新的配置
            var _newConfig = new Object();
            var _step   = e.attr('step'),
                _min    = e.attr('min'),
                _max    = e.attr('max'),
                _precision = e.attr('precision'),
                _size   = e.attr('size'),
                _controlsPosition = e.attr('controlsPosition');

            _step ? _newConfig['step'] = _step:'';
            _min ? _newConfig['min'] = _min:'';
            _max ? _newConfig['max'] = _max:'';
            _precision ? _newConfig['precision'] = _precision:'';
            _size ? _newConfig['size'] = _size:'';
            _controlsPosition ? _newConfig['controlsPosition'] = _controlsPosition:'';

            // 新的配置文件
            _newConfig = $.extend({},c,_newConfig);

            //获取当前input中的数值,
            var _val = e.val(); 
            var _valRe = _val.replace(/[^0-9+-.]/ig,"");//清除 0-9，- 符号以外的字符
            !_valRe ?  _valRe = _newConfig.min : '';    // 碰到不是number数，以最小值表示
            var _value = parseFloat(_valRe).toFixed(_newConfig.precision); //精度
            var _v1 = parseFloat(_value);
            var _v2 = parseFloat(_newConfig.step);
            var _v3 = (_v1+_v2).toFixed(_newConfig.precision); /// 把当前值和step相加
            var _v4 = (_v1-_v2).toFixed(_newConfig.precision); /// 把当前值和step相减
            if(_newConfig.precision > 0){
                var _maxVal = parseFloat(_newConfig.max).toFixed(_newConfig.precision);
                var _minVal = parseFloat(_newConfig.min).toFixed(_newConfig.precision);
            }else{
                var _maxVal = parseFloat(_newConfig.max);
                var _minVal = parseFloat(_newConfig.min);
            }

            if(t){  //控制器加减的事件
                switch (t) {
                    case 'up':
                        e.prev().removeAttr('disabled');
                        // 增加加过程中，当前值+step 小于 最大值时候，做判断
                        if(_v3 < _maxVal){
                            e.val(_v3)
                        }else{
                            e.val(_maxVal);
                            e.next().attr('disabled','');   // 超过最大值后按钮禁止
                        }
                        break;
                    case 'down':
                        e.next().removeAttr('disabled');
                        if(_v4 > _minVal) {
                            e.val(_v4)
                        }else{
                            e.val(_minVal)
                            e.prev().attr('disabled','');   // 超过最小值后按钮禁止
                        }
                        break;
                }
            }else{  //失去焦点的事件
                if(_v1 < _maxVal){
                    if(_v1 < _minVal) {
                        e.val(_minVal);
                        e.prev().attr('disabled','');
                    }else{
                        e.val(_v1);
                    }
                }else{
                    e.val(_maxVal);
                    e.next().attr('disabled','');
                }
            }
        },
        /**
         * 数字变化回调
         */
        onChange:function() {

        },
        /**
         * focus 获得焦点触发事件
         */
        focus:function() {

        },
        /**
         * blur 移除焦点触发事件
         * e:触发的input , c:配置参数
         */
        blur:function(e,c) {
            obj.handler(e,c);
        },
    };
    obj.init();

	exports("fcInputNumber", obj);
})