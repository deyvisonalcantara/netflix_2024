sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectnetflix.controller.Inicio", {
        onInit: function () {
            //definição de lista vazia
        let resultados = {
            title: []
        }

        // definição de modelo - variavel especial para mostrar dados na tela 
        let resultadosModel = new JSONModel();
        //atribuiçao de dados
        resultadosModel.setData(resultados);
        //anexar modelo na tela 
        let tela = this.getView();
        tela.setModel(resultadosModel, "APINetflix");

        },
        onInicioLinkPress: function(){
            alert("Navegar para tela inicial")
        },
        onBuscarDados: function(){
            //Busca de dados na API da netflix
            let searchField = this.byId("idSearchField");
            let filtro =  searchField.getValue();


            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '87f62a8478msh2da825d02eeafd7p177695jsnc751efec8b3b',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                // RESGATAR O MOEDELO E ATUALIZAR OS DADOS
                let tela = this.getView();
                let modelo = tela.getModel("APINetflix");
                let dados =  modelo.getData();

                // limpar a lista 
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh();


            }.bind(this));
        }
    });
});
