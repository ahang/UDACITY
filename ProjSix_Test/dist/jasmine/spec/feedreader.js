/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensured it has a URL defined
         * and that the URL is not empty.
         */
        it('Is URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });
        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensured it has a name defined
         * and that the name is not empty.
         */
        it('is name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* Wrote a new test suite named "The menu" */
    describe('The menu', function() {
        /* Wrote a test that ensured the menu element is
         * hidden by default. This was done by analyzing the HTML and
         * the CSS to determine the menu element.
         */
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
        /* Wrote a test that ensured the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('change visibility when clicked', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Wrote a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Wrote a test that ensured when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least one entry', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* Wrote a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Wrote a test that ensured when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed;
        var newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').find('h2').text();
                loadFeed(1, function() {
                    newFeed = $('.feed').find('h2').text();
                    done();
                });
            });
        });

        it('new feed is loaded', function() {
            expect(oldFeed).not.toEqual(newFeed);
        });
    });
}());