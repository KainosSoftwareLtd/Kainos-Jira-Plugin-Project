

AJS.$( document ).ready(function(){

    /* get issues */
	getIssues();

    /* refresh issues */
    AJS.$('#kainos_refresh').click(function(){
        getIssues();
    });

});


/**
 * Get issues and add to table
 */
function getIssues(){
    data_tab = [];
    /* ajax query to api */
    AJS.$.ajax({
        type: "GET",
        dataType   : 'json',
        url: options['host'] + '/rest/api/2/search?jql=project%3D"'+options['project_name']+'"&startAt=0&maxResults=1000&expand=changelog',
        beforeSend: function(){
            /* hide table before sending */
            //console.log('loading start ...');
            AJS.$('#kainos_loading').show();
            AJS.$('#kainos_content').hide();
        },
        success: function(obj) {
            /* start data filtering */
            for(var i in obj.issues) {
            	console.log(obj.issues[i]);
            	var id = obj.issues[i].id;
            	var self = obj.issues[i].self;
            	var key = obj.issues[i].key;
                var created = Date.parse(obj.issues[i].fields.created);
                //
                var status_time_form = created; 
                var histories = obj.issues[i].changelog.histories;
                for(var j in histories) {
                    var hist_id = histories[j].id;
                    for(var k in histories[j].items){
                        var field = histories[j].items[k].field;
                        if(field == 'status'){
                            var status_form = histories[j].items[k].fromString;
                            var status_to = histories[j].items[k].toString;
                            var status_created = Date.parse(histories[j].created);
                            var status_time = status_created - status_time_form;
                            var status_time_form = status_created;
                            if(!data_tab.hasOwnProperty(status_form)){
                                data_tab[status_form] = []
                            }
                            data_tab[status_form].push((status_time/1000)/60);
                        }
                    }
                }
            }
            /* end data filtering */

            /* clear and rebuild table */
            //thead
            AJS.$('#tabela_kainos_plugin thead').empty();
            AJS.$('#tabela_kainos_plugin thead').append('<tr></tr>');
            AJS.$('#tabela_kainos_plugin thead tr').append('<th>Type</th>');
            
            //tbody
            AJS.$('#tabela_kainos_plugin tbody').empty('');
            AJS.$('#tabela_kainos_plugin tbody').append('<tr class="lbl_max"></tr>');
            AJS.$('#tabela_kainos_plugin tbody').append('<tr class="lbl_min"></tr>');
            AJS.$('#tabela_kainos_plugin tbody').append('<tr class="lbl_q1"></tr>');
            AJS.$('#tabela_kainos_plugin tbody').append('<tr class="lbl_q2"></tr>');
            AJS.$('#tabela_kainos_plugin tbody').append('<tr class="lbl_q3"></tr>');
            AJS.$('#tabela_kainos_plugin tbody').append('<tr class="lbl_q4"></tr>');
            AJS.$('#tabela_kainos_plugin tbody .lbl_max').append('<td>MAX</td>');
            AJS.$('#tabela_kainos_plugin tbody .lbl_min').append('<td>MIN</td>');
            AJS.$('#tabela_kainos_plugin tbody .lbl_q1').append('<td>Q1</td>');
            AJS.$('#tabela_kainos_plugin tbody .lbl_q2').append('<td>Q2</td>');
            AJS.$('#tabela_kainos_plugin tbody .lbl_q3').append('<td>Q3</td>');
            AJS.$('#tabela_kainos_plugin tbody .lbl_q4').append('<td>Q4</td>');

            /* add data to table */
            for(var name in data_tab){
                //thead
                AJS.$('#tabela_kainos_plugin thead tr').append('<th>'+name+'</th>');
                //console.log(name);
                //console.log(data_tab[name]);
                //tbody
                AJS.$('#tabela_kainos_plugin tbody .lbl_max').append('<td>'+round(showMax(data_tab[name]))+'</td>');
                AJS.$('#tabela_kainos_plugin tbody .lbl_min').append('<td>'+round(showMin(data_tab[name]))+'</td>');
                AJS.$('#tabela_kainos_plugin tbody .lbl_q1').append('<td>'+round(showQ1(data_tab[name]))+'</td>');
                AJS.$('#tabela_kainos_plugin tbody .lbl_q2').append('<td>'+round(showQ2(data_tab[name]))+'</td>');
                AJS.$('#tabela_kainos_plugin tbody .lbl_q3').append('<td>'+round(showQ3(data_tab[name]))+'</td>');
                AJS.$('#tabela_kainos_plugin tbody .lbl_q4').append('<td>'+round(showQ4(data_tab[name]))+'</td>');
            }
        },
        error: function() {
            console.log("query error");
            alert("Wystapił błąd systemu, prosimy o kontakt z administracją.");
        },
        complete: function(){
            /* show table */
            //console.log('loading stop');
            AJS.$('#kainos_loading').hide();
            AJS.$('#kainos_content').show();
        },
    });
}


/**
 * Rounded with an accuracy 2 decimal places 
 *
 * @num double
 *
 * @return double 
 */
function round(num){
    return Math.round(num*100)/100; //return xx.xx
}

/**
 * Return max value from array
 *
 * @tab array
 *
 * @return double 
 */
function showMax(tab) {
    tab.sort(function(a, b) {
        return b - a
    });
    return tab[0];
}

/**
 * Return min value from array
 *
 * @tab array
 *
 * @return double 
 */
function showMin(tab) {
    tab.sort(function(a, b) {
        return a - b
    });
    return tab[0];
}

/**
 * Return quartile 1 from array
 *
 * @tab array
 *
 * @return double 
 */
function showQ1 (tab) {
    var pos = 0;

    var n = tab.length;
    tab.sort(function(a, b){return a-b});

    pos = Math.round(n*0.25);

    /*console.log("Q1");
    console.log(tab);
    console.log(pos);
    console.log(n);
    console.log("<<Q1");*/

    if(pos == 0){
        return tab[pos];
    }else{
        return tab[pos-1];
    }
    
}

/**
 * Return quartile 2 from array
 *
 * @tab array
 *
 * @return double 
 */
function showQ2 (tab) {
    var pos = 0;

    var n = tab.length;
    tab.sort(function(a, b){return a-b});

    pos = Math.round(n*0.5);

    /*console.log("Q2");
    console.log(tab);
    console.log(pos);
    console.log(n);
    console.log("<<Q2");*/

    if(pos == 0){
        return tab[pos];
    }else{
        return tab[pos-1];
    }
}

/**
 * Return quartile 3 from array
 *
 * @tab array
 *
 * @return double 
 */
function showQ3 (tab) {
    var pos = 0;

    var n = tab.length;
    tab.sort(function(a, b){return a-b});

    pos = Math.round(n*0.75);

    /*console.log("Q3");
    console.log(tab);
    console.log(pos);
    console.log(n);
    console.log("<<Q3");*/

    if(pos == 0){
        return tab[pos];
    }else{
        return tab[pos-1];
    }
}

/**
 * Return quartile 4 from array
 *
 * @tab array
 *
 * @return double 
 */
function showQ4(tab) {
    tab.sort(function(a, b) {
        return b - a
    });
    return tab[0];
}