'use strict';

window.billPayMenuComponent = Vue.extend({
    template: '\n    <nav>\n        <ul>\n            <li v-for="menu in menus">\n                <a v-link="{name: menu.routeName}">{{ menu.name }}</a>\n            </li>\n        </ul>\n    </nav>\n    ',

    data: function data() {
        return {
            menus: [{ id: 0, name: 'Listar contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar conta', routeName: 'bill-pay.create' }]
        };
    }
});