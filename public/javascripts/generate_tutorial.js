$('document').ready(execute);
function execute() {
    
    $('.add_entry').click(append_entry);

    function append_entry(){
    $('.tutorial_container .entry').last().clone().appendTo('.tutorial_container');
    }

    $('.submit').click(function (){
        var entries = [];
$('.entry').each(function(){
t = $(this).children('.title').val();
p_id = $(this).children('.p_id').val();
temp = {title:t,id:p_id };
entries.push(temp);
});
console.log(entries);
save_tutorial(entries);
}

    );

    function save_tutorial(entries) {
        var data = entries;
        $.ajax({
            url: '/tutorial',
            type: 'POST',
            data: JSON.stringify(data),
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







