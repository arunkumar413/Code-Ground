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


    $('.save').click(function(){
        save_file(h_editor,c_editor,j_editor)
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
    window.location.href= window.origin + window.location.pathname +msg;
 }
});


}

