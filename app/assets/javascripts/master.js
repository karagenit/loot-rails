function masterNew() {
    var name = $("#master-new-name")[0].value;
    var qty = $("#master-new-qty")[0].value;
    var value = $("#master-new-value")[0].value;
    var table = $("#master")[0];

    if (name == false || qty == false || value == false) {
        return;
    }

    var row = table.insertRow(table.rows.length);
    var cname = row.insertCell(0);
    var cqty = row.insertCell(1);
    var cvalue = row.insertCell(2);
    var cactions = row.insertCell(3); //TODO add buttons to this
    cname.innerHTML = name;
    cqty.innerHTML = qty;
    cvalue.innerHTML = value;
}
