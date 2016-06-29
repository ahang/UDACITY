## Website Performance Optimization portfolio project

Welcome to the optimization project. The goal of the project is to reach a score of 90 or
above in PageSpeed Insights and 60 FPS in scrolling. I was able to optimize the page to
obtain a score of 95.

### Getting started

To view the page. Please copy and paste the below link to your web browser http://dashaman.github.io/UDACITY/ProjFour_Opt/dist/index.html. If you wish to download it to your system please navigate to the link https://github.com/dashaman/UDACITY/tree/gh-pages/ProjFour_Opt

####Part 1: Optimize PageSpeed Insights score for index.html

1. Utilized Google API for usage of webfont.
2. Inlined style.css to index.html
3. Added media query "Print" for print.css
4. Added async tags to analytics.js and perfmatters.js
5. Minified the images in img folder.


####Part 2: Optimize Frames per Second in pizza.html

1. Changed document.getElementById("pizzaSize")to pizzaSize.innerHTML. The function gets called only once.
2. Took out dx and newWidth out of the loop since it is only a constant number.
3. Took document.body.scrollTop out of the loop and set it to pScroll to cache it.
4. Set a seperate loop for calculating Phase
5. Set a variable movingPizzas outside of the loop and used getElementById instead of querySelector.
5. Used a variable to replace the amount of pizzas being displayed.

Sources
-Grunt to minify images
-PageSpeed to identify ways to optimize the project.
-Chrome Dev Tools for monitoring frames/jank
-Utilized Optimization Tips and Tricks to better understand optimizing the project.

