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

    /**
     * How fast a page will refresh, in milliseconds.
     */
    var REFRESH_SPEED = 8000;

    /**
     * All Teletext pages, stored, in one big sparse array.
     */
    var pages = [];

    var KEY_0 = 48,
        KEY_9 = 57;

    var teletext = window['teletext'] = {
        pageNotFound: function( page ) {
            teletext.addPage( 404, page );
        },

        addPage: function( number, data ) {
            var pageContents = new Array( arguments.length-1 );
            for ( var i = 1; i < arguments.length; i++ ) {
                pageContents[i-1] = arguments[i];
            }

            pages[number] = pageContents;
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

                if ( page !== undefined ) {
                    teletext.screen.set( number, page );
                } else {
                    teletext.screen.set( '404', pages[404] );
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

            pageIndex: 0,
            pages: null,

            pagesCounter: null,

            flicker: true,

            init: function() {
                this.pagesCounter = $('.page-counter');

                /*
                 * Refresh the page every few seconds.
                 */
                var self = this;

                setInterval( function() {
                    if ( self.pages && self.flicker ) {
                        self.pageIndex = (self.pageIndex+1) % self.pages.length
                        self.setPage( self.pages[self.pageIndex], self.pageIndex, self.pages.length );
                    }
                }, REFRESH_SPEED );
            },

            buildPage: function(data) {
                var page,
                    contents;

                if ( data === null ) {
                    return $('<br>');
                } else if ( data instanceof Array ) {
                    page = $('<div>');
                    contents = data;
                } else {
                    var type = data.type || 'div';

                    if ( data.img ) {
                        type = 'img';
                    }
                    page = $('<' + type + '>');

                    if ( data.img ) {
                        page.attr('src', data.img);
                    }

                    iter( data.classes, function(klass) {
                        page.addClass( klass );
                    } );

                    if ( typeof data.css === 'string' ) {
                        page.addClass( data.css );
                    } else {
                        iter( data.css, function(key, val) {
                            page.css( key, val );
                        } );
                    }

                    iter( data.url || data.href, function(url) {
                        page.attr( 'href', url );
                    } );

                    iter( data.style, function(style) {
                        page.attr( 'style', style );
                    } );

                    contents = data.content || data.contents;
                }

                if ( ! (contents instanceof Array) && (contents instanceof Object) ) {
                    page.append( teletext.screen.buildPage(contents) );
                } else {
                    iter( contents, function(child) {
                        if ( typeof child === 'string' || child instanceof String ) {
                            page.append( child );
                        } else {
                            page.append( teletext.screen.buildPage(child) );
                        }
                    } );
                }

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
                }, 1000 );

                return page;
            },

            set: function( number, pages ) {
                teletext.topbar.setUserNumber( number );
                teletext.topbar.setNumber( number );

                this.pages = pages;
                this.pageIndex = 0;

                this.setPage( pages[0], 0, pages.length );
            },

            setPage: function(data, currentNum, maxNum) {
                var internalPage = teletext.screen.buildPage( data, true )
                internalPage.addClass( 'teletext-internal-page' );

                var newContents = teletext.screen.setupBlinkTimer( internalPage );
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

                if ( maxNum <= 1 ) {
                    teletext.screen.pagesCounter.hide();
                } else {
                    teletext.screen.pagesCounter.show().text( (currentNum+1) + '/' + maxNum  );
                }

                this.flicker = ! newContents.hasClass( 'no-flicker' );
                console.log( this.flicker );
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
