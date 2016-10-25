'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },

    template: '\n    <style>\n        .green{color: green}\n        .grey{color: grey}\n        .red{color: red}\n    </style>\n\n    <h1>{{ title }}</h1>\n    <h3 :class="{\'grey\': status === false, \'green\': status === 0, \'red\': status > 0}">{{ status | receiveStatusGeneral }}</h3>\n    <h3>{{ total | currency \'R$ \' }}</h3>\n\n    <menu-component></menu-component>\n    <router-view></router-view>\n    ',

    data: function data() {
        return {
            title: 'Contas a Receber',
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },


    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) {
                this.status = false;
            }

            var count = 0;
            for (var i = 0; i < bills.length; i++) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            BillReceive.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            BillReceive.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },

    events: {
        'change-info-bill-receive': function changeInfoBillReceive() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});