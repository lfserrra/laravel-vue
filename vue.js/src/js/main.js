import './bootstrap';
import DashboardComponent from './dashboard/dashboard.component';
import BillPayComponent from './bill-pay/bill-pay.component';
import BillPayListComponent from './bill-pay/bill-pay-list.component';
import BillPayCreateComponent from './bill-pay/bill-pay-create.component';
import BillReceiveComponent from './bill-receive/bill-receive.component';
import BillReceiveListComponent from './bill-receive/bill-receive-list.component';
import BillReceiveCreateComponent from './bill-receive/bill-receive-create.component';
import BillComponent from './Bill.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();

router.map({
    '/': {
        name: 'dashboard',
        component: DashboardComponent
    },

    '/bill-pays': {
        component: BillPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: BillPayListComponent
            },

            '/create': {
                name: 'bill-pay.create',
                component: BillPayCreateComponent
            },

            '/:id/update': {
                name: 'bill-pay.update',
                component: BillPayCreateComponent
            }
        }
    },

    '/bill-receives': {
        component: BillReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: BillReceiveListComponent
            },

            '/create': {
                name: 'bill-receive.create',
                component: BillReceiveCreateComponent
            },

            '/:id/update': {
                name: 'bill-receive.update',
                component: BillReceiveCreateComponent
            }
        }
    },

    '*': {
        component: DashboardComponent
    }

});

router.start({
    components: {
        'bill-component': BillComponent
    }
}, '#app');

router.redirect({
    '*': '/'
});