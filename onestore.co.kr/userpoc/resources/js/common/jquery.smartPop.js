;(function($) {
    var ie     = $.browser.msie && ($.browser.version < 9);
    var innerH  = window.innerHeight;
    
    $.smartPop = {
        isInstall : false,
        opts : {},
        open : function(options) {
            this.opts = $.extend({}, $.smartPop.defaults, options);
            this.install();
            this.resize();

            $('html').css({ marginRight: '0px', display: 'block', overflow: 'hidden', overflowY: 'hidden' });
            $('#smartPop').show();
        },
        resize : function() {
        	$('#smartPop_container').width(this.opts.width);
            
            this.resizeHeight(this.opts.height);
        },
        resizeHeight : function(h) {
            if(ie) {
                $('body').attr({ scroll: 'no' }); // ie7에서 overflow 적용안됨 
                innerH = document.documentElement.clientHeight;
            }

            // 위치설정
            $('#smartPop_container').css({ marginLeft: '0px', marginTop: '0px', width:'100%', height:'100%' });

            // 높이설정
            h = h + this.opts.revise;
            //$('#smartPop_container').height(h);
            
            $('#smartPop_content').hide();
            //$('#smartPop_frame').height(h).show();
            $('#smartPop_frame').show();
        },
        install : function() {
            if(this.isInstall == false) {
                var body                    = $('body');
                var smartPop_overlay        = $('<div />').attr('id', 'smartPop_overlay').css({ opacity: this.opts.opacity, background: this.opts.background });
                var smartPop                = $('<div />').attr('id', 'smartPop');
                var smartPop_container      = $('<div />').attr('id', 'smartPop_container');
                var smartPop_close_wrap     = $('<div />').attr('id', 'smartPop_close_wrap');
                var smartPop_close          = $('<div />').attr('id', 'smartPop_close');
                var smartPop_loading        = $('<div />').attr('id', 'smartPop_loading');
                var smartPop_content        = $('<div />').attr('id', 'smartPop_content');
                var smartPop_frame          = $('<iframe />').attr({ id: 'smartPop_frame', frameBorder: 0, scrolling: 'no', allowTransparency : true  });

                smartPop_close_wrap.append(smartPop_close).appendTo(smartPop_container);
                smartPop_container.append(smartPop_loading).append(smartPop_content).append(smartPop_frame).appendTo(smartPop);
                smartPop.append($('<div />').attr('id', 'smartPop_log'));
                body.append(smartPop_overlay).append(smartPop);
                this.isInstall = true;
            } else {
                $('#smartPop').show();
                $('#smartPop_overlay').show();
            }

            // 닫기 버튼 설정
            if(this.opts.closeImg != undefined) {
                $('#smartPop_close').css({ width:this.opts.closeImg.width + 'px', height:this.opts.closeImg.height + 'px', backgroundImage:'url(' + this.opts.closeImg.src + ')'});
            }
            if(this.opts.url != '') {
                $('#smartPop_frame').attr({ src : this.opts.url }).load(function () {
                    var h = $(this).contents().height();
                    $.smartPop.resizeHeight(h);
                });
            }

            if(this.opts.bodyClose) {
                $('body').bind('click', function(event) {
                    if (!event) event = window.event;
                    var target = (event.target) ? event.target : event.srcElement;
                    event.stopPropagation(); // 이벤트 버블링 전파를 막음
                    if(target.id == 'smartPop') { $.smartPop.close(); }
                });
            }

        },
        close : function() {
            if(ie) {
                $('body').attr({ scroll: 'yes' });
            }
            $('html').css({ marginRight: 0, display: '', overflowY: 'scroll'});

            $('#smartPop_frame').attr('src', '').unbind();
            $('#smartPop').hide();
            $('#smartPop_overlay').hide();
        }
    };
    
    $.smartPop.defaults = {
    		position    : 'center',
            left        : '310px',
            top         : '10px',
            bodyClose   : false,
            title       : 'smartPop',
            background  : '#fff',
            opacity     : .7,
            width       : '720px',
            height      : '500px',
            html        : '',
            url         : '',
            revise      : 0,
            log         : false
    };
})(jQuery);
