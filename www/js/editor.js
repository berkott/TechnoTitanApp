jQuery(document).ready(function($) {
    // Your code here
    $('div#froala-editor')
        .on('froalaEditor.contentChanged froalaEditor.initialized', function(e, editor) {
            $('pre#eg-previewer').text(editor.codeBeautifier.run(editor.html.get()))
        })
        .froalaEditor()

    $(function() {
        $('div#froala-editor').froalaEditor()
            .on('froalaEditor.contentChanged', function(e, editor) {
                $('#preview').html(editor.html.get());
            })
    });

    $(function() {
        $.FroalaEditor.DefineIcon('my_dropdown', { NAME: 'cog' });
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
            callback: function(cmd, val) {
                console.log(val);
            },
            // Callback on refresh.
            refresh: function($btn) {
                console.log('do refresh');
            },
            // Callback on dropdown show.
            refreshOnShow: function($btn, $dropdown) {
                console.log('do refresh when show');
            }
        });

        $('div#froala-editor').froalaEditor({
            toolbarButtons: ['bold', 'italic', 'formatBlock', 'my_dropdown']
        })
    });





});