appdata.optgridData=[];
appdata.optgridfields=[
            { name: "operator_id", type: "number", title: "Operator ID",width:210},
            { name: "operator_name", type: "text", title: "Operator Name" ,width:210},
             { type: "control",width:210 }
            ];
loadOptGrid();

function loadOptGrid(){
$("#optgrid").jsGrid({
   height: "70%",
    width: "100%",
    filtering: false,
    editing: true,
    inserting: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 10,
    pageButtonCount: 5,
    deleteConfirm: "Do you really want to delete this record?",
    pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
    data: appdata.optgridData,
    fields:appdata.optgridfields
    });
}
