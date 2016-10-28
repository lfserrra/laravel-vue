window.billPayMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="menu in menus">
                <a v-link="{name: menu.routeName}">{{ menu.name }}</a>
            </li>
        </ul>
    </nav>
    `,

    data() {
        return {
            menus: [

            ]
        };
    }
});