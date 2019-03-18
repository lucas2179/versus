//Table cells builder

$(document).ready(function () {
    rendertable("ai");
    rendertable("application-service");
    rendertable("bd-analytics");
    rendertable("compute");
    rendertable("db");
    rendertable("dev");
    rendertable("iot");
    rendertable("management");
    rendertable("migration");
    rendertable("mobile");
    rendertable("network-cd");
    rendertable("other");
    rendertable("security");
    rendertable("storage");
});

function rendertable(id) {
    var trHTML = '';
    $.getJSON('../data/' + id + '.json', function (Json) {
        $.each(Json, function (key, value) {
            trHTML += '<tr>';
            // Service column builder
            trHTML += '<td style="background-color: whitesmoke; color: black"><div class="tooltip"><b>' + value.service.name + '</b><span class="tooltiptext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Service description...</span></div></td>';

            // Data cells render
            trHTML += dataprocessor(value.aws, 'aws');
            trHTML += dataprocessor(value.azure, 'azure');
            trHTML += dataprocessor(value.google, 'gcp');
            trHTML += dataprocessor(value.ibm, 'ibm');
            trHTML += dataprocessor(value.oracle, 'oracle');
            trHTML += dataprocessor(value.alibaba, 'alibaba');
        });
        var $table = $('#' + id);
        $table.append(trHTML);
        $('body').css("display", "block");
    });
}

function dataprocessor(input, type) {
    cprovider = "c" + type;
    var trHTML = '';
    if (input.length > 1) {
        trHTML += '<td class= ' + cprovider + '><ul>';
        for (var i in input) {
            trHTML += '<li class="tooltip"><img src="../img/icons/cloudproviders/' + type + '/' + input[i].icon + '" class="img-responsive img-icons"><a style="color: black" href="' + input[i].ref + '">' + input[i].name + '<span class="tooltiptext">' + formatLocation(input[i].location) + '</span></a></div></li>';
        }
        trHTML += '</ul></td>';
    } else {
        if (input[0].name === "") {
            trHTML += '<td class= ' + cprovider + '><i class="fas fa-ban" style="color: red; font-size: 24px"></i>' + '</td>'
        } else {
            for (var i in input) {
                trHTML += '<td class= ' + cprovider + '><ul><li class="tooltip"><img src="../img/icons/cloudproviders/' + type + '/' + input[0].icon + '" class="img-responsive img-icons"><a style="color: black" href="' + input[0].ref + '">' + input[0].name + '<span class="tooltiptext">' + formatLocation(input[0].location) + '</span></a></li></ul></td>';
            }
        }
    }
    return trHTML;
}

function formatLocation(raw) {
    // return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location: " + raw + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + raw;
    return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location:<br><ul><li style='list-style: circle; color:white; margin-left:30px'>" + strReplace(raw) + "</li></ul>";
}

function strReplace(myStr) {
    return newStr = myStr.replace(/;/g, "</li><li style='list-style: circle; color:white; margin-left:30px'>");
}