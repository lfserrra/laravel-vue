window.menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="menu in menus">
                <a v-link="{name: menu.routeName}">{{ menu.name }}</a>
            </li>
        </ul>
    </nav>
    `,

    data: function () {
        return {
            menus: [
                {id: 0, name: 'Listar contas', routeName: 'bill.list'},
                {id: 1, name: 'Criar conta', routeName: 'bill.create'}
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