window.dashboardComponent = Vue.extend({
    template: `
    <style>
        .green{color: green}
        .red{color: red}
    </style>

    <h1>{{ title }}</h1>
    <h3>{{ description }}</h3>
    <h4>
        <label>
        <input type="checkbox" v-model="accounts_payable"> Somar valores ainda não pagos
        </label>
    </h4>

    <br>

    <p><b>Total a Receber: </b> {{ receber | currency 'R$ '}}</p>
    <p><b>Total a pagar: </b> {{ pagar | currency 'R$ ' }}</p>
    <h2 :class="{'green': (receber - pagar) >= 0, 'red': (receber - pagar) < 0}">Saldo: {{ receber - pagar | currency 'R$ ' }}</h2>
    `,

    data: function () {
        return {
            title: 'Dashboard',
            description: 'Dashboard sistema financeiro',
            accounts_payable: false
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
        sum: function(bills){
            var total = 0;

            for (var i = 0; i < bills.length; i++) {
                if(this.accounts_payable || bills[i].done == 1) {
                    total += parseFloat(bills[i].value);
                }
            }

            return total;
        }
    }
});