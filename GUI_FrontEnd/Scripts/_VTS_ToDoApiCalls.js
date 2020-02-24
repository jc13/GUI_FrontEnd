$(function () {

    SetAuthor();

    function DisplayError(call, callURI, jqXHR, textStatus, errorThrown) {
        $('#result').html('<p>call: ' + call + '</p><p>url: ' + callURI + '</p><p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>responseText:</p><div>' + jqXHR.responseText + '</div>');
    }
    function DisplayResult1(call, data) {
        $('#result').text('');
        $('#result').append("<strong>" + call + "<strong>" + "<br/>");

        $.each(data, function (i, item) {
            $('#result').append(JSON.stringify(item));
            $('#result').append("<br/>");
        });
    }

    function DisplayResult2(call, data) {
        $('#result').text('');
        $('#result').append("<strong>" + call + "<strong>" + "<br/>");

        $('#result').append(JSON.stringify(data));
        $('#result').append("<br/>");

    }

    //change the below port num. The below url is the ToDoService url
 //   var apiUrl = 'http://localhost:53456/api/todolists/';

    var apiUrl = 'http://vtstodo.azurewebsites.net/api/todolists/';
    //alert('API URL: ' + apiUrl);

    function GetUserName() {
        var appUser = $('#AppUser').val();
        return appUser;
    }

    function ToDoListGetServiceUrl(actionOrId) {
        return callURL = apiUrl + actionOrId + (actionOrId ? '/' : '') + '?userName=' + GetUserName();
    }

    function ToDoItemGetServiceUrl(itemId, completed) {
        var listId = $('#id').val();
        if (!listId)
        {
            alert('Invalid call. To Do List Id must be specified.');
        }
        return apiUrl + listId + '/item/' + itemId + (itemId ? '/' : '') + (completed ? 'done' : '') +'?userName=' + GetUserName();
    }

    function SetAuthor() {
        var appUser = $('#AppUser').val();
        $('#author').val(appUser);
    }

    //Set list Author input to selected User Name
    $('#AppUser').on('change', function () {
        var appUser = $(this).val();
        $('#author').val(appUser);
    });

    // TO DO LIST CALLS

    //CREATE TO DO LIST
    $('#AddToDoList').on('click', function () {
        var inputData = $('input').serialize();
        var callURI = ToDoListGetServiceUrl('add');
        $.ajax({
            url: callURI,
            method: 'POST',
            data: inputData,
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError("CREATE To Do List", callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult2("To Do List Created:", data);
            }
        });
    });

    //RETRIEVE ALL TO DO LISTS
    $('#GetAll').on('click', function () {
        var callURI = ToDoListGetServiceUrl('');
        //alert(callURI);
        $.ajax({
            url: callURI,
            method: 'GET',
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError("RETRIEVE ALL To Do Lists", callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult1("Get All:", data);
            }
        });
    });

    //UPDATE TO DO LIST
    $('#UpdateToDoList').on('click', function () {
        var inputData = $('input').serialize();
        var listId = $('#id').val();
        var callURI = ToDoListGetServiceUrl(listId);
        $.ajax({
            url: callURI,
            method: 'PUT',
            data: inputData,
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError("UPDATE To Do List", callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult2("List Updated:", data);
            }
        });
    });

    //DELETE
    $('#DeleteToDoList').on('click', function () {
        var listId = $('#id').val();
        var callURI = ToDoListGetServiceUrl(listId);
        $.ajax({
            url: callURI,
            method: 'DELETE',
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError("DELETE To Do Lists", callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult1('List with Id ' + listId + ' deleted.', data);
            }
        });
    });

    // TO DO ITEM CALLS

    // ADD TO DO ITEM TO A LIST
    $('#AddToDoItem').on('click', function () {
        var inputData = $('input').serialize();
        var callURI = ToDoItemGetServiceUrl('');
        //alert(callURI);
        $.ajax({
            url: callURI,
            method: 'POST',
            data: inputData,
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError('ADD To Do Item', callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult2("List Item Added", data);
            }
        });
    });

    // UPDATE TO DO ITEM
    $('#UpdateToDoItem').on('click', function () {
        var inputData = $('input').serialize();
        var itemId = $('#ItemId').val();
        var callURI = ToDoItemGetServiceUrl(itemId);
        //alert(callURI);
        $.ajax({
            url: callURI,
            method: 'PUT',
            data: inputData,
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError('UPDATE To Do Item', callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult2("List Item Updated", data);
            }
        });
    });

    // REMOVE TO DO ITEM FROM A LIST
    $('#DeleteToDoItem').on('click', function () {
        var itemId = $('#ItemId').val();
        var callURI = ToDoItemGetServiceUrl(itemId);
        //alert(callURI);
        $.ajax({
            url: callURI,
            method: 'DELETE',
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError('DELETE To Do Item', callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult2('To Do Item ' + itemId + ' removed from To Do List', data);
            }
        });
    });

    // MARK TO DO ITEM AS COMPLETED
    $('#ToDoItemCompleted').on('click', function () {
        var itemId = $('#ItemId').val();
        var callURI = ToDoItemGetServiceUrl(itemId, true);
        //alert(callURI);
        $.ajax({
            url: callURI,
            method: 'PUT',
            error: function (xhr, ajaxOptions, thrownError) {
                DisplayError('MARK To Do Item as completed', callURI, xhr, ajaxOptions, thrownError);
            },
            success: function (data) {
                DisplayResult2('To Do Item ' + itemId + ' marked as completed', data);
            }
        });
    });
});