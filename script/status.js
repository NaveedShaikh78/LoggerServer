var appdata = { cycle: {}, baseUrl: 'http://trendzsoft.in/api/' };
var ctrl = {};
appdata.ioports = [26, 19, 13, 6, 22, 27, 17];
appdata.cuid = "";
appdata.username = localStorage.getItem('username');
appdata.password = localStorage.getItem('password');
appdata.saveLogin = localStorage.getItem('saveLogin');
$("#username").val(appdata.username);
$("#password").val(appdata.password);
if (appdata.saveLogin === "true") {
    $("#saveLogin").prop('checked', true);
} else {
    $("#saveLogin").prop('checked', false);
}
$("#accordsettings").accordion({ heightStyle: "content" });
function login(event) {

    var formvalues = { 'username': $("#username").val(), 'password': $("#password").val(), 'cuid': appdata.cuid };
    $.post('http://trendzsoft.in/api/login.php', formvalues).done(function (data) {
        if (data != "Failed") {
            $("#appview").fadeIn();
            $("#login").dialog("close");
            appdata.cuid = data;
            $("#loaderOverlay").hide();
            var saveLogin = $("#saveLogin").is(":checked");
            if (saveLogin) {
                localStorage.setItem('username', formvalues.username);
                localStorage.setItem('password', formvalues.password);
                localStorage.setItem('saveLogin', true);
            } else {
                localStorage.setItem('username', '');
                localStorage.setItem('password', '');
                localStorage.setItem('saveLogin', false);
            }
        }
        else {
            $("#failmsg").show();
            $("#failmsg").html("Invalid Username or Password");
        }
    }
    )
        .fail(function (xhr, status, error) {
            $("#failmsg").show();
            $("#failmsg").html("Check your internet connection...");
        });
    return false;
}
function showLoginDialog() {
    $("#login").dialog({
        closeOnEscape: false,
        modal: true,
        open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); }
    });
}
function getDefaultDate() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    return today;
}
$(function () {
    var ioports = appdata.ioports;
    if ('content' in document.createElement('template')) {
        var machinetemp = document.querySelector('#machinetemplete');
        var macview = document.getElementsByTagName("machineview");
        for (var i = 0; i < ioports.length; i++) {

            //var mac=	$(machinetemp.content+ ":has(div)");
            //mac.attr("id","mac-"+i);
            var clone = document.importNode(machinetemp.content, true);
            $(clone.childNodes[0].nextSibling).attr("id", "mac-" + ioports[i]);
            macview[0].appendChild(clone);
            $("#mac-" + ioports[i] + " div.panel-heading").text("Machine " + (i + 1));

            var selOperator = $("#mac-" + ioports[i] + " #selOperator");
            selOperator.attr("id", "selOperator" + ioports[i]);
            selOperator.attr("ng-model", "selOp[" + ioports[i] + "]");
            selOperator.attr("ng-change", "opChange(" + ioports[i] + ",selOp[" + ioports[i] + "])");
            //selOperator.attr("ng-change","selOp["+ ioports[i]+"]");


            var selJob = $("#mac-" + ioports[i] + " #selJob");
            selJob.attr("id", "selJob" + ioports[i]);
            selJob.attr("ng-model", "selJob[" + ioports[i] + "]");
            selJob.attr("ng-change", "jobChange(" + ioports[i] + ",selJob[" + ioports[i] + "])");

            var selIdle = $("#mac-" + ioports[i] + " #selIdle");
            selIdle.attr("id", "selIdle" + ioports[i]);
            selIdle.attr("ng-model", "selIdle[" + ioports[i] + "]");
            selIdle.attr("ng-change", "idleChange(" + ioports[i] + ",selIdle[" + ioports[i] + "])");

        }
    }

});
function miliSecToHms(d) {
    d = Number(d) / 1000;
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
$(function () {
    var ioports = appdata.ioports;
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day) + "T08:00";
    $("#dateFrom").val(today);
    var today = now.getFullYear() + "-" + (month) + "-" + (day) + "T20:00";
    $("#dateTo").val(today);
    setInterval(function () {
        var url = "http://trendzsoft.in/api/machinestatus.php";
        var formvalues = { 'username': $("#username").val(), 'password': $("#password").val(), 'cuid': appdata.cuid };
        if (appdata.cuid == "") {
            showLoginDialog();
        } else {
            $.post(url, formvalues, function (sdata) {

                for (var i = 0; i < ioports.length; i++) {
                    if (sdata[0] == "Failed") {
                        showLoginDialog();
                    }
                    if (sdata[ioports[i]]) {
                        ctrl.MachineController.setSelJob(sdata[ioports[i]].jobid, ioports[i]);
                        ctrl.MachineController.setSelOp(sdata[ioports[i]].opid, ioports[i]);
                        ctrl.MachineController.setSelIdle(sdata[ioports[i]].idleid, ioports[i]);
                        var mactime = new Date(sdata[ioports[i]].statetime);
                        var tmsec = Date.now() - mactime;
                        var HHmmss = miliSecToHms(tmsec);
                        $("#mac-" + ioports[i] + " td.machinetimer").text(HHmmss)
                        $("#mac-" + ioports[i] + " td.jobcount").text(sdata[ioports[i]].count)
                        if (sdata[ioports[i]].status == "0") {
                            $("#mac-" + ioports[i] + " div.panel").attr("class", "panel panel-danger");
                            $("#mac-" + ioports[i] + " div.loading6").css("background-color", "Red");
                        } else {
                            $("#mac-" + ioports[i] + " div.panel").attr("class", "panel panel-info");
                            $("#mac-" + ioports[i] + " div.loading6").css("background-color", "Green");
                        }
                    }
                }
            }, "json");
        }
    }, 1000)
});
