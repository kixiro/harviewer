// Make sure you have done a full build and run the tests before running this script.
// E.g.
//   ant clean build jsdoc
// Then (if using Selenium standalone)
//   node node_modules\intern\bin\intern-runner.js config=tests/intern-selenium-standalone

var fs = require('fs');
var shell = require('shelljs');
var sanitize = require('sanitize-filename');

// Get the version.  Used when copying the JSDoc.
var version = require('./package.json').version;
shell.echo('version=' + version);

// Set verbose shell
shell.set('+v');

function execOrExit(cmd, errorMessage) {
  var shellStr = shell.exec(cmd);
  if (shellStr.code !== 0) {
    shell.echo(errorMessage || ('Error: ' + cmd));
    shell.exit(1);
  }
  return shellStr;
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

var branch = execOrExit('git rev-parse --abbrev-ref HEAD').stdout.trim();

// Check branch name is a valid folder name.
if (sanitize(branch) !== branch) {
  shell.echo('Branch name is an invalid folder name: ' + branch);
  shell.exit(1);
}

// Start from a clean gh-pages folder.
shell.rm('-rf', 'gh-pages');
shell.mkdir('-p', 'gh-pages');

// Set context to gh-pages folder.

shell.pushd('gh-pages');

// Prepare the gh-pages branch

execOrExit('git init .');
execOrExit('git remote add origin https://gitgrimbo@github.com/gitgrimbo/harviewer.git');
execOrExit('git pull origin gh-pages');

// Remove existing folder (if any) matching branch name.
shell.rm('-rf', branch);

// Copy webapp-build as gh-pages folder
shell.cp('-R', '../webapp-build/', branch);

// JSDoc

shell.mkdir('-p', branch + '/reports/jsdoc');
shell.cp('-R', '../webapp-jsdoc/harviewer/' + version + '/', branch + '/reports/jsdoc/');

// Code coverage

shell.mkdir('-p', branch + '/reports/html-report');
shell.cp('-R', '../html-report/', branch + '/reports/html-report/');

// Test report

shell.mkdir('-p', branch + '/reports/tests');
shell.cp('../Html-using-report-xml.html', branch + '/reports/tests/index.html');
shell.cp('../report.xml', branch + '/reports/tests/');

fs.writeFileSync(branch + '/reports/index.html', '<a href="jsdoc">JSDoc</a><br><a href="html-report">Code Coverage</a><br><a href="tests">Tests</a>');

var dirs = shell.ls('-d', '*/');
fs.writeFileSync('index.html', dirs.map(dir => '<li><a href="' + dir + '">' + dir + '</li>').join('\n'));

// Add new files.  Update modified/deleted files.  Amend commit.
execOrExit('git add .');
execOrExit('git add -u .');
execOrExit('git commit --amend --no-edit');

// Overwrite the old site

execOrExit('git push -f origin gh-pages');

shell.popd();
