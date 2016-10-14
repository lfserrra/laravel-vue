window.billComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="menu in menus">
                <a v-link="{name: menu.routeName}">{{ menu.name }}</a>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
    `,

    data: function () {
        return {
            menus: [
                {name: 'Contas a Pagar', routeName: 'bill-pay.list'},
                {name: 'Contas a Receber', routeName: 'bill-receive.list'}
            ],
        };
    }
});