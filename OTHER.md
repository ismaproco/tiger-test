README
---------------

I started investigating for design patterns in backbonejs, it was a while since I made my last application in Backbone, and wanted to have a fresh look of any changes of the framework.

I did the same thing for LayoutManager, and Highcharts, with the exception that I didn't knew anything about it, and it was quite hard compared with backbone, and the project samples in the project documentation were the most helpful ones. For highcharts was the tutorialize page.

Then I started to work in the Gruntfile, I found it very organized, so it was straight forward to add the LESS tasks (less, concat and copy).

Then I added cleaned up the project, and created a basic structure, the project isn't that big so I try to keep it simple but not simplistic, I created one file per subject (controllers, views, models, router), to test the loading order I added console.log where was required just to see if everything was alright.

Then I started working in the router and the controller, I had sketched a simple Layout consisting of three pages (main, instructions, graph details) and the views in them. Later on, I realized I needed another for the README.

With the routes created then I worked in the views, they consist of templates, it took me a while to understand how they were being loaded and added to the project, once I understood all the JST, global spacing and that was part of the requirejs, I implemented a single loader in the controller to load and fill the views into the main layout.

Tested again, make sure all the views were being loaded with the change of url in the browser. With that working, I started to work in the HTML and the styles. Created a basic navigation bar, a menu button, and the menu, I though will be nice to have some icons so I added font-awesome to bower and added to the project.

Then I work in the load of the charts, I thought it will be better to load a JSON with a list of charts, this list will be loaded in a collection where I could grab individual charts properties to show the thumbnails and the urls for the loading of the full-page graphs. While doing this I realized it will be good to have a config module with basic parameters for the application, and I created the resources folder for the JSON files.

With that done I loaded the thumbnails that I got from the highcharts page, I did the LESS to adjust the thumbnails. and I start working in the full page highcharts, this was more straight forward than I thought, I guess it was because the charting library is very easy to use at least for simple plotting, just send a JSON with the options, and series, and call .hightcharts there is a graph. Then I started to work in changing options for the graph (title and type).

That was it, some things toke me more time than expected particularly understand the whole Layout manager configuration and loading. but was able to solve it Also I did structural changes on the go somethings that I found out of place I move them for a better one, for example: there was some logic for the views setting that was in the router that I moved to the controller, many logic for the load of the models that I put in the view that logically fit better in the collections. And so on.

#There are many things that can be improved:

- The routing can be implemented to load from a resource instead, of this manual steps of creating a simple view, create the handler in the controller and then the route. 

- The styles can be better and some updates to make it responsive.

- I think I polluted the grunt task, that could be done better (the less and the concat come to mind)

There are no changes for the project execution:
```
$ bower install && npm install
$ grunt server
```
