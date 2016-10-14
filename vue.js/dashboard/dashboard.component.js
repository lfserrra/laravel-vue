window.dashboardComponent = Vue.extend({
    template: `
    <style>
        .green{color: green}
        .grey{color: grey}
        .red{color: red}
    </style>

    <h1>{{ title }}</h1>
    <h3>{{ description }}</h3>

    <p><b>Total a Receber: </b> {{ receber | currency 'R$ '}}</p>
    <p><b>Total a pagar: </b> {{ pagar | currency 'R$' }}</p>
    <h2>Saldo: {{ receber - pagar | currency 'R$' }}</h2>
    `,

    data: function () {
        return {
            title: 'Dashboard',
            description: 'Dashboard sistema financeiro'
        };
    },

    computed: {
        receber: function(){
            var bills = this.$root.$children[0].billsReceive;

            return this.sum(bills, 'value');
        },

        pagar: function(){
            var bills = this.$root.$children[0].billsPay;

            return this.sum(bills, 'value');
        }
    },

    methods: {
        sum: function(collection, column){
            var total = 0;

            for (var i = 0; i < collection.length; i++) {
                total += parseFloat(collection[i][column]);
            }

            return total;
        }
    }
});