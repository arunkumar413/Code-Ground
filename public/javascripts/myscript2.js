$(document).ready(exec);
    var libraries = [];


function exec() {
    l = $('#modal .lib_link');
    l.map(function(x,y){
libraries.push($(y).text().toString());
});
    $('#modal .rem').click(remove_libraries);
    if (localStorage.getItem('theme')==null){
        theme = 'xcode';
    }

    else {
        theme = localStorage.getItem('theme');
    }
    var theme = localStorage.getItem('theme');
    var h_editor = ace.edit("html_editor");
    h_editor.setTheme("ace/theme/" + theme);
    h_editor.session.setMode("ace/mode/html");
    h_editor.setShowPrintMargin(false);

    // h_editor.setValue("resnponse-data');

    var c_editor = ace.edit("css_editor");
    c_editor.setTheme("ace/theme/"+theme);
    c_editor.session.setMode("ace/mode/css");
    c_editor.setShowPrintMargin(false);

    var j_editor = ace.edit("js_editor");
    j_editor.setTheme("ace/theme/"+theme);
    j_editor.session.setMode("ace/mode/javascript");
    j_editor.setShowPrintMargin(false);


    h_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2
    });

    c_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    j_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    $('.fa-moon').click(function(){
        h_editor.setTheme("ace/theme/ambiance");
        j_editor.setTheme("ace/theme/ambiance");
        c_editor.setTheme("ace/theme/ambiance");
        localStorage.setItem('theme','ambiance');
    });

    $('.fa-sun').click(function(){
        h_editor.setTheme("ace/theme/xcode");
        j_editor.setTheme("ace/theme/xcode");
        c_editor.setTheme("ace/theme/xcode");
        localStorage.setItem('theme','xcode');
    });

    $(".post_details").click(show_post_details);

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


    $('#libraries').on('paste', function () {
        var element = this;
        setTimeout(function () {
          var link = $(element).val();
              console.log(link);
              libraries.push(link);
              $("#modal").append(`<p class='lib_link'> <span> ${link} </span> <button class='rem'> Remove </button> </p>`);
        $('#modal .rem').click(remove_libraries);
        }, 100);
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


