$('document').ready(execute);
function execute() {
    
    $('.add_entry').click(append_entry);

    function append_entry(){
    $('.tutorial_container .entry').last().clone().appendTo('.tutorial_container');
    }

    $('.submit').click(function (){
        var e = [];
$('.entry').each(function(){
t = $(this).children('.title').val();
p_id = $(this).children('.p_id').val();
temp = {title:t,id:p_id };
e.push(temp);
});
console.log(e);
t_title = $('.tutorial_title').val();
var data = {entries: e, tutorial_title: t_title}
save_tutorial(data);
}

    );

    function save_tutorial(d) {
        var data1 = d;
        $.ajax({
            url: '/tutorial',
            type: 'POST',
            data: JSON.stringify(data1),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(msg, textStatus, jqXHR) {
                console.log(msg);
                window.location.href = location.origin + msg.redirect;
            }
        });
    }
  }  //end of exect







