/**
 * Test the StatsService.
 */
define([
    'intern!object',
    'intern/chai!assert',
    'core/StatsService',
    'preview/harModel',
    'text!../hars/issue-61.har',
    'text!../../../webapp/examples/google.com.har'
], function (registerSuite, assert, StatsService, HarModel, issue61Har, googleHar) {

    // Set up the expectations
    var expected = {
        issue61: {
            har: JSON.parse(issue61Har),
            timings: {
                "blocked": 6.09800004167482,
                "dns": 0,
                "ssl": 0,
                "connect": 0,
                "send": 0,
                "wait": 4.39499999629338,
                "receive": 3.3939999993890115
            },
            content: {
                html: { resBodySize: 0, count: 0 },
                js: { resBodySize: 0, count: 1 },
                css: { resBodySize: 0, count: 0 },
                image: { resBodySize: 0, count: 0 },
                flash: { resBodySize: 0, count: 0 },
                other: { resBodySize: 0, count: 0 }
            },
            traffic: {
                request: { headersSize: 0, bodySize: 0 },
                response: { headersSize: 0, bodySize: 0 }
            },
            cache: {
                partial: { resBodySize: 0, count: 0 },
                cached: { resBodySize: 658, count: 1 },
                downloaded: { resBodySize: 0, count: 0 }
            }
        },
        google: {
            har: JSON.parse(googleHar),
            timings: {
                "blocked": 0,
                "dns": 0,
                "ssl": 0,
                "connect": 0,
                "send": 0,
                "wait": 234,
                "receive": 47
            },
            content: {
                html: { resBodySize: 3694, count: 2 },
                js: { resBodySize: 8646, count: 1 },
                css: { resBodySize: 0, count: 0 },
                image: { resBodySize: 12983, count: 2 },
                flash: { resBodySize: 0, count: 0 },
                other: { resBodySize: 0, count: 0 }
            },
            traffic: {
                request: { headersSize: 3339, bodySize: 0 },
                response: { headersSize: 1223, bodySize: 25323 }
            },
            cache: {
                partial: { resBodySize: 0, count: 0 },
                cached: { resBodySize: 0, count: 0 },
                downloaded: { count: 4, resBodySize: 25323 }
            }
        }
    };

    // Returns a function that iterates over the expected values and compares them to the actual values
    function createTest(testName, methodName, har, expected) {
        return function() {
            var model = new HarModel();
            model.append(har);
            var stats = new StatsService(model);
            var totals = stats[methodName]([null]);
            for (var k in expected) {
                assert.deepEqual(totals[k], expected[k], k);
            }
        };
    }

    function registerTests(suiteInfo) {
        // Iterate over the expectations and create tests to compare each expected
        // object to the actual object.
        for (var keyTestData in expected) {
            var testData = expected[keyTestData];
            for (var keyTotals in testData) {
                // 'har' isn't something we want to compare
                if ('har' !== keyTotals) {
                    // E.g. 'Timings'
                    var type = keyTotals.substring(0, 1).toUpperCase() + keyTotals.substring(1);

                    // E.g. 'calcTimingsTotals'
                    var methodName = 'calc' + type + 'Totals';

                    // E.g. 'issue61_calcTimingsTotals'
                    var testName = keyTestData + '_' + methodName;

                    // E.g. create a test to compare the timings for a particular har.
                    suiteInfo[testName] = createTest(testName, methodName, testData.har, testData[keyTotals]);
                }
            }
        }
    }

    var suiteInfo = {
        name: 'core/StatsService'
    };
    registerTests(suiteInfo);
    registerSuite(suiteInfo);
});
