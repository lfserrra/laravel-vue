Vue.filter('doneLabel', function (value) {
    return (value == 1) ? 'Sim' : 'Não';
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }

    if (!value) {
        return 'Nenhuma conta a pagar';
    }

    if (value === 1) {
        return 'Existe 1 conta a pagar';
    }

    return 'Existem ' + value + ' contas a pagar';
});