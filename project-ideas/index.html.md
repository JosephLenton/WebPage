<!DOCTYPE html>

<script src="./lib/paper.js">
    paper.className( 'academic' );

    paper.onLoad(function() {
        var dom = $( '.skybrush' );
        var skybrush = new SkyBrush( dom );
    });

    paper.onLoad( function() {
        var phpError = $('.phperror-example > iframe');
        var updatePHPErrorSize = function() {
            var width = $('html').width();

            phpError.width( width );
            phpError.css( 'margin-left', - (width-600)/2 - 1 );
        }

        $('html').resize( function() {
            updatePHPErrorSize();
        } );

        updatePHPErrorSize();
    });
</script>

<link rel="stylesheet" href="./skybrush/css/skybrush.css" />

<script src="./skybrush/js/skybrush.js"></script>
<script src="./skybrush/js/jquery-1.8.2.min.js"></script>
<script src="./skybrush/js/jquery.more.js"></script>

<style>
    html {
        overflow-x: hidden;
        padding-bottom: 128px !important;
    }
    h1 {
        font-size: 32px !important;
    }
    body.academic > h2 {
        margin-top: 64px;
        margin-bottom: 12px;
        text-align: left;
        font-size : 32px !important;
    }

    .editor-example {
        width: 700px;
        margin-left: -82px;
        height: 800px;
    }
    figure.phperror-example {
        padding-left: 0;
        padding-right: 0;

        height: 867px;
    }
        .phperror-example > iframe {
            -webkit-transform: scale( 0.8, 0.8 ) translateY( -129px );
            -moz-transform: scale( 0.8, 0.8 ) translateY( -129px );
            transform: scale( 0.8, 0.8 ) translateY( -129px );

            width: 1000px;
            margin-left: -200px;
            height: 1032px;

            border-top: 1px solid #555;
            border-bottom: 1px solid #555;
            box-shadow: 0 0 18px rgba( 0, 0, 0, 0.3 );
            background: black;
        }
        .phperror-example > figcaption {
            -webkit-transform: translateY( -200px );
            -moz-transform: translateY( -200px );
            transform: translateY( -200px );
        }
    .skybrush {
        width: 944px;
        height: 600px;
        margin-left: -172px;
    }
        .skybrush_viewport {
            border: 1px solid #ccc;
            border-radius: 2px;
        }
    .game-example {
        width: 620px;
        height: 438px;
        margin-left: -42px;
    }
</style>

<header>
    # Project Ideas
</header>

My project ideas,
built around real practical problems,
mostly around software development.
They aim to not only provide a real problem to be solved,
but to also gauge how popular/used it may be,
if it were well implemented.

I would also encourage all of these to be released as open source.

Streamlined blogging site
-------------------------

If you want to write an article on a topic, or a blog post,
then you have to setup a blog, or setup a blogging account with a blogging site.
Only then can you write any posts.
This sucks, because I don't want a blog, I want *only* to write some articles.

