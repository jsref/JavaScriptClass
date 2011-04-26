Sandbox is a learning app for the Eastworks JavaScript Class.

It is best viewed via Dropbox on your local machine (or copied to your local machine).  If you try to view index.html on the Dropbox website the links won't work properly.

To view the site:
1A.  Install Dropbox on your Mac or PC and accept the share, or
1B.  Download the directory to your Mac or PC.
2A.  Double click the index.html file on your local machine, or
2B.  In your browser, type the URL ([Users/stan/Dropbox] will be different)
	file:///Users/stan/Dropbox/JavaScriptClass/Sandbox/index.html

Sandbox is designed to:
	1.  Help with JavaScript programming.
	2.  Be code that can be copied.
	3.  Serve as homework assignments.

=================================
User Stories / Functional Spec:
=================================

* The user will type or paste a small piece of JavaScript code into a text area.  When an Evaluation button is pressed, the results of evaluating the code will show in the texture.

* The user will type or paste a multi-line string into a texture.  When a menu item is selected, the string will be split into a JavaScript-friendly representation for multi-line strings.

* The user can open new browser windows on JsLint, JsBin, and JsFiddle.

=================================
Programmer Stories / Design Spec:
=================================

* It is file-based (no server), and hosted on Dropbox, so we can all run it and edit it.

* It will use JavaScript objects as name spaces, but not use complicated object-oriented programming.

* For now, no storage.
