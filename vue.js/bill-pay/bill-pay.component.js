window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },

    template: `
    <style>
        .green{color: green}
        .grey{color: grey}
        .red{color: red}
    </style>

    <h1>{{ title }}</h1>
    <h3 :class="{'grey': status === false, 'green': status === 0, 'red': status > 0}">{{ status | payStatusGeneral }}</h3>
    <h3>{{ total | currency 'R$ ' }}</h3>

    <menu-component></menu-component>
    <router-view></router-view>
    `,

    data: function () {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },

    created: function(){
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function(bills){
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

        updateStatus: function(){
            var self = this;

            BillPay.query().then(function(response){
                self.calculateStatus(response.data);
            });
        },

        updateTotal: function(){
            var self = this;

            BillPay.total().then(function(response){
                self.total = response.data.total;
            });
        }
    },

    events: {
        'change-info-bill-pay': function(){
            this.updateStatus();
            this.updateTotal();
        }
    }
});