Vue.http.options.root = 'http://api.bills.dev:8000/api';

let BillPayResource = Vue.resource('bills{/id}', {}, {
    total: {method: 'GET', url: 'bills/total'}
});

let BillReceiveResource = Vue.resource('bills_receive{/id}', {}, {
    total: {method: 'GET', url: 'bills_receive/total'}
});

export {BillPayResource, BillReceiveResource}