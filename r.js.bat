set MYDIR=%~dp0
set RJSDIR=%MYDIR%r.js
java -classpath %RJSDIR%/lib/rhino/js.jar;%RJSDIR%/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main %RJSDIR%/dist/r.js %*