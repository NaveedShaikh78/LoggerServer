
var selectedMachine = 26;
var reportType = ""
var ioports = [26, 19, 13, 6, 22, 27, 17];
var appdata={};
appdata.cuid="";
/* Code of Slide Menu
  $(window).load(function(){
        $("[data-toggle]").click(function() {
          var toggle_el = $(this).data("toggle");
          $(toggle_el).toggleClass("open-sidebar");
        });
         $(".swipe-area").swipe({
              swipeStatus:function(event, phase, direction, distance, duration, fingers)
                  {
                      if (phase=="move" && direction =="right") {
                           $(".slide-container").addClass("open-sidebar");
                           return false;
                      }
                      if (phase=="move" && direction =="left") {
                           $(".slide-container").removeClass("open-sidebar");
                           return false;
                      }
                  }
          }); 
      });
/*End The Code of Slide Menu*/
 $( "#accordsettings" ).accordion({heightStyle: "content"});
 function login(event) {

					    var formvalues={'username':$("#username").val() ,'password':$("#password").val(),'cuid':appdata.cuid};
                       
                        $.post('https://trendzsoft.in/api/login.php', formvalues).done(function (data) {
							if(data != "Failed"){
								$("#appview").fadeIn(); 
								$("#login").dialog("close");
								appdata.cuid=data;
							}
							else{
								$("#failmsg").show();
								$("#failmsg").html("Invalid Username or Password");
							}
							
                        }
					)
    .fail(function(xhr, status, error) {
		$("#failmsg").show();
        $("#failmsg").val("Check your internet connection...");
    });
	return false;					 	
 }
 
function showLoginDialog() {
    $( "#login" ).dialog({ 
				closeOnEscape: false,
               modal: true,
			    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
	});
  }

/*  $( function() {
    $( "#operator" ).dialog({ 
				closeOnEscape: false,
               /*modal: true,
			    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
	});
  });
  */
function getDefaultDate() {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    return today;
}
$(function () {
    $(".dropdown-menu li a").click(function () {
        var cmbText = $(this).text();
        if ($(this).attr("id").includes("mcmb-")) {
            selectedMachine = $(this).attr("id").replace("mcmb-", "");
            $("#maccmb").html(cmbText + "<span class='caret'></span>");
        }
        if ($(this).attr("id").includes("rcmb-")) {
            reportType = $(this).attr("id").replace("rcmb-", "");
            $("#reportcmb").html(cmbText + "<span class='caret'></span>");
        }
    });
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
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day) + "T08:00";
    $("#dateFrom").val(today);
    var today = now.getFullYear() + "-" + (month) + "-" + (day) + "T20:00";
    $("#dateTo").val(today);
    setInterval(function () {
        var url = "http://trendzsoft.in/api/machinestatus.php";
		 var formvalues={'username':$("#username").val() ,'password':$("#password").val(),'cuid':appdata.cuid};
if(appdata.cuid==""){
	showLoginDialog();
}else{
        $.post(url,formvalues, function (sdata) {
			
            for (var i = 0; i < ioports.length; i++) {
				if(sdata[0] == "Failed"){
					showLoginDialog();
				}
                if (sdata[ioports[i]]) {
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