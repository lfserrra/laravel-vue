require('./bootstrap.js');

require(
    [
        './dashboard/dashboard.component',
        './bill-pay/bill-pay.component',
        './bill-pay/bill-pay-list.component',
        './bill-pay/bill-pay-create.component',
        './bill-receive/bill-receive.component',
        './bill-receive/bill-receive-list.component',
        './bill-receive/bill-receive-create.component',
        './bill.component',
    ],
    function (dashboardComponent,
              billPayComponent,
              billPayListComponent,
              billPayCreateComponent,
              billReceiveComponent,
              billReceiveListComponent,
              billReceiveCreateComponent,
              billComponent) {
        let VueRouter = require('vue-router');
        let router = new VueRouter();

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

                    '/:id/update': {
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

                    '/:id/update': {
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
                'bill-component': billComponent
            }
        }, '#app');

        router.redirect({
            '*': '/'
        });
    });