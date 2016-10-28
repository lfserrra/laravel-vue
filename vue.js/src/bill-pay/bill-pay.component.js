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

    <div class="section">
        <div class="container">
            <h1>{{ title }}</h1>
            <h3 :class="{'grey': status === false, 'green': status === 0, 'red': status > 0}">{{ status | payStatusGeneral }}</h3>
            <h3>{{ total | currency 'R$ ' }}</h3>

            <menu-component></menu-component>
        </div>
    </div>

    <router-view></router-view>
    `,

    data() {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },

    created(){
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus(bills){
            if (!bills.length) {
                this.status = false;
            }

            let count = 0;
            for (let i = 0; i < bills.length; i++) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count;
        },

        updateStatus(){
            BillPay.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },

        updateTotal(){
            BillPay.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },

    events: {
        'change-info-bill-pay'(){
            this.updateStatus();
            this.updateTotal();
        }
    }
});