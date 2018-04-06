var storage = firebase.storage();

const Section = Object.freeze({
    PROGRAMMING: "programming",
    MECHANICAL: "mechanical",
    BUSINESS: "business",
    SAFETY: "safety",
    ELECTRICAL: "electrical",
    COMPETITION: "competition",
    GENERAL: "general"
});

// schema: /documents/<section>/<title>.txt

/***
 * This stores the article
 * Usage: sendToFirebase($("stuff").text(), Section.PROGRAMMING, "amazing_document")
 * @param text - html raw code version from froala
 * @param section - this is from `Section` enum
 * @param title - title of the article
 */

var sanitize = function (input) {
    const sanitize = /(\s)/g;
    return input.replace(sanitize, "");
};

var sendToFirebase = function (text, section, title) {
    /// TODO Fix firebase rules and add authentications !!!!!!!!!!
    var sanitizedTitle = sanitize(title);
    storage.ref().child('documents').child(section).child(sanitizedTitle + '.html').putString(text).then((snapshot) => {
        console.log("Uploaded file:", sanitizedTitle, snapshot);
    })
};

var getArticleText = function () {
    return $('#eg-previewer').text();
};

var getSelectedSection = function () {
    return $("section").value.toLowerCase();
};

var getArticleTitle = function () {
    return sanitize($("file-name").text())
}

jQuery(document).ready(function ($) {

    $("#submit").onclick = function () {
        var articleText = getArticleText();
        var articleSection = Section[getSelectedSection()] || Section.GENERAL;
        var articleTitle = getArticleTitle();
        sendToFirebase(articleText, articleSection, articleTitle); // TODO SHIV get section from selected btn dropdown menu in editor
    };

    // $('div#froala-editor')
    //     .on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
    //         $('pre#eg-previewer').text(editor.codeBeautifier.run(editor.html.get()))
    //     })
    //     .froalaEditor();

    $(function () {
        $.FroalaEditor.DefineIcon('my_dropdown', {NAME: 'check'});
        $.FroalaEditor.RegisterCommand('my_dropdown', {
            title: 'Advanced options',
            type: 'dropdown',
            focus: false,
            undo: false,
            refreshAfterCallback: true,
            options: {
                'v1': 'Insert Checkbox',
                'v2': 'Insert Blue Alliance Card'
            },
            callback: function (cmd, val) {
                console.log(val);
            },
            // Callback on refresh.
            refresh: function ($btn) {
                console.log('do refresh');
            },
            // Callback on dropdown show.
            refreshOnShow: function ($btn, $dropdown) {
                console.log('do refresh when show');
            }
        });
        $('div#froala-editor')
            .on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
                $('pre#eg-previewer').text(editor.codeBeautifier.run(editor.html.get()))
            }).froalaEditor({
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'putdent', 'indent', 'quote', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', 'print', 'help', 'html', 'undo', 'redo', 'formatBlock', 'my_dropdown']
        })
            .on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
                // $('#preview').html(editor.html.get());
                $('pre#eg-previewer').text(editor.codeBeautifier.run(editor.html.get()))

            })
    });

//     $(function() {
//         $.FroalaEditor.DefineIcon('my_dropdown', { NAME: 'check' });
//         $.FroalaEditor.RegisterCommand('my_dropdown', {
//             title: 'Advanced options',
//             type: 'dropdown',
//             focus: false,
//             undo: false,
//             refreshAfterCallback: true,
//             options: {
//                 'v1': 'Insert Checkbox',
//                 'v2': 'Insert Blue Alliance Card'
//             },
//             callback: function(cmd, val) {
//                 console.log(val);
//             },
//             // Callback on refresh.
//             refresh: function($btn) {
//                 console.log('do refresh');
//             },
//             // Callback on dropdown show.
//             refreshOnShow: function($btn, $dropdown) {
//                 console.log('do refresh when show');
//             }
//         });
//
//         $('div#froala-editor').froalaEditor({
//             toolbarButtons: ['bold', 'italic', 'formatBlock', 'my_dropdown']
//         })
//     });
});