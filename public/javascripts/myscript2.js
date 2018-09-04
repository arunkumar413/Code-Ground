$(document).ready(exec);

function exec(){
    var snippet = ["<!DOCTYPE html>",
    "<html>",
    "<head>",
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width">',
      "<title>JS Bin</title>",
    "</head>",
    "<body>",
    "</body>",
    "</html>"];
    
    var h_editor = ace.edit("html_editor");
    h_editor.setTheme("ace/theme/xcode");
    h_editor.session.setMode("ace/mode/html");
   
   // h_editor.setValue("resnponse-data');

    var c_editor = ace.edit("css_editor");
    c_editor.setTheme("ace/theme/xcode");
    c_editor.session.setMode("ace/mode/css");

    var j_editor = ace.edit("js_editor");
    j_editor.setTheme("ace/theme/xcode");
    j_editor.session.setMode("ace/mode/javascript");

    
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


    Mousetrap.bind('ctrl+1', function(e) {
    console.log('hello');
    $('.editors').css("grid-template-columns",'70% auto auto');

});


     Mousetrap.bind('ctrl+2', function(e) {
    console.log('hello');
    $('.editors').css("grid-template-columns", 'auto 70%  auto');

});


    Mousetrap.bind('ctrl+3', function(e) {
    console.log('hello');
    $('.editors').css("grid-template-columns",'auto auto 70%');

}); 



   


    $('.save').click(function(){
        save_file(h_editor,c_editor,j_editor)
    });
$('.expand_html').click(function(){
    $('.editors').css("grid-template-columns",'70% auto auto');
});

$('.expand_css').click(function(){
    $('.editors').css("grid-template-columns",'auto 70% auto');
});

$('.expand_js').click(function(){
    $('.editors').css("grid-template-columns",'auto auto 70%');
});

$('.reset_view').click(function(){
    $('.editors').css("grid-template-columns",'auto auto auto');
});

$('.fork').click(function(){
    fork_file(h_editor, c_editor, j_editor);
});

}

function save_file(h_editor,c_editor,j_editor){
   var h = h_editor.getValue();
    var c = c_editor.getValue();
    var j = j_editor.getValue();
     id = window.location.pathname;
     console.log(id);
    id = id.replace('/','');
    var data = {html: h, css: c, js:j,id:id};

   
console.log(data);
$.ajax({
    url: '/save',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    success: function(msg) {
    console.log(msg);
    console.log(location);
    window.location.href= window.origin + window.location.pathname +msg;
    console.log(location);
    windo.location.reload();
 }
});


}


function fork_file(h_editor,c_editor,j_editor){
   var h = h_editor.getValue();
    var c = c_editor.getValue();
    var j = j_editor.getValue();
    id = '';
    console.log(id);
    var data = {html: h, css: c, js:j,id:id};

   
console.log(data);
$.ajax({
    url: '/save',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    success: function(msg) {
    console.log(msg);
    console.log(location);
    window.location.href= window.origin +'/'+msg;
    console.log(location);
 }
});


}


