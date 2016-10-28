'use strict';

window.billComponent = Vue.extend({
    template: '\n    <ul v-bind:id="menu.id" class="dropdown-content" v-for="menu in menusDropdown">\n        <li v-for="item in menu.items">\n            <a v-link="{name: item.routeName}">{{ item.name }}</a>\n        </li>\n    </ul>\n\n    <div class="navbar-fixed">\n        <nav>\n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Code Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse left">\n                    <i class="material-icons">menu</i>\n                </a>\n\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="menu in menus">\n                        <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId">\n                            {{ menu.name }}\n                            <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n\n                        <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>\n                    </li>\n                </ul>\n\n                <ul id="nav-mobile" class="side-nav">\n                    <li v-for="menu in menus">\n                        <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId">\n                            {{ menu.name }}\n                        </a>\n\n                        <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    </div>\n\n    <router-view></router-view>\n    ',

    ready: function ready() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-content').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: 'Dashboard', routeName: 'dashboard' }, { name: 'Contas a Pagar', routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: 'Contas a Receber', routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],
            menusDropdown: [{
                id: 'bill-pay',
                items: [{ id: 0, name: 'Listar contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar conta', routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive',
                items: [{ id: 0, name: 'Listar contas', routeName: 'bill-receive.list' }, { id: 1, name: 'Criar conta', routeName: 'bill-receive.create' }]
            }]
        };
    }
});