So this idea is to build a blogging site,
where you can write blog posts either anonymously or named,
and they are listed and shared together all together,
in one place. 
To help explain what I am getting at,
if you visit [Imgur](http://imgur.com/) right now,
you can upload an image instantly,
without having to setup an account or login.
If you visit [JSFiddle](http://jsfiddle.net),
you can create an experimental HTML page,
without having to signup,
and if you visit [JSPerf](http://jsperf.com/), you can make a JavaScript benchmark, without having to login.

This would do the same, but for blog posts.
You could then add on logging in and sharing via facebook/Google+/Twitter,
so regular users could have some tracking for them (but no traditional blog management).

This page is also an example of the type of item I may use it for;
I just want to type out a list of ideas,
and then post it online.
I do not want any file or sharing management (such as with Google Docs / DropBox),
or blogging management (such as with Wordpress).

JavaScript Error, direct error reporting
-------------------------------------------------------------------------------------------

There was a project I built about 9 months ago, called [PHP Error](http://phperror.net).
It is for web development,
where if you get an error in your PHP on the server,
it throws away all of the content and displays a more pretty stack trace than you normall get.
It also shows the code from all of the locations in the stack trace.

<figure class="phperror-example">
<iframe src="http://phperror.net/home/example"></iframe>
<figcaption>an exmaple of a PHP error stack trace</figcaption>
</figure>

The idea behind this suggestion, is to the same, from scratch, but for JavaScript running in the browser.
Currently if you are developing, you essentially:

 - write code
 - alt+tab to the browser
 - refresh the page
 - open the console
 - see the error
 - alt-tab to your editor
 - find the correct file
 - find the location
 - fix the bug
 - save
 - alt-tab to the browser
 - refresh

The whole point of this, is to streamline that list. So instead:

 - write code
 - alt+tab to the browser
 - refresh page
 - if there is an error, it is shown, with the files already open, at the error location, all in the browser, in a single step.
 - fix the bug
 - click save, and it refreshes automatically

For simple bugs, like a misnamed variable or function, this would be really powerful.
There are also online editors you can leverage whilst building this,
to reduce the amount of work involved.
You would have to work out the error displaying,
rendering, and how to pull down files and save them back to the users machine.

### Potential

The PHP Error project that I built, has over 900 likes on Github,
and was the most popular project in the PHP section on Github for 2 months.
So it received a fair amount of praise.

The JS community is bigger than the PHP one,
so if you did a good job and it worked well,
then it could potentially get a tonne of users.

marking web site and system
-----------------------------

We have a marking system here in the department,
and it works, but it's not great.
The problem is that it doesn't really go far enough to provide the type of marking experience
that reflects all of it's use cases.
The alternative is to use custom Excel files, with something like Subversion for sharing and access control,
which is just bad.

So this project, is to build a marking system, which works well.
I would also add that many existing ideas add on extras (timetable management,
worksheets, tracking students, feedback systems, etc),
and it ends up detracting from the core use: marking!

### Potential

In theory, if works well, then it could be used for a module in a future year.
However the code would also be easy to navigate and understand,
so I could ensure it does security correctly.
If put online as an open source project,
it could potentially see work at schools or departments,
for use for tracking students.

Editor with better Documentation visualization
----------------------

Imagine an editor, where documentation comments are styled differently to code.

<figure>
    <iframe class="editor-example" src="./vim.html" ></iframe>
    <figcaption>An example of a file with documentation styled seperately to code</figcaption>
</figure>

The idea here, is that source code documentation looks more readable,
and stands out more.
In this example, I am using markdown to write out the source code, which has less cruft than Java-style comments.
The project idea is to build this concept into an editor,
so it is done automatically.
It would turn Java-style comments into pretty documentation comments,
and then back when the file is saved.
In my example, the documentation stands out more, but still looks like code.
It has a monospaced font, and ascii for headers.
So part of this is to also render that text a way that is more pretty,
whilst code still looks like code.
Kind of like how the documentation could look if written in a Word file.

It would also allow viewing just the documentation for a code file.

<h2>Improvements for embeddable Painting application</h2>

I built a standalone, embeddable painting application a while ago,
called [SkyBrush](http://github.com/PlayMyCode/SkyBrush).

<figure>
<div class="skybrush"></div>
<figcaption>An example of SkyBrush running within the browser</figcaption>
</figure>

It is an open source project, so the idea here is to make your own fork,
and then investigate and develop new features you could add on.
There are some obvious additions you could add, such as layers, filters, and new brushes,
but would be interesting if you could develop unique ideas that stand out.

You would also have to consider the interface, for any new components being added.
They need to work well, without cluttering the screen.

Working well on touch devices, specifically tablets, would also be a huge win!

### Potential

Right now, there are lots of browser based painting applications, which are built in HTML5 and JavaScript.
However there are very few, which are actually pretty decent
(a notable one being the one by Deviant Art).

So there is room for a painting application to stand out,
as being defacto one of the best you could use,
if you wanted a paint editor within a web site.

Many of those out there are experimental, proof of concept types of applications,
because of the amount of work required to build a good painting editor.
This is why I also suggest just forking what I have,
so you could build your own.

Alternatively you could start from scratch.

Develop a Web Framework for Prolog
----------------------

All of the other ideas have been about streamlining or improving existing problems.
This one is more of a wildcard option, being more of an experimental 'what if?' kind of idea.

### Setting

When most professionals build a web site these days, they use a web framework.
Some examples you could look up are Ruby on Rails, Django, Sinatra,
and a lot of people just use Wordpress (even if they are not producing a blog).

So the idea is to build a web framework, in Prolog, which one could use to build a site.

### Why Prolog?

If you do not know, Prolog is a logic based programming language, which very differently to others.
Instead of writing out what code should do, step by step,
you write out relationships, and Prolog then runs through the relationships in order,
looking for a solution that satisfies them.

Now a lot of web programming, is actually about saying relationships.
For example if you wanted to edit a page,
it might be:

 - user is visiting the page /edit
 - the user is logged in
 - the user is an administrator, or they own that document

These can be well expressed in Prolog code, in a way which is terse.
The problem is that there is a tonne of other code you would normally use for
web development, which is not there right now.

### Difficulty

Of all the ideas, this is the most fuzzy, and the most work.
It would include both learning Prolog (which is quite a challenge on its own),
developing ways to structure web sites,
and then implementing the functionality needed.

Especially the key is to build the framework 'the Prolog way',
as well as ensuring it fills the brief of a web framework,
and does it well.

It would definitely stand out for a lot of web developers,
due to how different Prolog is compared to most languages.
It would certainly get a fair amount of attention,
but that does not automatically mean it would be popular.

### Competition 

In terms of 'what is already out there',
there is some work on using Prolog for serving pages,
and for embedding HTML.
I also know who wrote a bloggin platform in Prolog,
however that is it.

Prolog has nothing for real web development,
so at least in the Prolog community,
this could stand out as a solution to that.

3D File Browser for tablets
---------------------------

In Jurassic Park, there is a scene where two of the kids navigate a file system,
using a 3D file explorer, to find a way to lock a door from dinosaurs.
It is actually a [real system](http://en.wikipedia.org/wiki/Fsn), developed for the [IRIX operating system](http://en.wikipedia.org/wiki/IRIX).

<figure>
<iframe src="http://www.youtube.com/embed/zaRHU1XxMJQ" frameborder="0" allowfullscreen></iframe>
<figcaption>The Fsn file explorer</figcaption>
</figure>

One of the issues I would expect with this, is mouse controls.
On a touch device, however it could work well.
So the idea for this project, is to develop a similar system,
however built around touch controls.
The aim is to provide the user with a unique experience to view files either on their tablet,
or perhaps on a different device.

### Potential

This is one of those projects which is more about the idea and learning experience,
rather than because of any practical benefit.
It could also look pretty cool, if done well.
It may also turn out to be very practical on a tablet, which would open up new ideas for visualizing information on PCs.

Why not Build a Game?
---------------------

Finally, you could ask if you could just build a game.
What the game entails, you would have to design yourself,
but it's a cool experience which allows you to be creative.

<figure>
    <iframe class="game-example" src="http://www.playmycode.com/play/embed/joe/space-snake-galaxies" marginheight="0" marginwidth="0" scrolling="no" frameborder="0" style="border: none; border-size: 0; overflow: hidden; overflow-x: hidden; overflow-y: hidden;"></iframe>
    <figcaption>Space Snake Galaxies, a game I made</figcaption>
</figure>

