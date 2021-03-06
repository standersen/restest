// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var JSONdata;
var gkid;

function init_kunde(kid) {
    gkid = kid;

    // Hover highlight handler
    //TODO: Doesnt' work...
    $('.alpaca-control').hover(function () {
        $(this).toggleClass("input-highlight");
        console.log(this);
    });

    if (kid > 0) {
        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'http://127.0.0.1:8000/customers/' + kid + '/', true);

        request.onload = function () {
            // Begin accessing JSON data here
            JSONdata = JSON.parse(this.response);
            populate_form("Endre kundedetaljer");
        };
        request.send();
    } else {
        JSONdata = null;
        populate_form("Opprett kunde");
    }
}

// PATCH: Change existing row
// POST: Store new row
function submit_form(value) {
    var action;
    var posturl;

    if (gkid > 0) {
        action = "PATCH";
        posturl = "http://127.0.0.1:8000/customers/" + gkid + "/";
    } else {
        action = "POST";
        posturl = "http://127.0.0.1:8000/customers/";
    }
    // TODO: Use ajax
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(action, posturl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        // TODO: Error checking

    }
    xmlhttp.send(JSON.stringify(value, null, "  "));
    window.location.replace("{% url 'kunder' %}");
}

function delete_form() {

    posturl = "http://127.0.0.1:8000/customers/" + gkid + "/";
    console.log(posturl)
    $.ajax({
        url: posturl,
        type: 'DELETE',
        data: {
            "id": gkid
        },
        success: console.log("Success"),
        error: console.log("Failure")
    });
    window.location.replace("{% url 'kunder' %}");
}

function populate_form(p_title) {
    $("#form").alpaca({
        "data": JSONdata,
        "schema": {
            "title": p_title,
            "description": "Kundedetaljer",
            "type": "object",
            "properties": {
                "kundenavn": {
                    "type": "string",
                    "title": "Navn",
                    "required": true
                },
                "kundetype": {
                    "type": "string",
                    "title": "Kundetype",
                },
                "adresse": {
                    "type": "string",
                    "title": "Adresse"
                },
                "telefonnr": {
                    "type": "string",
                    "title": "Telefonnr"
                },
                "kontaktperson": {
                    "type": "string",
                    "title": "Kontaktperson"
                },
                "telefonnr1": {
                    "type": "string",
                    "title": "Telefonnr 1"
                },
                "kontaktperson2": {
                    "type": "string",
                    "title": "Kontaktperson 2"
                },
                "telefonnr2": {
                    "type": "string",
                    "title": "Telefonnr 2"
                },
                "emailadresse": {
                    "type": "string",
                    "format": "email",
                    "title": "Kontakt-email",
                    "required": true
                },
                "merknader": {
                    "type": "string",
                    "format": "string",
                    "title": "Merknader",
                }
            }
        },
        "options": {
            "form": {
                "attributes": {
                    "action": "http://httpbin.org/post",
                    "method": "post"
                },
                "buttons": {
                    "submit": {
                        "title": "Lagre",
                        "click": function () {
                            this.refreshValidationState(true);
                            if (!this.isValid(true)) {
                                this.focus();
                                return;
                            }
                            submit_form(this.getValue());
                        }
                    },
                    "delete": {
                        "title": "Slett",
                        "click": function () {
                            console.log("Delete form");
                            delete_form();
                        }
                    }
                }
            },
        },
        "view": "bootstrap-edit"
    });
}