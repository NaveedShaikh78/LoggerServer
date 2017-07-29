appdata.cycle = {
    cycleReport: function (reportDayType, dfrom, dTo, machineId, uiGridGroupingConstants, uiGridConstants) {
        var reportData = { gridfields: [], url: '' }
        var baseUrl = appdata.baseUrl;
        switch (reportDayType) {
            case "dailyShiftCount":
                reportData.gridfields = [
                    { name: "cycledate", grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, displayName: "Date" },
                    { name: "MachineName", grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, displayName: "MachineName" },
                    { name: "jobname", grouping: { groupPriority: 2 }, sort: { priority: 2, direction: 'asc' }, displayName: "Job Name" },
                    { name: "opname", grouping: { groupPriority: 3 }, sort: { priority: 3, direction: 'asc' } },
                    { name: "Shift1", treeAggregationType: uiGridGroupingConstants.aggregation.SUM, displayName: "Shift1" },
                    { name: "Shift2", treeAggregationType: uiGridGroupingConstants.aggregation.SUM, displayName: "Shift2" },
                    { name: "DayTotal", treeAggregationType: uiGridGroupingConstants.aggregation.SUM, displayName: "Total" },
                ];
                reportData.url = baseUrl + "getDayShiftData.php?st='" + dfrom + "'&et='" + dTo + "'&ip='" + machineId + "'";
                if (machineId == 0) {
                    reportData.url = baseUrl + "getDayShiftData.php?st='" + dfrom + "'&et='" + dTo + "'";
                    gridfields.unshift({ name: "ioport", displayName: "Machine" });
                }
                break;
            case "detailed":
                reportData.url = baseUrl + "getstatus.php?st='" + dfrom + "'&et='" + dTo + "'&mac='" + machineId + "'";
                reportData.gridfields = [
                { name: "start_time", displayName: "Start Time",width:"23%", enableCellEdit: false,enableFiltering: false },
                { name: "end_time", displayName: "End Time",width:"23%", enableCellEdit: false,enableFiltering: false },
                { name: "cycletime", displayName: "Cycle Time",width:"10%", enableCellEdit: false,enableFiltering: false },
                { name: "idletime", displayName: "Idle Time",width:"10%", enableCellEdit: false ,enableFiltering: false},
                {
                    name: "jobno", type: "select",width:"15%", displayName: "Job Name", cellFilter: 'mapJob',
                    filter: { selectOptions: ctrl.ReportController.getJobsvalueLabelPair(), type: uiGridConstants.filter.SELECT, editDropdownValueLabel: "jobname", condition: uiGridConstants.filter.EXACT },
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownOptionsArray: ctrl.ReportController.jobs, editDropdownValueLabel: "jobname",
                    headerCellTemplate: function () {
                        var jobListelm = $(`<select id='jobCombo' style='padding-top:6px;width:100%;height:100%;border:0' onchange="appdata.cycle.itemChanged('#jobCombo')" ><option selected hidden  value='' > Job</option></select>`);
                        if (ctrl.ReportController) {
                            $.each(ctrl.ReportController.jobs, function (val, item) {
                                jQuery('<option/>', {
                                    value: item.id,
                                    html: item.jobname
                                }).appendTo(jobListelm);
                            });
                        }
                        return `<div>${jobListelm[0].outerHTML}<input id='updateData' type='button' style='width:100%' value='Update' onclick='appdata.cycle.updateLogDataAll(0)' ></input></div>`;
                    }
                },
                {
                    name: "opid", type: "select",width:"15%", displayName: "Operator", cellFilter: 'mapOperator',
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    headerCellTemplate: function () {
                        var opListelm = $(`<select id='operatorCombo' style='padding-top:6px;width:100%;height:100%;border:0' onchange="appdata.cycle.itemChanged('#operatorCombo')" ><option selected hidden  value='' > Operator</option></select> `);
                        if (ctrl.MachineController) {
                            $.each(ctrl.MachineController.operators, function (val, item) {
                                jQuery('<option/>', {
                                    value: item.id,
                                    html: item.opname
                                }).appendTo(opListelm);
                            });
                        }
                        return `<div>${opListelm[0].outerHTML}<input id='updateData' type='button' style='width:100%' value='Update' onclick='appdata.cycle.updateLogDataAll(0)' ></input></div>`;
                    }
                }
                ];
                break;
        }
        return reportData;
    },
    itemChanged: function (comboName) {
        var postData = {};
        postData.id = $(comboName).find("option:selected").val();
        $.each(ctrl.ReportController.reportData, function (val, item) {
            if (comboName === "#jobCombo") {
                item.jobno = postData.id;
            }
            else {
                item.opid = postData.id;
            }
        });
        ctrl.ReportController.refreshGrid();
        $("#updateLogData").show();
        $("#updateJobs").remove();
        //$(comboName).parent().append("<input id='updateData' type='button' style='width:100%' value='Update' onclick='appdata.cycle.updateLogDataAll(0)' ></input>");

    },
    updateLogDataAll: function (index) {
        $('#loader1').show('slow');
        if (ctrl.ReportController.reportData) {
            var item = ctrl.ReportController.reportData[index];
            if (item) {
                item.rtype = "updateData";
                $.post("http://trendzsoft.in/api/updateReport.php", item)
                    .done(function (response) {
                        appdata.cycle.updateLogDataAll(index + 1);
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
    },

}
