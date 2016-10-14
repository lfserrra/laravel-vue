var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: `<bill-component></bill-component>`,
    data: function () {
        return {
            billsPay: [
                {data_due: '20/08/2016', name: 'Conta de Luz', value: 250.99, done: 1},
                {data_due: '21/08/2016', name: 'Conta de Água', value: 55.99, done: 0},
                {data_due: '22/08/2016', name: 'Conta de Telefone', value: 25.99, done: 1},
                {data_due: '23/08/2016', name: 'Conta de Supermercado', value: 700.99, done: 1},
                {data_due: '24/08/2016', name: 'Conta de Cartão de Crédito', value: 1599.80, done: 1},
                {data_due: '25/08/2016', name: 'Empréstimo', value: 2000.70, done: 1},
                {data_due: '26/08/2016', name: 'Gasolina', value: 300.85, done: 1}
            ],

            billsReceive: [
                {data_due: '20/08/2016', name: 'Conta de Luz', value: 250.99, done: 1},
                {data_due: '21/08/2016', name: 'Conta de Água', value: 55.99, done: 0}
            ],

            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            },
        }
    }
});

router.map({
    '/': {
        name: 'dashboard',
        component: dashboardComponent
    },

    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },

            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },

            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }
    },

    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },

            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },

            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },

    '*': {
        component: dashboardComponent
    }

});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/'
});