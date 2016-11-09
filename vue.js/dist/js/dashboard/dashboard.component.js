'use strict';

window.dashboardComponent = Vue.extend({
    template: '\n    <div class="section">\n        <div class="container">\n            <h4>{{ title }}</h4>\n            <h5>{{ description }}</h5>\n            \n            <div class="row">\n                <div class="col s6">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i> Receber\n                            </p>\n                            <h5>{{ receive | currency \'R$ \'}}</h5>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="col s6">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i> Pagar\n                            </p>\n                            <h5>{{ pay | currency \'R$ \'}}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div class="row">\n                <div class="col s12">\n                    <div class="card z-depth-2" :class="{\'green\': (receive - pay) >= 0, \'red\': (receive - pay) < 0}">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i> Saldo\n                            </p>\n                            <h5>{{ receive - pay | currency \'R$ \' }}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ',

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