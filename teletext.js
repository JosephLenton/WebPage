"use strict";

(function() {
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

    var teletext = {
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
            }
        }
    };

    $(function() {
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
})();
