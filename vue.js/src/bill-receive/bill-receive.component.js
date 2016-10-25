window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },

    template: `
    <style>
        .green{color: green}
        .grey{color: grey}
        .red{color: red}
    </style>

    <h1>{{ title }}</h1>
    <h3 :class="{'grey': status === false, 'green': status === 0, 'red': status > 0}">{{ status | receiveStatusGeneral }}</h3>
    <h3>{{ total | currency 'R$ ' }}</h3>

    <menu-component></menu-component>
    <router-view></router-view>
    `,

    data() {
        return {
            title: 'Contas a Receber',
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
            BillReceive.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },

        updateTotal(){
            BillReceive.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },

    events: {
        'change-info-bill-receive'(){
            this.updateStatus();
            this.updateTotal();
        }
    }
});