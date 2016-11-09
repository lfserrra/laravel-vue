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
    
    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Financeiro</h5>
                    <p class="grey-text text-lighten-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel turpis pellentesque enim rhoncus venenatis vitae vitae tellus. Suspendisse potenti. Mauris molestie lectus id turpis feugiat rhoncus. Praesent sodales lacinia turpis, ac vehicula est luctus sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dictum metus. Etiam dictum mi et ex egestas hendrerit. Etiam risus nisl
                    </p>
                </div>
                
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Links</h5>
                    
                    <ul>
                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Pagar - Listar</a></li>
                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Pagar - Novo</a></li>
                        <li><hr></li>
                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Receber - Listar</a></li>
                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Receber - Novo</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="footer-copyright">
            <div class="container">
                © Code education
                <a v-link="{name: 'dashboard'}" class="grey-text text-lighten-4 right">Dashboard</a>
            </div>
        </div>
    </footer>
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