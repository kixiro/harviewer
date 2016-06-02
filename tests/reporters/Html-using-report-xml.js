define([
    'intern/dojo/string',
    'intern/dojo/node!fs',
    'require'
], function(string, fs, require) {
    /**
     * This is a bit of a hacky reporter that piggy-backs on most of Intern's Html reporter, but
	 * can combine it with a JUnit report.xml file.
     */
    function HtmlUsingReportXmlReporter(config) {
        config = config || {};

        var loaderUrl = config.loaderUrl || 'https://ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js';

		// We use Intern's test lifecycle methods to record a wall-clock time of the test duration.
		// We do this because adding up the individual JUnit testsuite/testcase durations won't give us
		// wall-clock time.
        var start = 0;
        var duration = 0;

        this.writeReport = function() {
            var htmlReporterUrl = require.toUrl('intern/lib/reporters/Html.js');
            var htmlReporterCssUrl = require.toUrl('intern/lib/reporters/html/html.css');
            var htmlReporterHtmlUrl = require.toUrl('./Html-using-report-xml.html');

            var htmlReporter = fs.readFileSync(htmlReporterUrl, {
                encoding: 'utf8'
            });
            var htmlReporterCss = fs.readFileSync(htmlReporterCssUrl, {
                encoding: 'utf8'
            });
            var report = fs.readFileSync(htmlReporterHtmlUrl, {
                encoding: 'utf8'
            });

            // Give Html.js, aka HtmlReporter, a hard-coded MID inside the report.
            htmlReporter = htmlReporter.replace('define([', "define('HtmlReporter', [");

            // Remove all dependencies (e.g. '../util') as these can cause errors in the browser;
            // except require, we need that.
            htmlReporter = htmlReporter.replace(/\[[\s\S]*?\][\s\S]*?\([\s\S]*?\)/, "['require'], function (require)");

            // Interpolate the values into the report template.
            report = string.substitute(report, {
                HTML_LOADER_URL: loaderUrl,
                HTML_HTML_REPORTER: htmlReporter,
                HTML_HTML_REPORTER_CSS: htmlReporterCss,
                HTML_TOTAL_TEST_DURATION: duration
            });

            return report;
        };

        this.run = function() {
            start = +new Date();
        };

        this.runEnd = function() {
            duration = +new Date() - start;
            var report = 'Reporter "Html-using-report-xml" failed to report successfully.';
            try {
                report = this.writeReport();
            } catch (e) {
                report = '' + e;
            }
            config.output.end(report);
        };
    }

    return HtmlUsingReportXmlReporter;
});
