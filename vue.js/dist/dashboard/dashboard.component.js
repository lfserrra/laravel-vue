'use strict';

window.dashboardComponent = Vue.extend({
    template: '\n    <style>\n        .green{color: green}\n        .red{color: red}\n    </style>\n\n    <h1>{{ title }}</h1>\n    <h3>{{ description }}</h3>\n\n    <br>\n\n    <p><b>Total a Receber: </b> {{ receive | currency \'R$ \'}}</p>\n    <p><b>Total a pagar: </b> {{ pay | currency \'R$ \' }}</p>\n    <h2 :class="{\'green\': (receive - pay) >= 0, \'red\': (receive - pay) < 0}">Saldo: {{ receive - pay | currency \'R$ \' }}</h2>\n    ',

    data: function data() {
        return {
            title: 'Dashboard',
            description: 'Dashboard sistema financeiro',
            accounts_payable: false,
            receive: 0,
            pay: 0
        };
    },

    created: function created() {
        var _this = this;

        BillReceive.total().then(function (response) {
            _this.receive = response.data.total;
        });

        BillPay.total().then(function (response) {
            _this.pay = response.data.total;
        });
    }
});