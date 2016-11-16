Vue.http.options.root = 'http://api.bills.dev:8000/api';

window.BillPay = Vue.resource('bills{/id}', {}, {
    total: {method: 'GET', url: 'bills/total'}
});

window.BillReceive = Vue.resource('bills_receive{/id}', {}, {
    total: {method: 'GET', url: 'bills_receive/total'}
});