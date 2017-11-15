function masterNew() {
    var name = $("#master-new-name")[0].value;
    var qty = $("#master-new-qty")[0].value;
    var value = $("#master-new-value")[0].value;
    var table = $("#master")[0];

    if (name == false || qty == false || value == false) {
        return;
    }

    var index = table.rows.length
    var row = table.insertRow(index);
    var cname = row.insertCell(0);
    var cqty = row.insertCell(1);
    var cvalue = row.insertCell(2);
    var cactions = row.insertCell(3); //TODO add buttons to this
    cname.innerHTML = name;
    cqty.innerHTML = qty;
    cvalue.innerHTML = value;
    cactions.innerHTML = `
        <span class="input-group">
            <button type="button" class="btn btn-primary btn-table"
                onclick="masterTake(${index})">Take</button>
            <button type="button" class="btn btn-warning btn-table"
                onclick="masterSell(${index})">Sell</button>
            <button type="button" class="btn btn-danger btn-table"
                onclick="masterDelete(${index})">Delete</button>
        </span>
    `;
}
