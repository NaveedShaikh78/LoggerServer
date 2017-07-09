appdata.job = {
    jobReport: function (reportDayType, dfrom, dTo ,uiGridGroupingConstants) {
        var reportData = { gridfields: [], url: '' }
        var baseUrl = appdata.baseUrl;
        switch (reportDayType) {
            case "detailed":

                reportData.gridfields = [
                    { name: 'cycledate', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, width: '30%' },
                    { name: 'JobName', grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, width: '20%'},
                    { name: 'DayTotal', width: '30%',treeAggregationType: uiGridGroupingConstants.aggregation.SUM },
                ];
                reportData.url = baseUrl + "getJobsDailyCount.php?st='" + dfrom + "'&et='" +
                    dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'&jobno='" + ctrl.ReportController.selectedJob.id + "'";
                if (ctrl.ReportController.selectedJob.jobid == -1) {
                    reportData.url = baseUrl + "getJobsDailyCount.php?st='" + dfrom + "'&et='" +
                        dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'&jobno='" + ctrl.ReportController.selectedJob.id + "'&jobs='all";
                }
                break;
        }
        return reportData;
    }
}
