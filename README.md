SomeRandomProject
=================

A random web project


Known Issues:
* Clicking header should refresh the home page
* Should improve typography
* Should limit the number of posts displayed at once (at least initially)
* Possibly scroll the tweetList area, not the entire page
* Override bootstrap button styling causing refresh button to remain highlighted
* Add a logo and favicon
* Use library to display times in user-friendly way
* Slide-up animation for new tweet form not working
* Clicking on any non-input area of the new tweet form when it/it's children did not have focus should bring focus to first empty input field
* Post button on new tweet form should feel more "confirmy" for lack of a better word.  Polymer paper buttons seem like a decent choice
* Enter key in <textarea> of new tweet form should submit the form
* User header should be larger
* Fix to cycle tab order within new tweet form seems to have made it impossible to tab to tweet elements, even when form is hidden


Wish List:
*Move data_generator.js code into an AngularJS service and take advantage of 2-way data binding to make refresh button unnecessary
*Use Angular views/templates to separate home tweet list and user tweet list
