"use strict";

$(function() {
    teletext.addPage( 100, [
            {
                classes: [ "index-bar" ],
                contents: [
                        "Joseph\nLenton",
                        { classes: "me-picture" }
                ]
            },
            {
                classes: 'index-left',
                contents: "blah blah blah, content goes here, blah blah"
            },
            {
                classes: 'index-right yellow',
                contents: [
                        "104 About\n",
                        "200 My PHD\n",
                        "390 Horses\n",
                        "600 Projects\n"
                ]
            }
    ] );

    /**
     * 200 - My PHD
     */
    teletext.addPage( 200, [
            "\\\\todo"
    ] );

    /**
     * 300 - Adverts and games
     */
    teletext.addPage( 386, [
            {
                classes: "header-bar white blue-back",
                contents: "CAT LOANS!"
            }
    ] );
    teletext.addPage( 390, [
            {
                classes: "header-bar white pink-back",
                contents: "HORSES!"
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
                        " 601 Play My Code\n",
                        " 602 PHP Error\n",
                        " 603 SkyBrush\n",
                        " 604 Quby Language\n"
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
    teletext.addPage( 601, [
            {
                classes: [
                        "header-bar",
                        "white",
                        "pink-background"
                ],
                content: "Play My Code"
            }
    ] );

    // PHP Error
    teletext.addPage( 602, [
            {
                classes: [ 'header-bar', 'black', 'white-back' ],
                content: 'PHP Error'
            }
    ] );

    teletext.dial.setNow( 100 );
});

