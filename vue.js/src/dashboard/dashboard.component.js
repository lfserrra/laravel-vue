window.dashboardComponent = Vue.extend({
    template: `
    <style>
        .green{color: green}
        .red{color: red}
    </style>

    <h1>{{ title }}</h1>
    <h3>{{ description }}</h3>

    <br>

    <p><b>Total a Receber: </b> {{ receive | currency 'R$ '}}</p>
    <p><b>Total a pagar: </b> {{ pay | currency 'R$ ' }}</p>
    <h2 :class="{'green': (receive - pay) >= 0, 'red': (receive - pay) < 0}">Saldo: {{ receive - pay | currency 'R$ ' }}</h2>
    `,

    data: function () {
        return {
            title: 'Dashboard',
            description: 'Dashboard sistema financeiro',
            accounts_payable: false,
            receive: 0,
            pay: 0
        };
    },

    created: function(){
        BillReceive.total().then((response) => {
            this.receive = response.data.total;
        });

        BillPay.total().then((response) => {
            this.pay = response.data.total;
        });
    }
});