Vue.filter('doneLabel', function (value) {
    return (value == 1) ? 'Sim' : 'Não';
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }

    if (!value) {
        return 'Nenhuma conta a pagar';
    }

    if (value === 1) {
        return 'Existe 1 conta a pagar';
    }

    return 'Existem ' + value + ' contas a pagar';
});

var menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="menu in menus">
                <a href="#" @click.prevent="showView(menu)">{{ menu.name }}</a>
            </li>
        </ul>
    </nav>
    `,

    data: function () {
        return {
            menus: [
                {id: 0, name: 'Listar contas'},
                {id: 1, name: 'Criar conta'}
            ],
        };
    },

    methods: {
        showView: function (menu) {
            this.$dispatch('change-active-view', menu.id);

            if (menu.id == 1) {
                this.$dispatch('change-formType', 'insert');
                this.$dispatch('clear-form-bill', 'insert');
            }
        },
    }
});

var billListComponent = Vue.extend({
    template: `
    <style>
        .pago{color: green;}
        .nao-pago{color: red;}
    </style>

    <table border="1" cellpadding="10">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Pago?</th>
            <th colspan="2">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, bill) in bills">
            <td>{{ i + 1 }}</td>
            <td>{{ bill.data_due }}</td>
            <td>{{ bill.name }}</td>
            <td>{{ bill.value | currency 'R$ ' 2}}</td>
            <td :class="{'pago': bill.done, 'nao-pago': !bill.done}">
                <input type="checkbox" v-model="bill.done" :true-value="1" :false-value="0">
                {{ bill.done | doneLabel }}
            </td>
            <td>
                <button type="button" @click.prevent="loadBill(bill)">Editar</button>
            </td>
            <td>
                <button type="button" @click.prevent="excluir(bill)">Excluir</button>
            </td>
        </tr>
        </tbody>
    </table>`,

    data: function () {
        return {
            bills: [
                {data_due: '20/08/2016', name: 'Conta de Luz', value: 250.99, done: 1},
                {data_due: '21/08/2016', name: 'Conta de Água', value: 55.99, done: 0},
                {data_due: '22/08/2016', name: 'Conta de Telefone', value: 25.99, done: 1},
                {data_due: '23/08/2016', name: 'Conta de Supermercado', value: 700.99, done: 1},
                {data_due: '24/08/2016', name: 'Conta de Cartão de Crédito', value: 1599.80, done: 1},
                {data_due: '25/08/2016', name: 'Empréstimo', value: 2000.70, done: 1},
                {data_due: '26/08/2016', name: 'Gasolina', value: 300.85, done: 1}
            ]
        };
    },

    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-active-view', 1);
            this.$dispatch('change-formType', 'update');
        },

        excluir: function (bill) {
            if (confirm("Tem certeza que deseja excluir esse registro?")) {
                this.bills.$remove(bill);
            }
        },
    },

    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});

var billCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="bill.data_due">

        <br><br>

        <label>Conta: </label>
        <select v-model="bill.name">
            <option v-for="name in names" :value="name">{{ name }}</option>
        </select>

        <br><br>

        <label>Valor: </label>
        <input type="text" v-model="bill.value">

        <br><br>

        Pago? <input type="checkbox" v-model="bill.done" :true-value="1" :false-value="0">

        <br><br><br><br>

        <button type="submit">Enviar</button>
    </form>
    `,

    props: ['bill'],

    data: function () {
        return {
            names: [
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Conta de Supermercado',
                'Conta de Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],

            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            },

            formType: 'insert'
        };
    },

    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$dispatch('new-bill', this.bill)
            }

            this.$dispatch('clear-form-bill');
            this.$dispatch('change-active-view', 0);
        },
    },

    events: {
        'change-formType': function (formType) {
            this.formType = formType;
        },

        'change-bill': function (bill) {
            this.bill = bill;
        },

        'clear-form-bill': function () {
            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.$dispatch('change-formType', 'insert');
        }
    }
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent,
    },

    template: `
    <style>
        .green{color: green}
        .grey{color: grey}
        .red{color: red}
    </style>

    <h1>{{ title }}</h1>
    <h3 :class="{'grey': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral }}</h3>

    <menu-component></menu-component>

    <div v-show="activeView == 0">
        <bill-list-component v-ref:bill-list-component></bill-list-component>
    </div>

    <div v-show="activeView == 1">
        <bill-create-component :bill.sync="bill"></bill-create-component>
    </div>
    `,

    data: function () {
        return {
            title: 'Contas a pagar',
            activeView: 0
        };
    },

    computed: {
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if (!billListComponent.bills.length) {
                return false;
            }

            var count = 0;

            for (var i = 0; i < billListComponent.bills.length; i++) {
                if (!billListComponent.bills[i].done) {
                    count++;
                }
            }

            return count;
        },
    },

    events: {
        'change-active-view': function (activeView) {
            this.activeView = activeView;
        },

        'change-formType': function (formType) {
            this.$broadcast('change-formType', formType);
        },

        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },

        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        },

        'clear-form-bill': function () {
            this.$broadcast('clear-form-bill');
        }
    }
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: '#app',
});