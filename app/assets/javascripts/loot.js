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
    var cstatus = row.insertCell(3);
    var cactions = row.insertCell(4);
    cname.innerHTML = name;
    cqty.innerHTML = qty;
    cvalue.innerHTML = value;
    cstatus.appendChild(getStatusDropdown());
    cactions.innerHTML = `
        <span class="input-group">
            <button type="button" class="btn btn-outline-danger btn-table"
                onclick="masterDelete(this)">Delete</button>
        </span>
    `;
    updateBudgets();
}

function getStatusDropdown() {
    var select = document.createElement("select")

    select.setAttribute("onchange", "updateBudgets()");

    var tbd = document.createElement("option")
    tbd.text = "TBD";
    tbd.value = 0;
    select.add(tbd);

    var sell = document.createElement("option")
    sell.text = "Sell";
    sell.value = 1;
    select.add(sell)

    var players = $("#players")[0].rows
    for(var i = 2; i < players.length - 1; i++) {
        var opt = document.createElement("option")
        opt.text = players[i].cells[0].innerHTML
        opt.value = i
        select.add(opt)
    }

    return select;
} //TODO update all of these on player create/destroy

function masterDelete(context) {
    removeRow(context)
    updateBudgets();
}

function clickPlayerNew() {
    var name = $("#player-new-name")[0].value
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
                onclick="playerDelete(this)">Delete</button>
        </span>
    `;
    updateBudgets();
}

function playerDelete(context) {
    removeRow(context)
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
    var itemRows = $("#master")[0].rows
    var players = $("#players")[0].rows
    var playerCnt = players.length - 3;

    for(var i = 1; i < cashRows.length - 1; i++) {
        total += cashRows[i].cells[1].innerHTML * cashRows[i].cells[2].innerHTML
    }

    for(var i = 1; i < itemRows.length - 1; i++) {
        var item = itemRows[i]
        var select = $(item.cells[3]).children('select')[0];
        var index = select.selectedIndex
        var selected = select.options[index]
        console.log(selected.value)
        if(selected.value == 1) {
            console.log("that's a seller!")
            total += item.cells[1].innerHTML * item.cells[2].innerHTML;
        }
    }

    players[1].cells[1].innerHTML = total;

    if(playerCnt > 0) {
        for(var i = 2; i < players.length - 1; i++) {
            players[i].cells[1].innerHTML = Math.round(total / playerCnt);
        }
    }

} //TODO update these on new/delete item w/ 'sell'
