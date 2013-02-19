"use strict";

$(function() {
    teletext.pageNotFound([{
            classes: 'center',
            contents: [
                    null,
                    null,
                    null,
                    null,

                    null,
                    null,
                    null,
                    null,

                    {
                        classes: 'header-bar',
                        style: 'font-size: 128px',
                        content: '404'
                    },

                    null,
                    null,
                    null,

                    'The page you are looking for, was not found',

                    null,
                    null,

                    'Type 100 to return to index'
            ]
    }])

    teletext.addPage( 100,
            [
                {
                    classes: [ "index-bar" ],
                    contents: [
                            "Joseph\nLenton",
                            { classes: "me-picture" }
                    ]
                },
                {
                    classes: 'index-room',
                    contents: "Now available in room 119!"
                },
                {
                    classes: 'index-left',
                    contents: (([
                            "hi,",
                            "&nbsp;&nbsp;&nbsp;&nbsp;I am a PHD student researching visual programming languages for touch devices.",
                            '',
                            "I also work with modern web technology, across JS, TypeScript, CSS3, and HTML5."
                    ]).join( '<br>' ))
                },
                {
                    type: 'a',
                    classes: 'index-email yellow blue-back',
                    content: 'jxl299@cs.bham.ac.uk',
                    href: 'mailto://jxl299@cs.bham.ac.uk'
                },
                {
                    classes: 'index-right yellow',
                    contents: [
                            "104 About\n",
                            "200 My PHD\n",
                            "390 Interests\n",
                            "600 Projects\n",
                            {
                                classes: [ 'red-back', 'white', 'no-ie' ],
                                content: '611 Play!'
                            }
                    ]
                }
            ],
            [
                {
                    classes: 'la-jetee-back center',
                    contents: [
                            {
                                classes: 'header-bar white',
                                contents: 'this site'
                            },

                            "This page is my own implementation of TeleText.",

                            null,
                            null,
                            "To navigate, you use the number pad, and type in one of the teletext codes.",

                            null,
                            null,
                            "You then wait ... until it loads ...",

                            null,
                            null,
                            "Some pages have multple screens to show; you have to wait to go through them. If you miss a page, you have to wait for it come around,.. again.",

                            null,
                            null,
                            "Enjoy!",

                            null,
                            null,
                            null,
                            null,
                            null,

                            {
                                classes: 'center',
                                contents: [{
                                    type: 'a',
                                    href: 'https://github.com/JosephLenton/WebPage',

                                    classes: 'github-fork center green',
                                    contents: 'you can find the code for this site<br>on github!'
                                }]
                            }
                    ]
                }
            ]
    );

    /**
     * 200 - My PHD
     */
    teletext.addPage( 200, [
            {
                classes: 'column-left padded',
                content: [
                        'My research is on visual programming languages for touch devices.',
                        '<br>',
                        '<br>',
                        'How can we build software on tablet computers, given their recent dominance?',
                        '<br>',
                        '<br>',
                        'My supervisors are Andrew Howes and Achim Jung.'
                ]
            },
            {
                classes: 'column-right',
                content: [
                        {
                            classes: 'header-bar right pink-back',
                            content: 'PHD'
                        }
                ]
            },

            {
                img: './images/ipad_blocky.png',
                classes: 'phd-ipad'
            },
            {
                img: './images/nexus-blocky.png',
                classes: 'phd-nexus'
            }
    ] );

    /**
     * 300 - Adverts and games
     */
    teletext.addPage( 386, {
            classes: [ 'grey-back', 'white' ],
            content: [
                    {
                        classes: "header-bar white blue-back",
                        contents: "CAT LOANS!"
                    },
                    {
                        img: './images/cat.png',
                        classes: 'cat-loan-img'
                    },
                    {
                        classes: 'cat-loan-right',
                        contents: [
                                "Meowth is the right time to invest in your pride<br>",
                                '<br>',

                                "Why not get a new car, haz a cheeze burger, or buy mice?<br>",
                                '<br>',

                                "With purr-fect interest rates, we are the right cats for you.<br>",
                                '<br>',

                                {
                                        classes: [ "blink", 'center', 'large' ],
                                        content: "<br>GET A CAT LOAN TODAY!"
                                },
                                '<br>',
                                {
                                    classes: [ 'small', 'right', 'grey' ],
                                    content: '<br>no affiliation with dog-accounts'
                                }
                        ]
                    }
            ]
    } );
    teletext.addPage( 390, [
            {
                classes: "header-bar white pink-back",
                contents: "Interests"
            }
    ] );

    /**
     * The projects pages.
     */
    teletext.addPage( 600, [
            {
                classes: [ "header-bar", "yellow", "red-blue-back", "blink" ],
                contents: "PROJECTS"
            },
            {
                classes: "project-list",
                contents: [
                        " 610 Play My Code\n",
                        " 620 PHP Error\n",
                        " 630 SkyBrush\n",
                        " 640 Quby Language\n"
                ]
            },
            {
                type: 'a',
                classes: 'center block',
                url: 'http://github.com/josephlenton',
                contents: "You can find most of my projects on GitHub"
            },

            {
                classes: [ "ad-bottom", "blue-back", "white" ],
                contents: "NEED A LOAN? - SEE p386"
            }
    ] );

    // Play My Code
    teletext.addPage( 610, {
            classes: [ "pmc-back", "white" ],

            content: [
                    {
                        classes: "pmc-header",
                        content: "Play&#x205F;&#x200a;&#x200a;My&#x205F;&#x200a;&#x200a;Code"
                    },
                    {
                        type: 'p',
                        content: "A browser based, game building IDE and publishing site"
                    }
            ]
    });

    teletext.addPage( 611, {
            classes: 'pmc-game',
            content: '<iframe width="640" height="444" src="http://www.playmycode.com/play/embed/joe/ourobo-ware" marginheight="0" marginwidth="0" scrolling="no" frameborder="0" style="border: none; border-size: 0; overflow: hidden; overflow-x: hidden; overflow-y: hidden;"></iframe>'
    });

    // PHP Error
    teletext.addPage( 620, {
            classes: 'white-back',
            content: [
                {
                    classes: [ 'header-left-bar', 'black' ],
                    content: 'PHP Error'
                },

                {
                    classes: [ 'php-error-info black-back', 'white', 'full-width' ],
                    content: [
                            'error reporting library for PHP<br>',
                            '<br>',
                            'Gives you pretty stack traces<br>',
                            'and code snippets in the browser,<br>',
                            'and works for Ajax too.',
                            '<br>',
                            '<br>',
                            {
                                type: 'a',
                                href: 'http://phperror.net/',
                                content: 'available here'
                            }
                    ]
                }
            ]
    } );

    function parseTeletextQuery( str ) {
        if ( str.indexOf('=') === -1 ) {
            return parseInt( str ) || undefined;
        } else {
            var parts = str.split( '=' );

            if ( parts[0] === 'teletext' ) {
                return parseInt( parts[1] );
            }
        }
    }

    function getTeletextQuery() {
        var href = window.location.toString().split( '?' );

        if ( href.length > 1 ) {
            var query = href[1];

            if ( query.indexOf('&') === -1 ) {
                return parseTeletextQuery( query );
            } else {
                var query = query.split('&');

                for ( var i = 0; i < query.length; i++ ) {
                    var page = parseTeletextQuery( query[i] );

                    if ( page ) {
                        return page;
                    }
                }
            }
        }

        return null;
    }
    
    teletext.dial.setNow( getTeletextQuery() || 100 );
});

