// main.js
var update = document.getElementById('update')
var updateId = document.getElementById('updateId').value;
var updateQuote = document.getElementById('updateQuote').value;

update.addEventListener('click', function () {
    // Send PUT Request here
    fetch('quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': updateId,
            'quote': updateQuote
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload()
        })
})

var del = document.getElementById('delete')
var deleteId = document.getElementById('deleteId').value;

del.addEventListener('click', function () {
    fetch('quotes', {
        method: 'delete',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        'id': deleteId
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    }).
    then(data => {
        console.log(data)
        window.location.reload()
    })
})