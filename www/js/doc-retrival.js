'use strict';

var config = {
    apiKey: "AIzaSyAJxgFYCZTyKGmAiFL62deumu3Sf_S3luQ",
    authDomain: "techno-titans-app.firebaseapp.com",
    databaseURL: "https://techno-titans-app.firebaseio.com",
    projectId: "techno-titans-app",
    storageBucket: "techno-titans-app.appspot.com",
    messagingSenderId: "229979215973"
};

firebase.initializeApp(config);
var storage = firebase.storage();

var allDocs = [];

// iterate through the folders and get all the urls
// we already know the folder structure, but we don't know article names,
// so we can just iterate over it
// SHOULD BE CALLED AS SOME SORT OF PREFETCH OR `window.onload` or something

var getDocUrls = function () {
    var tempDocArray = [];
    return new Promise(resolve => {
        Section.forEach((section) => {
            // tempDocArray.push(storage.ref().child('documents').child(section) // TODO iterate over articles and
        });
        resolve(tempDocArray);
    })
};

var parseDocument = function () {

};

var getAllDocs = function() {

};
