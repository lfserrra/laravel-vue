webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <div class="section">\n        <div class="container">\n            <h4>{{ title }}</h4>\n            <h5>{{ description }}</h5>\n            \n            <div class="row">\n                <div class="col s6">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i> Receber\n                            </p>\n                            <h5>{{ receive | currency \'R$ \'}}</h5>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="col s6">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i> Pagar\n                            </p>\n                            <h5>{{ pay | currency \'R$ \'}}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div class="row">\n                <div class="col s12">\n                    <div class="card z-depth-2" :class="{\'green\': (receive - pay) >= 0, \'red\': (receive - pay) < 0}">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i> Saldo\n                            </p>\n                            <h5>{{ receive - pay | currency \'R$ \' }}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ',

	    data: function data() {
	        return {
	            title: 'Dashboard',
	            description: 'Dashboard sistema financeiro',
	            accounts_payable: false,
	            receive: 0,
	            pay: 0
	        };
	    },

	    created: function created() {
	        var _this = this;

	        BillReceive.total().then(function (response) {
	            _this.receive = response.data.total;
	        });

	        BillPay.total().then(function (response) {
	            _this.pay = response.data.total;
	        });
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <div class="section">\n        <div class="container">\n            <h4>{{ title }}</h4>\n            <div class="row">\n                <div class="col s6">\n                    <div class="card z-depth-2" :class="{\'grey\': status === false, \'green\': status === 0, \'red\': status > 0}">\n                        <div class="card-content white-text">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i>\n                            </p>\n                            <h5>{{ status | payStatusGeneral }}</h5>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="col s6">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">payment</i>\n                            </p>\n                            <h5>{{ total | currency \'R$ \' }}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class="divider"></div>\n    \n    <router-view></router-view>\n    ',

	    data: function data() {
	        return {
	            title: 'Contas a pagar',
	            status: false,
	            total: 0
	        };
	    },
	    created: function created() {
	        this.updateStatus();
	        this.updateTotal();
	    },


	    methods: {
	        calculateStatus: function calculateStatus(bills) {
	            if (!bills.length) {
	                this.status = false;
	            }

	            var count = 0;
	            for (var i = 0; i < bills.length; i++) {
	                if (!bills[i].done) {
	                    count++;
	                }
	            }

	            this.status = count;
	        },
	        updateStatus: function updateStatus() {
	            var _this = this;

	            BillPay.query().then(function (response) {
	                _this.calculateStatus(response.data);
	            });
	        },
	        updateTotal: function updateTotal() {
	            var _this2 = this;

	            BillPay.total().then(function (response) {
	                _this2.total = response.data.total;
	            });
	        }
	    },

	    events: {
	        'change-info-bill-pay': function changeInfoBillPay() {
	            this.updateStatus();
	            this.updateTotal();
	        }
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(8);

	module.exports = {
	    components: {
	        'modal': modalComponent
	    },

	    template: '\n    <div class="container">\n        <h3>Minhas contas a pagar</h3>\n        \n        <div class="row">\n            <table class="bordered highlight centered">\n                <thead>\n                    <tr>\n                        <th>#</th>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Pago?</th>\n                        <th>A\xE7\xF5es</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for="(i, bill) in bills">\n                        <td>{{ i + 1 }}</td>\n                        <td>{{ bill.date_due | dateFormat \'pt-BR\' }}</td>\n                        <td>{{ bill.name | upperFormat }}</td>\n                        <td>{{ bill.value | numberFormat \'pt-BR\'}}</td>\n                        <td class="white-text" :class="{\'green lighten-2\': bill.done, \'red lighten-2\': !bill.done}">\n                            {{ bill.done | doneLabel }}\n                        </td>\n                        <td>\n                            <a v-link="{name: \'bill-pay.update\', params: {id: bill.id}}" class="btn waves-effect waves-light">\n                                <i class="material-icons">mode_edit</i>\n                            </a>\n                            \n                            <button type="button" @click.prevent="openModalDelete(bill)" class="btn red waves-effect waves-light">\n                                <i class="material-icons">delete</i>\n                            </button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    \n    <modal :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            \n            <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>\n            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>\n            \n            <div class="divider"></div>\n        </div>\n        \n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click.prevent="deleteBill()">Ok</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n    ',

	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillPay.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },


	    methods: {
	        deleteBill: function deleteBill() {
	            var _this2 = this;

	            BillPay.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta excluída com sucesso', 4000);
	                _this2.$dispatch('change-info-bill-pay');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {
	            this.billToDelete = bill;
	            $('#modal-delete').openModal();
	        }
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <div :id="modal.id" class="modal">\n        <div class="modal-content">\n            <slot name="content"></slot>\n        </div>\n        \n        <div class="modal-footer">\n            <slot name="footer"></slot>\n        </div>\n    </div>\n    ',

	    props: ['modal'],

	    data: function data() {
	        return {
	            modal: {
	                id: ''
	            }
	        };
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var names = ['Conta de luz', 'Conta de \xE1gua', 'Conta de telefone', 'Supermercado', 'Conta de Cartão de Crédito', 'Empréstimo', 'Gasolina'];

	module.exports = {
	    template: '\n    <div class="container">\n        <h3>{{ title }}</h3>\n        \n        <form @submit.prevent="submit">\n            <div class="row">\n                <div class="input-field col s6">\n                    <label for="date_due" class="active">Vencimento</label>\n                    <input id="date_due" type="text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a data">\n                </div>\n            \n                <div class="input-field col s6">\n                    <label for="value" class="active">Valor</label>\n                    <input id="value" type="text" v-model="bill.value | numberFormat \'pt-BR\'" placeholder="Informe o valor">\n                </div>\n            </div>\n    \n            <div class="row">\n                <div class="input-field col s6">\n                    <label for="name" class="active">Conta</label>\n                    <select v-model="bill.name | upperFormat" id="name" class="browser-default">\n                    <option value="" disabled selected>Escolha um nome</option>\n                        <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat }}</option>\n                    </select>\n                </div>\n                \n                <div class="input-field col s6">\n                    <input type="checkbox" id="done" v-model="bill.done" :true-value="1" :false-value="0">\n                    <label for="done">Pago?</label>\n                </div>\n            </div>\n    \n            <div class="row">\n                <div class="col s12">\n                    <button type="submit" class="btn btn-large right">Enviar</button>\n                </div>\n            </div>\n        </form>\n    </div>\n    ',

	    data: function data() {
	        return {
	            names: names,

	            bill: new BillPayClass(),

	            formType: 'insert',

	            title: 'Nova conta'
	        };
	    },
	    created: function created() {
	        if (this.$route.name == 'bill-pay.update') {
	            this.formType = 'update';
	            this.title = 'Editar conta';
	            this.getBill(this.$route.params.id);
	        }

	        $(document).ready(function () {
	            $('#name').material_select();
	        });
	    },


	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toJSON();

	            if (this.formType == 'insert') {
	                BillPay.save({}, data).then(function (response) {
	                    Materialize.toast('Conta criada com sucesso', 4000);

	                    _this.$dispatch('change-info-bill-pay');

	                    _this.$router.go({ name: 'bill-pay.list' });
	                });
	            } else {
	                BillPay.update({ id: this.bill.id }, data).then(function (response) {
	                    Materialize.toast('Conta editada com sucesso', 4000);

	                    _this.$dispatch('change-info-bill-pay');

	                    _this.$router.go({ name: 'bill-pay.list' });
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            BillPay.get({ id: id }).then(function (response) {
	                _this2.bill = new BillPayClass(response.data);
	            });
	        }
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <div class="section">\n        <div class="container">\n            <h4>{{ title }}</h4>\n            <div class="row">\n                <div class="col s6">\n                    <div class="card z-depth-2" :class="{\'grey\': status === false, \'green\': status === 0, \'red\': status > 0}">\n                        <div class="card-content white-text">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i>\n                            </p>\n                            <h5>{{ status | receiveStatusGeneral }}</h5>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="col s6">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">payment</i>\n                            </p>\n                            <h5>{{ total | currency \'R$ \' }}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class="divider"></div>\n    \n    <router-view></router-view>\n    ',

	    data: function data() {
	        return {
	            title: 'Contas a Receber',
	            status: false,
	            total: 0
	        };
	    },
	    created: function created() {
	        this.updateStatus();
	        this.updateTotal();
	    },


	    methods: {
	        calculateStatus: function calculateStatus(bills) {
	            if (!bills.length) {
	                this.status = false;
	            }

	            var count = 0;
	            for (var i = 0; i < bills.length; i++) {
	                if (!bills[i].done) {
	                    count++;
	                }
	            }

	            this.status = count;
	        },
	        updateStatus: function updateStatus() {
	            var _this = this;

	            BillReceive.query().then(function (response) {
	                _this.calculateStatus(response.data);
	            });
	        },
	        updateTotal: function updateTotal() {
	            var _this2 = this;

	            BillReceive.total().then(function (response) {
	                _this2.total = response.data.total;
	            });
	        }
	    },

	    events: {
	        'change-info-bill-receive': function changeInfoBillReceive() {
	            this.updateStatus();
	            this.updateTotal();
	        }
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(8);

	module.exports = {
	    components: {
	        'modal': modalComponent
	    },

	    template: '\n    <div class="container">\n        <h3>Minhas contas a receber</h3>\n        \n        <div class="row">\n            <table class="bordered highlight centered">\n                <thead>\n                    <tr>\n                        <th>#</th>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Pago?</th>\n                        <th>A\xE7\xF5es</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for="(i, bill) in bills">\n                        <td>{{ i + 1 }}</td>\n                        <td>{{ bill.date_due | dateFormat \'pt-BR\' }}</td>\n                        <td>{{ bill.name | upperFormat }}</td>\n                        <td>{{ bill.value | numberFormat \'pt-BR\'}}</td>\n                        <td class="white-text" :class="{\'green lighten-2\': bill.done, \'red lighten-2\': !bill.done}">\n                            {{ bill.done | doneLabel }}\n                        </td>\n                        <td>\n                            <a v-link="{name: \'bill-receive.update\', params: {id: bill.id}}" class="btn waves-effect waves-light">\n                                <i class="material-icons">mode_edit</i>\n                            </a>\n                            \n                            <button type="button" @click.prevent="openModalDelete(bill)" class="btn red waves-effect waves-light">\n                                <i class="material-icons">delete</i>\n                            </button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    \n    <modal :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            \n            <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>\n            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>\n            \n            <div class="divider"></div>\n        </div>\n        \n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click.prevent="deleteBill()">Ok</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n    ',

	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillReceive.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },


	    methods: {
	        deleteBill: function deleteBill() {
	            var _this2 = this;

	            BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta excluída com sucesso', 4000);
	                _this2.$dispatch('change-info-bill-receive');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {
	            this.billToDelete = bill;
	            $('#modal-delete').openModal();
	        }
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var names = ['Conta de luz', 'Conta de \xE1gua', 'Conta de telefone', 'Supermercado', 'Conta de Cartão de Crédito', 'Empréstimo', 'Gasolina'];

	module.exports = {
	    template: '\n    <div class="container">\n        <h3>{{ title }}</h3>\n        \n        <form @submit.prevent="submit">\n            <div class="row">\n                <div class="input-field col s6">\n                    <label for="date_due" class="active">Vencimento</label>\n                    <input id="date_due" type="text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a data">\n                </div>\n            \n                <div class="input-field col s6">\n                    <label for="value" class="active">Valor</label>\n                    <input id="value" type="text" v-model="bill.value | numberFormat \'pt-BR\'" placeholder="Informe o valor">\n                </div>\n            </div>\n    \n            <div class="row">\n                <div class="input-field col s6">\n                    <label for="name" class="active">Conta</label>\n                    <select v-model="bill.name | upperFormat" id="name" class="browser-default">\n                    <option value="" disabled selected>Escolha um nome</option>\n                        <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat }}</option>\n                    </select>\n                </div>\n                \n                <div class="input-field col s6">\n                    <input type="checkbox" id="done" v-model="bill.done" :true-value="1" :false-value="0">\n                    <label for="done">Pago?</label>\n                </div>\n            </div>\n    \n            <div class="row">\n                <div class="col s12">\n                    <button type="submit" class="btn btn-large right">Enviar</button>\n                </div>\n            </div>\n        </form>\n    </div>\n    ',

	    data: function data() {
	        return {
	            names: names,

	            bill: new BillReceiveClass(),

	            formType: 'insert',

	            title: 'Nova conta'
	        };
	    },
	    created: function created() {
	        if (this.$route.name == 'bill-receive.update') {
	            this.formType = 'update';
	            this.title = 'Editar conta';
	            this.getBill(this.$route.params.id);
	        }

	        $(document).ready(function () {
	            $('#name').material_select();
	        });
	    },


	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toJSON();

	            if (this.formType == 'insert') {
	                BillReceive.save({}, data).then(function (response) {
	                    Materialize.toast('Conta criada com sucesso', 4000);

	                    _this.$dispatch('change-info-bill-receive');

	                    _this.$router.go({ name: 'bill-receive.list' });
	                });
	            } else {
	                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
	                    Materialize.toast('Conta editada com sucesso', 4000);

	                    _this.$dispatch('change-info-bill-receive');

	                    _this.$router.go({ name: 'bill-receive.list' });
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            BillReceive.get({ id: id }).then(function (response) {
	                _this2.bill = new BillReceiveClass(response.data);
	            });
	        }
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <ul v-bind:id="menu.id" class="dropdown-content" v-for="menu in menusDropdown">\n        <li v-for="item in menu.items">\n            <a v-link="{name: item.routeName}">{{ item.name }}</a>\n        </li>\n    </ul>\n    \n    <ul v-bind:id="menu.id + \'-mobile\'" class="dropdown-content" v-for="menu in menusDropdown">\n        <li v-for="item in menu.items">\n            <a v-link="{name: item.routeName}">{{ item.name }}</a>\n        </li>\n    </ul>\n\n    <div class="navbar-fixed">\n        <nav>\n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Code Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse left">\n                    <i class="material-icons">menu</i>\n                </a>\n\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="menu in menus">\n                        <a v-if="menu.dropdownId" class="dropdown-button" data-beloworigin="true" data-hover="true" href="!#" v-bind:data-activates="menu.dropdownId">\n                            {{ menu.name }}\n                            <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n\n                        <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>\n                    </li>\n                </ul>\n\n                <ul id="nav-mobile" class="side-nav">\n                    <li v-for="menu in menus">\n                        <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId + \'-mobile\'">\n                            {{ menu.name }}\n                        </a>\n\n                        <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    </div>\n\n    <router-view></router-view>\n    \n    <footer class="page-footer">\n        <div class="container">\n            <div class="row">\n                <div class="col l6 s12">\n                    <h5 class="white-text">Financeiro</h5>\n                    <p class="grey-text text-lighten-4">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel turpis pellentesque enim rhoncus venenatis vitae vitae tellus. Suspendisse potenti. Mauris molestie lectus id turpis feugiat rhoncus. Praesent sodales lacinia turpis, ac vehicula est luctus sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dictum metus. Etiam dictum mi et ex egestas hendrerit. Etiam risus nisl\n                    </p>\n                </div>\n                \n                <div class="col l4 offset-l2 s12">\n                    <h5 class="white-text">Links</h5>\n                    \n                    <ul>\n                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Pagar - Listar</a></li>\n                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Pagar - Novo</a></li>\n                        <li><hr></li>\n                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Receber - Listar</a></li>\n                        <li><a class="grey-text text-lighten-3" href="#!">Contas a Receber - Novo</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        \n        <div class="footer-copyright">\n            <div class="container">\n                \xA9 Code education\n                <a v-link="{name: \'dashboard\'}" class="grey-text text-lighten-4 right">Dashboard</a>\n            </div>\n        </div>\n    </footer>\n    ',

	    ready: function ready() {
	        $(document).ready(function () {
	            $('.button-collapse').sideNav();
	            $('.dropdown-button').dropdown();
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
	};

/***/ }
]);