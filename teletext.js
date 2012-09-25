"use strict";

$(function() {
    var MONTH_NAMES = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
    ];

    var pages = [];

    var KEY_0 = 48,
        KEY_9 = 57;

    var teletext = window['teletext'] = {
        addPage: function( number, data ) {
            pages[number] = data;
        },

        dial: {
            init: function() {
                this.timeout  = null;
                this.numberSoFar = null;

                $('body').keypress( function(ev) {
                    if ( ev.which >= KEY_0 && ev.which <= KEY_9 ) {
                        var key = ev.which - KEY_0;

                        teletext.dial.inputNumber( key );
                    }
                } );
            },

            inputNumber: function( number ) {
                if ( this.numberSoFar === null ) {
                    this.numberSoFar = '' + number;
                } else {
                    this.numberSoFar += number;
                }

                teletext.topbar.setUserNumber( this.numberSoFar );

                if ( this.numberSoFar.length === 3 ) {
                    this.set( this.numberSoFar );
                    this.numberSoFar = null;
                }
            },

            set: function( number ) {
                var self = this;

                if ( this.timeout !== null ) {
                    clearTimeout( this.timeout );
                }

                this.timeout = setTimeout( function() {
                    teletext.dial.setNow( number );
                }, 1000 );
            },
            
            setNow: function( number ) {
                if ( this.timeout !== null ) {
                    clearTimeout( this.timeout );
                    this.timeout = null;
                }

                number = parseInt(number);
                var page = pages[ number ];

                if ( page ) {
                    teletext.screen.set( number, page );
                }
            }
        },

        /**
         * This controls specifically, switching to a new page.
         *
         * A data object is given, which has a number, and it's
         * contents. This then waits for a set amount of time,
         * and then displays that data.
         */
        screen: {
            blinkTimer: null,

            buildPage: function(data) {
                var page,
                    contents;

                if ( data instanceof Array ) {
                    page = $('<div>');
                    contents = data;
                } else {
                    var type = data.type || 'div';
                    page = $('<' + type + '>');

                    iter( data.classes, function(klass) {
                        page.addClass( klass );
                    } );

                    iter( data.css, function(key, val) {
                        page.css( key, val );
                    } );

                    iter( data.url || data.href, function(url) {
                        page.attr( 'href', url );
                    } );

                    contents = data.contents;
                }

                iter( contents, function(child) {
                    if ( typeof child === 'string' || child instanceof String ) {
                        page.append( child );
                    } else {
                        page.append( teletext.screen.buildPage(child) );
                    }
                } );

                return page;
            },

            setupBlinkTimer: function( page ) {
                if ( this.blinkTimer !== null ) {
                    clearInterval( this.blinkTimer );
                }

                var blinks  = page.find( '.blink' ),
                    visible = true;
                this.blinkTimer = setInterval( function() {
                    if ( visible ) {
                        blinks.css('visibility', 'hidden');
                    } else {
                        blinks.css('visibility', 'visible');
                    }

                    visible = ! visible;
                }, 1200 );

                return page;
            },


            set: function(number, data) {
                teletext.topbar.setUserNumber( number );
                teletext.topbar.setNumber( number );

                var newContents = teletext.screen.setupBlinkTimer(
                        teletext.screen.buildPage( data )
                );
                var page = $('.teletext-page');

                var offset = 100;
                newContents.css('visibility', 'hidden').each( function() {
                    var thisContents = $(this);

                    setTimeout( function() {
                        thisContents.css('visibility', 'visible');
                    }, offset );

                    offset += 400;
                } );

                page.empty();
                page.append( newContents );
            }
        },

        topbar: {
            init: function() {
                var date = $('.top-page-date'),
                    time = $('.top-page-time');

                var updateDateTime = function() {
                    var now = new Date();

                    date.text(
                            MONTH_NAMES[now.getMonth()] +
                            now.getDate()
                    );
                    time.text(
                            now.toTimeString().substring(0, 8)
                    );
                };
                setInterval( updateDateTime, 1000 );

                updateDateTime();
            },

            setUserNumber: function( number ) {
                while ( number.length < 3 ) {
                    number += ' ';
                }

                $('.top-page-number-user').text( 'p' + number );
            },

            setNumber: function( number ) {
                $('.top-page-number').text( number );
            }
        }
    };

    var OBJECT_PROTOTYPE = ({}).constructor.prototype;

    /**
     * If given undefined, this does nothing and returns.
     *
     * If given an array or an object literal, it iterates
     * over it, and passes each value into the function
     * provided.
     *
     * Otherwise it just calls the callback with the item
     * given.
     *
     * Why? This is to cut down on null checks and for
     * allowing both array and non-array versions of a
     * function. Instead in all cases, I just call 'iter'.
     */
    var iter = function( obj, callback ) {
        if ( obj === undefined ) {
            return;
        } else if ( obj instanceof Array || obj.constructor.prototype === OBJECT_PROTOTYPE ) {
            map( obj, callback );
        } else {
            callback.call( obj, obj );
        }
    }

    var map = function( arr, fun ) {
        var arity = fun.length;

        if ( arity <= 1 ) {
            for ( var k in arr ) {
                if ( arr.hasOwnProperty(k) ) {
                    var obj = arr[k];

                    fun.call( obj, obj );
                }
            }
        } else if ( arity === 2 ) {
            for ( var k in arr ) {
                if ( arr.hasOwnProperty(k) ) {
                    var obj = arr[k];

                    fun.call( obj, k, obj );
                }
            }
        } else {
            var args = new Array( arguments.length );

            for ( var i = 2; i < arguments.length; i++ ) {
                args[i] = arguments[i];
            }

            for ( var k in arr ) {
                if ( arr.hasOwnProperty(k) ) {
                    var obj = arr[k];
                    
                    args[0] = k;
                    args[1] = obj;

                    fun.apply( obj, args );
                }
            }
        }
    };

    var init = function( obj ) {
        for ( var k in obj ) {
            if ( obj.hasOwnProperty(k) ) {
                var node = obj[k];

                if ( k === 'init' && node instanceof Function ) {
                    obj[k]();
                } else if ( typeof node === 'object' ) {
                    init( node );
                }
            }
        }
    }

    init( teletext );
});
