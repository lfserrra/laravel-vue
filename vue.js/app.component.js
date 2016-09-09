window.appComponent = Vue.extend({
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
    <router-view></router-view>
    `,

    data: function () {
        return {
            title: 'Contas a pagar',
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