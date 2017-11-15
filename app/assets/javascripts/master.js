function masterNew() {
    var name = $("#master-new-name")[0].value;
    var table = $("#master")[0];
    var row = table.insertRow(0); //TODO use the end
    var cname = row.insertCell(0);
    var cqty = row.insertCell(1);
    var cvalue = row.insertCell(2);
    var cactions = row.insertCell(3); //TODO add buttons to this
    cname.innerHTML = name;
}
