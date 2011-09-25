How to Run "Posole"
===================

1. Get a spaceport.io developer account, and copy the client directory from one of
the sample apps into the posole folder.

1. Get a mongolabs account, copy config-example.js to config.js and update with
your mongolabs API key and connection url.

1. Start a webserver with posole as the docroot - spaceport cannot
be run in a sub-directory. Spaceport needs to have it's files in /client.

1. Point your browser to http://localhost/index.html?platform=flash

What's the point?
-----------------

The goal was to write a very simple, and very ugly heads or tails application
using spaceport.io, mongolab-hosted mongodb, and betable. 2 out of 3 is so-so.
betable was the last thing on my todo list and I wasn't able to unravel their
sample applications in the time I had left.

The brilliant idea behind the very limited goal was that you could induce people
to play a very simple pick a number game based on celebrity gossip and other
current events. There's a rumor that Jada Pinkett had an affair with Marc
Antony? Make a pick-3 game with Jada, Will, and Marc and place some ads on
gossip sites. That's evil, which gives me another excuse for not completing
the application, and more reasons for the world to be happy that I have no UI
or graphic design skills.

What's broken?
--------------

The high score list is too narrow to display the score rows. I couldn't figure
out how to set a width on the Text area. You also can't set your name. Although
you can type into the text field, there seems to be no way to access the text
from outside the swf. Since Spaceport has no api for an editable text field,
the swf is the only easy way to get one.

What else?
----------

jQuery and swftools were also used.