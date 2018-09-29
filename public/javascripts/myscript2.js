$(document).ready(exec);
    var libraries = [];


function exec() {
    l = $('#modal .lib_link');
    l.map(function(x,y){
libraries.push($(y).text().toString());
});
    $('#modal .rem').click(remove_libraries);
    
    var snippet = ["<!DOCTYPE html>",
        "<html>",
        "<head>",
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width">',
        "<title>JS Bin</title>",
        "</head>",
        "<body>",
        "</body>",
        "</html>"
    ];

    var h_editor = ace.edit("html_editor");
    h_editor.setTheme("ace/theme/xcode");
    h_editor.session.setMode("ace/mode/html");
    h_editor.setShowPrintMargin(false);

    // h_editor.setValue("resnponse-data');

    var c_editor = ace.edit("css_editor");
    c_editor.setTheme("ace/theme/xcode");
    c_editor.session.setMode("ace/mode/css");
    c_editor.setShowPrintMargin(false);

    var j_editor = ace.edit("js_editor");
    j_editor.setTheme("ace/theme/xcode");
    j_editor.session.setMode("ace/mode/javascript");
    j_editor.setShowPrintMargin(false);


    h_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    c_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    j_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });


    $(".post_details").click(show_post_details);


    Mousetrap.bind('ctrl+1', function(e) {
        console.log('hello');
        $('.editors').css("grid-template-columns", '70% auto auto');

    });


    Mousetrap.bind('ctrl+2', function(e) {
        console.log('hello');
        $('.editors').css("grid-template-columns", 'auto 70%  auto');

    });


    Mousetrap.bind('ctrl+3', function(e) {
        console.log('hello');
        $('.editors').css("grid-template-columns", 'auto auto 70%');

    });


    $("#libraries").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: 'https://api.cdnjs.com/libraries?',
                dataType: "jsonp",
                data: {
                    search: request.term
                },
                success: function(data) {
                    response(data.results.map(x => ({ label: x.name, value: x.latest })));
                }
            });
        },
        appendTo: '#modal',
        minLength: 3,
        select: save_libraries
    });



    $('.save').click(function() {
        save_file(h_editor, c_editor, j_editor, libraries)
    });
    $('.expand_html').click(function() {
        $('.editors').css("grid-template-columns", '70% auto auto');
    });

    $('.expand_css').click(function() {
        $('.editors').css("grid-template-columns", 'auto 70% auto');
    });

    $('.expand_js').click(function() {
        $('.editors').css("grid-template-columns", 'auto auto 70%');
    });

    $('.reset_view').click(function() {
        $('.editors').css("grid-template-columns", 'auto auto auto');
    });

    $('.fork').click(function() {
        fork_file(h_editor, c_editor, j_editor);
    });

} //end of exec

function save_file(h_editor, c_editor, j_editor, libs) {
    var h = h_editor.getValue();
    var c = c_editor.getValue();
    var j = j_editor.getValue();
    id = window.location.pathname;
    console.log(id);
    id = id.replace('/', '');
    var data = { html: h, css: c, js: j, id: id, libs: libs };


    console.log(data);
    $.ajax({
        url: '/save',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(msg) {
            window.location.href= msg.redirect;

        }
    });


}


function fork_file(h_editor, c_editor, j_editor, libs) {
    var h = h_editor.getValue();
    var c = c_editor.getValue();
    var j = j_editor.getValue();
    id = '';
    console.log(id);
    var data = { html: h, css: c, js: j, id: id, libs: libs };


    console.log(data);
    $.ajax({
        url: '/save',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(msg) {
            window.location.href= location.origin + '/' + msg.redirect;

        }
    });


}


function show_post_details() {
    $('#modal').toggleClass('modal_hide modal_show');
}

var save_libraries = function(event, ui) {
    libraries.push(ui.item.value);
    $("#modal").append(`<p class='lib_link'> <span> ${ui.item.value} </span> <button class='rem'> Remove </button> </p>`);
    $('#modal .rem').click(remove_libraries);

}

function remove_libraries() {
    var w = $(this).prev().text();
    w = w.toString();
    var loc = libraries.indexOf(w);
    libraries.splice(loc, 1); //remove the library from array
    $(this).parent().remove();
}