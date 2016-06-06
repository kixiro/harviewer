/**
 * Test the RequestListService.
 */
define([
    'intern!object',
    'intern/chai!assert',
    'core/RequestListService',
    'text!../hars/issue-61.har',
    'text!../../../webapp/examples/google.com.har'
], function (registerSuite, assert, RequestListService, issue61Har, googleHar) {
    issue61Har = JSON.parse(issue61Har);
    googleHar = JSON.parse(googleHar);

    var suiteInfo = {
        name: 'core/RequestListService',

        'summarizePhase() throws Error': function() {
            assert.throws(function() {
                RequestListService.summarizePhase();
            });
        },

        'summarizePhase of no files has summary with zero values': function() {
            var expected = {
                cachedSize: 0,
                totalSize: 0,
                totalTime: 0,
                fileCount: 0
            };
            var phase = {
                files: []
            };
            var summary = RequestListService.summarizePhase(phase);
            assert.deepEqual(summary, expected);
        },

        'summarizePhase of issue61': function() {
            var expected = {
              cachedSize: 658,
              totalSize: 658,
              totalTime: 13.886962890625,
              fileCount: 1
            };
            var phase = {
                files: issue61Har.log.entries
            };
            var summary = RequestListService.summarizePhase(phase);
            for (var k in expected) {
                assert.deepEqual(summary[k], expected[k], k);
            }
        }
    };

    registerSuite(suiteInfo);
});
