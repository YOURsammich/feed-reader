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


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('has a url', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();

                //make sure url is a string
                expect(feed.url).toEqual(jasmine.any(String));

                expect(feed.url.length).not.toBe(0);
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has a name', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();

                //make sure name is a string
                expect(feed.name).toEqual(jasmine.any(String));

                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A new test suite named "The menu" */

    describe('The menu', function() {
        const menuEl = document.getElementsByClassName('slide-menu')[0];

        /* A test that ensures the menu element is
         * hidden by default.
         */

        it('should be hidden', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
        
        /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */

        it('changes view on click', function() {
            const menuToggle = document.getElementsByClassName('menu-icon-link')[0];

            // trigger click
            menuToggle.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            // trigger click
            menuToggle.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

    });


    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('loadFeed completes its work', function() {
            expect(document.getElementsByClassName('entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        let oldHTML;
        let newHTML;

        beforeEach(function (done) {
            const feed = document.getElementsByClassName('feed')[0];
            loadFeed(0, function () {
                oldHTML = feed.innerHTML;
                loadFeed(1, function () {
                    newHTML = feed.innerHTML;
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        it('changes html', function() {
            expect(oldHTML === newHTML).toBe(false);
        });
    });
}());
