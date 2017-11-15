function clickMasterNew() {
    var name = $("#master-new-name")[0].value;
    var qty = $("#master-new-qty")[0].value;
    var value = $("#master-new-value")[0].value;
    masterNew(name, qty, value);
}

function masterNew(name, qty, value) {
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

function clickPlayerNew() {
    var name =$("#player-new-name")[0].value
    playerNew(name);
}

function playerNew(name) {
    var table = $("#players")[0];

    if (name == false) {
        return;
    }

    var index = table.rows.length - 1;
    var row = table.insertRow(index);
    var cname = row.insertCell(0);
    var cbudTotal = row.insertCell(1);
    var cbudCurrent = row.insertCell(2);
    var cactions = row.insertCell(3);
    cname.innerHTML = name;
    cbudTotal.innerHTML = 0;
    cbudCurrent.innerHTML = 0;
    cactions.innerHTML = `
        <span class="input-group">
            <button type="button" class="btn btn-outline-danger btn-table"
                onclick="removeRow(this)">Delete</button>
        </span>
    `;
}

function masterSell(index) {
    var row = $("#master")[0].rows[index]
    var name = row.cells[0].innerHTML
    var qty = row.cells[1].innerHTML
    var value = row.cells[2].innerHTML
    soldNew(name, qty, value)
    master.deleteRow(index)
}

function soldUnsell(index) {
    var row = $("#sold")[0].rows[index]
    var name = row.cells[0].innerHTML
    var qty = row.cells[1].innerHTML
    var value = row.cells[2].innerHTML
    masterNew(name, qty, value)
    soldDelete(index)
}

function soldDelete(index) {
    sold.deleteRow(index);
    updateBudgets();
}

function soldDeleteSelf(context) {
    removeRow(context);
    updateBudgets();
}

function soldNew(name, qty, value) {
    var table = $("#sold")[0]

    var index = table.rows.length;
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
            <button type="button" class="btn btn-outline-warning btn-table"
                onclick="soldUnsell(${index})">Unsell</button>
            <button type="button" class="btn btn-outline-danger btn-table"
                onclick="soldDeleteSelf(this)">Delete</button>
        </span>
    `;
    updateBudgets();
}

function removeRow(context) {
    $(context).closest('tr').remove();
}

function clickCashNew() {
    var note = $("#cash-new-note")[0].value;
    var qty = $("#cash-new-qty")[0].value;
    var value = $("#cash-new-value")[0].value;

    cashNew(note, qty, value);
}


function cashNew(note, qty, value) {
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
                onclick="cashDelete(this)">Delete</button>
        </span>
    `;

    updateBudgets();
}

function cashDelete(context) {
    removeRow(context);
    updateBudgets();
}

function updateBudgets() {
    var total = 0;

    var cashRows = $("#cash")[0].rows
    var soldRows = $("#sold")[0].rows
    var players = $("#players")[0].rows
    var playerCnt = players.length - 3;

    for(var i = 1; i < cashRows.length - 1; i++) {
        total += cashRows[i].cells[1].innerHTML * cashRows[i].cells[2].innerHTML
    }

    for(var i = 1; i < soldRows.length; i++) {
        total += soldRows[i].cells[1].innerHTML * soldRows[i].cells[2].innerHTML
    }

    players[1].cells[1].innerHTML = total;

    if(playerCnt > 0) {
        for(var i = 2; i < players.length - 1; i++) {
            players[i].cells[1].innerHTML = Math.round(total / playerCnt);
        }
    }

} //also on new/delete player, or take/untake items
