
$(document).ready(function(){
    event.preventDefault();

    getMessages();

    $('#submitMessage').submit(addMessage);
    //add delete button
});

function getMessages(values){
    $.ajax({
        type: "GET",
        url: "/data",
        data: values,
        success: function(data) {
            updateMessages();
        }
    })
}

function addMessage(){
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    $.ajax({
       type: "POST",
        url: "/data",
        data: values,
        success: function(data){
            getMessages();
        }

    });

}

function updateMessages(data){
    $('#messageContainer').empty();

    for(var i = 0; i < data.length; i++){
        var el = "<div class='instant-messages'>" +
                    "<p>" + data[i].name + "</p>" +
                    "<p>" + data[i].message + "</p>" +
                    "<button class='delete btn btn-danger' data-id='" +
                    data[i].id + "'>Delete</button>" +
                 "</div>";

        $('#messageContainer').append(el);
    }
}
