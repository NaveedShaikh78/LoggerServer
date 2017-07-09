appdata.cycle = {
    cycleReport: function (reportDayType, dfrom, dTo) {
        var reportData = { gridfields: [], url: '' }
        var baseUrl = appdata.baseUrl;
        switch (reportDayType) {
            case "dailyShiftCount":
                reportData.gridfields = [
                    { name: "cycledate", type: "text", title: "Date" },
                    { name: "Shift1", type: "text", title: "Shift1" },
                    { name: "Shift2", type: "text", title: "Shift2" },
                    { name: "DayTotal", type: "text", title: "Total" },
                ];
                reportData.url = baseUrl + "getDayShiftData.php?st='" + dfrom + "'&et='" + dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'";
                if (ctrl.ReportController.selectedMachine.id == 0) {
                    reportData.url = baseUrl + "getDayShiftData.php?st='" + dfrom + "'&et='" + dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'&machine='all'";
                    gridfields.unshift({ name: "ioport", type: "text", title: "Machine" });
                }
                break;
            case "detailed":
                reportData.url = baseUrl + "getstatus.php?st='" + dfrom + "'&et='" + dTo + "'&mac='" + ctrl.ReportController.selectedMachine.id + "'";
                reportData.gridfields = [{ name: "srno", type: "text", title: "Id", width: 50, css: "hide" },
                { name: "start_time", type: "text", title: "Start Time", width: 110, editing: false },
                { name: "end_time", type: "text", title: "End Time", editing: false },
                { name: "cycletime", type: "text", title: "Cycle Time", editing: false },
                { name: "idletime", type: "text", title: "Idle Time", editing: false },
                {
                    name: "jobno", type: "select", title: "Job Name", items: [], valueField: "id", textField: "jobname",
                    headerTemplate: function () {
                        var jobListelm = $("<select style='width:100%;height:100%;border:0'><option selected hidden  value='' > Job</option></select>");
                        //return  document.importNode(document.getElementById("reportJobs"));
                        if (ctrl.MachineController) {
                            $.each(ctrl.MachineController.jobs, function (val, item) {
                                jQuery('<option/>', {
                                    value: item.id,
                                    html: item.jobname
                                }).appendTo(jobListelm);
                            });
                        }
                        jobListelm.change(function (citem) {
                            var postData = {};
                            postData.id = $(this).find("option:selected").val();
                            $.each(searchData, function (val, item) {
                                item.jobno = postData.id;
                            });
                            $("#jsGrid").jsGrid("refresh");
                            $("#updateLogData").show();
                            //$(this).parent().append("<input id='updateJobs' class='jsgrid-button jsgrid-update-button' type='button' title='Update'>");

                        });
                        return jobListelm;
                    }
                },
                {
                    name: "opid", type: "select", title: "Operator Id", items: [], valueField: "id", textField: "opname",
                    headerTemplate: function () {
                        var opListelm = $("<select style='width:100%;height:100%;border:0'><option selected hidden  value='' > Operator</option></select>");
                        //return  document.importNode(document.getElementById("reportJobs"));
                        if (ctrl.MachineController) {
                            $.each(ctrl.MachineController.operators, function (val, item) {
                                jQuery('<option/>', {
                                    value: item.id,
                                    html: item.opname
                                }).appendTo(opListelm);
                            });
                        }
                        opListelm.change(function (citem) {
                            var postData = {};
                            postData.id = $(this).find("option:selected").val();
                            $.each(searchData, function (val, item) {
                                item.opid = postData.id;
                            });
                            $("#jsGrid").jsGrid("refresh");
                            $("#updateLogData").show();
                            //$(this).parent().append("<input id='updateJobs' class='jsgrid-button jsgrid-update-button' type='button' title='Update'>");

                        });
                        return opListelm;
                    }

                },
                {   
                    name:'control', type: "control", deleteButton: false, headerTemplate: function () {
                        var updateLogData = $("<input id='updateLogData' class='jsgrid-button jsgrid-update-button' style='Display: none;' type='button' title='Update'>");
                        updateLogData.click(function () {
                            $(this).hide();
                            $('#loader1').fadeIn('slow');
                            updateLogDataAll(0);
                        });
                        return updateLogData;
                    }
                }
                ];
                reportData.gridfields[5].items = ctrl.MachineController.jobs;
                reportData.gridfields[6].items = ctrl.MachineController.operators;
                break;

        }
        console.log('Cycle Report');
        return reportData;
    },

    updateLogDataAll: function (index) {
        if (searchData) {
            var item = searchData[index];
            if (item) {
                item.rtype = "updateData";
                $.post("http://trendzsoft.in/api/updateReport.php", item)
                    .done(function (response) {
                        updateLogDataAll(index + 1);
                    });
            } else {
                $('#loader1').fadeOut('slow');
            }
        }
    },
    updateLogData: function (item) {
        var d = $.Deferred();
        item.rtype = "updateData";
        $.post("http://trendzsoft.in/api/updateReport.php", item
        ).done(function (response) {
            d.resolve(item);
        });
        return d.promise();
    }
}