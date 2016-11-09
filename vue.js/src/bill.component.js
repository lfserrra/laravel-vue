window.billComponent = Vue.extend({
    template: `
    <ul v-bind:id="menu.id" class="dropdown-content" v-for="menu in menusDropdown">
        <li v-for="item in menu.items">
            <a v-link="{name: item.routeName}">{{ item.name }}</a>
        </li>
    </ul>
    
    <ul v-bind:id="menu.id + '-mobile'" class="dropdown-content" v-for="menu in menusDropdown">
        <li v-for="item in menu.items">
            <a v-link="{name: item.routeName}">{{ item.name }}</a>
        </li>
    </ul>

    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo right">Code Contas</a>
                <a href="#" data-activates="nav-mobile" class="button-collapse left">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="left hide-on-med-and-down">
                    <li v-for="menu in menus">
                        <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId">
                            {{ menu.name }}
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>

                        <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>
                    </li>
                </ul>

                <ul id="nav-mobile" class="side-nav">
                    <li v-for="menu in menus">
                        <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId + '-mobile'">
                            {{ menu.name }}
                        </a>

                        <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

    <router-view></router-view>
    `,

    ready(){
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },

    data() {
        return {
            menus: [
                {name: 'Dashboard', routeName: 'dashboard'},
                {name: 'Contas a Pagar', routeName: 'bill-pay.list', dropdownId: 'bill-pay'},
                {name: 'Contas a Receber', routeName: 'bill-receive.list', dropdownId: 'bill-receive'}
            ],
            menusDropdown: [
                {
                    id: 'bill-pay',
                    items: [
                        {id: 0, name: 'Listar contas', routeName: 'bill-pay.list'},
                        {id: 1, name: 'Criar conta', routeName: 'bill-pay.create'}
                    ]
                },

                {
                    id: 'bill-receive',
                    items: [
                        {id: 0, name: 'Listar contas', routeName: 'bill-receive.list'},
                        {id: 1, name: 'Criar conta', routeName: 'bill-receive.create'}
                    ]
                }
            ]
        };
    }
});