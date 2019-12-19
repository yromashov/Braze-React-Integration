## Introduction

This serves as a tutorial for how to get started integrating the Braze web SDK.

The framework of this site (HTML, CSS, Javascript) is already build out such that all that needs to be added is the Braze SDK and relevant methods to start logging user data.

This was ideated annd created by Seth Tillis @sdtilliss as part of his 2019 Summer Internship

## Instructions

Clone or download the repo to your computer.

There are two files that require editing: `index.html` and `script.js` They can be edited in any text editor or IDE. Check out sublime or atom if you don't have a text editor already

1) First you'll want to open up `index.html` and integrate the Braze SDK by following the instructions on our [github] (https://github.com/Appboy/appboy-web-sdk#getting-started). Be sure to change the  base URL [initialization](https://js.appboycdn.com/web-sdk/2.4/doc/module-appboy.html#.initialize) options to target our staging environment sondheim.braze.com.

2) Second, you'll want to go through the `script.js` file to add the Braze SDK methods to the javascript to actually collect user data in Braze when you click on the buttons. Throughout the `script.js` file, you'll find comments that tell you what to do. Example:

  > //TODO ADD CODE HERE. Pass the email variable into the Braze email capture method.

  You'll need to use your resources to identify which Braze method needs to be called here and insert it appropriately.

3) Once you've gone through and updated the script.js file, you can look in the Braze dashboard to find your user in your target environment and validate that the data is set appropriately
