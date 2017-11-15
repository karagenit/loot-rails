function masterNew() {
    var name = $("#master-new-name")[0].value;
    var qty = $("#master-new-qty")[0].value;
    var value = $("#master-new-value")[0].value;
    var table = $("#master")[0];

    if (name == false || qty == false || value == false) {
        return;
    }

    var index = table.rows.length - 1;
    var row = table.insertRow(index);
    var cname = row.insertCell(0);
    var cqty = row.insertCell(1);
    var cvalue = row.insertCell(2);
    var cactions = row.insertCell(3);
    cname.innerHTML = name;
    cqty.innerHTML = qty;
    cvalue.innerHTML = value;
    cactions.innerHTML = `
        <span class="input-group">
            <button type="button" class="btn btn-outline-primary btn-table"
                onclick="masterTake(${index})">Take</button>
            <button type="button" class="btn btn-outline-warning btn-table"
                onclick="masterSell(${index})">Sell</button>
            <button type="button" class="btn btn-outline-danger btn-table"
                onclick="removeRow(this)">Delete</button>
        </span>
    `;
}

function removeRow(context) {
    $(context).closest('tr').remove();
}

function cashNew() {
    var note = $("#cash-new-note")[0].value;
    var qty = $("#cash-new-qty")[0].value;
    var value = $("#cash-new-value")[0].value;
    var table = $("#cash")[0];

    if (note == false || qty == false || value == false) {
        return;
    }

    var index = table.rows.length - 1;
    var row = table.insertRow(index);
    var cnote = row.insertCell(0);
    var cqty = row.insertCell(1);
    var cvalue = row.insertCell(2);
    var cactions = row.insertCell(3);
    cnote.innerHTML = note;
    cqty.innerHTML = qty;
    cvalue.innerHTML = value;
    cactions.innerHTML = `
        <span class="input-group">
            <button type="button" class="btn btn-outline-danger btn-table"
                onclick="removeRow(this)">Delete</button>
        </span>
    `;
}
