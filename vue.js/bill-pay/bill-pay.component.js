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
            var bills = this.$root.$children[0].billsPay;

            if (!bills.length) {
                return false;
            }

            var count = 0;

            for (var i = 0; i < bills.length; i++) {
                if (!bills[i].done) {
                    count++;
                }
            }

            return count;
        },
    }
});