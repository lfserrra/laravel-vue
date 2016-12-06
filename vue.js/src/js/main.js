import './bootstrap';
import Dashboard from './dashboard/Dashboard.vue';
import BillPay from './bill-pay/bill-pay.vue';
import BillPayList from './bill-pay/bill-pay-list.vue';
import BillPayCreate from './bill-pay/bill-pay-create.vue';
import BillReceive from './bill-receive/bill-receive.vue';
import BillReceiveList from './bill-receive/bill-receive-list.vue';
import BillReceiveCreate from './bill-receive/bill-receive-create.vue';
import Bill from './Bill.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();

router.map({
    '/': {
        name: 'dashboard',
        component: Dashboard
    },

    '/bill-pays': {
        component: BillPay,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: BillPayList
            },

            '/create': {
                name: 'bill-pay.create',
                component: BillPayCreate
            },

            '/:id/update': {
                name: 'bill-pay.update',
                component: BillPayCreate
            }
        }
    },

    '/bill-receives': {
        component: BillReceive,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: BillReceiveList
            },

            '/create': {
                name: 'bill-receive.create',
                component: BillReceiveCreate
            },

            '/:id/update': {
                name: 'bill-receive.update',
                component: BillReceiveCreate
            }
        }
    },

    '*': {
        component: Dashboard
    }

});

router.start({
    components: {
        'bill-component': Bill
    }
}, '#app');

router.redirect({
    '*': '/'
});