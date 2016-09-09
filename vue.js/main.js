var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'app-component': appComponent
    },
    template: `<app-component></app-component>`,
    data: function(){
        return {
            bills: [
                {data_due: '20/08/2016', name: 'Conta de Luz', value: 250.99, done: 1},
                {data_due: '21/08/2016', name: 'Conta de Água', value: 55.99, done: 0},
                {data_due: '22/08/2016', name: 'Conta de Telefone', value: 25.99, done: 1},
                {data_due: '23/08/2016', name: 'Conta de Supermercado', value: 700.99, done: 1},
                {data_due: '24/08/2016', name: 'Conta de Cartão de Crédito', value: 1599.80, done: 1},
                {data_due: '25/08/2016', name: 'Empréstimo', value: 2000.70, done: 1},
                {data_due: '26/08/2016', name: 'Gasolina', value: 300.85, done: 1}
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
    '/bills': {
        name: 'bill.list',
        component: billListComponent
    },

    '/bill/create': {
        name: 'bill.create',
        component: billCreateComponent
    },

    '*': {
        component: billListComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bills'
});