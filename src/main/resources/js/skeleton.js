

$( document ).ready(function(){

	getIssues();

    $('#kainos_refresh').click(function(){
        getIssues();
    });

    $('#com.jiradev.jira.plugins.skeleton:statistic-panel-panel').click(function(){
        getIssues();
    });

});

function getIssues(){
    data_tab = [];
	$.ajax({
        type: "GET",
        dataType   : 'json',
        url: options['host'] + '/rest/api/2/search?jql=project%3D"'+options['project_name']+'"&startAt=0&maxResults=1000&expand=changelog',
        beforeSend: function(){
            console.log('loading start');
            $('#kainos_loading').show();
            $('#kainos_content').hide();
        },
        success: function(obj) {
            for(var i in obj.issues) {
            	console.log(obj.issues[i]);
            	var id = obj.issues[i].id;
            	var self = obj.issues[i].self;
            	var key = obj.issues[i].key;
                var created = Date.parse(obj.issues[i].fields.created);
                //$('#issues_list').append('<li>'+id+' '+self+' '+ key +' / '+ created +'</li>');
                //
                var status_time_form = created; 
                var histories = obj.issues[i].changelog.histories;
                for(var j in histories) {
                    var hist_id = histories[j].id;
                    //$('#issues_list').append('<li>'+hist_id+'</li>');
                    for(var k in histories[j].items){
                        var field = histories[j].items[k].field;
                        if(field == 'status'){
                            var status_form = histories[j].items[k].fromString;
                            var status_to = histories[j].items[k].toString;
                            var status_created = Date.parse(histories[j].created);
                            var status_time = status_created - status_time_form;
                            var status_time_form = status_created;
                            //$('#issues_list').append('<ol>'+hist_id+' '+field+' form '+status_form+' to '+ status_to +' on '+ (status_time/1000)/60 +'min</ol>');
                            //$('#issues_list').append('<ol>Type '+status_form+' // '+ (status_time/1000)/60 +'min</ol>');
                            if(!data_tab.hasOwnProperty(status_form)){
                                data_tab[status_form] = []
                            }
                            data_tab[status_form].push((status_time/1000)/60);
                        }
                    }
                }
                //
            	
                
            }
            //console.log(data_tab);
            //Table struct
            //thead
            $('#tabela_kainos_plugin thead').html('');
            $('#tabela_kainos_plugin thead').append('<tr></tr>');
            $('#tabela_kainos_plugin thead tr').append('<th>Type</th>');
            //tbody
            $('#tabela_kainos_plugin tbody').html('');
            $('#tabela_kainos_plugin tbody').append('<tr class="lbl_max"></tr>');
            $('#tabela_kainos_plugin tbody').append('<tr class="lbl_min"></tr>');
            $('#tabela_kainos_plugin tbody').append('<tr class="lbl_q1"></tr>');
            $('#tabela_kainos_plugin tbody').append('<tr class="lbl_q2"></tr>');
            $('#tabela_kainos_plugin tbody').append('<tr class="lbl_q3"></tr>');
            $('#tabela_kainos_plugin tbody').append('<tr class="lbl_q4"></tr>');
            $('#tabela_kainos_plugin tbody .lbl_max').append('<td>MAX</td>');
            $('#tabela_kainos_plugin tbody .lbl_min').append('<td>MIN</td>');
            $('#tabela_kainos_plugin tbody .lbl_q1').append('<td>Q1</td>');
            $('#tabela_kainos_plugin tbody .lbl_q2').append('<td>Q2</td>');
            $('#tabela_kainos_plugin tbody .lbl_q3').append('<td>Q3</td>');
            $('#tabela_kainos_plugin tbody .lbl_q4').append('<td>Q4</td>');
            //add data to table
            for(var name in data_tab){
                //thead
                $('#tabela_kainos_plugin thead tr').append('<th>'+name+'</th>');
                //tbody
                $('#tabela_kainos_plugin tbody .lbl_max').append('<td>'+Math.round(showMax(data_tab[name]))+'</td>');
                $('#tabela_kainos_plugin tbody .lbl_min').append('<td>'+Math.round(showMin(data_tab[name]))+'</td>');
                $('#tabela_kainos_plugin tbody .lbl_q1').append('<td>'+Math.round(showQ1(data_tab[name]))+'</td>');
                $('#tabela_kainos_plugin tbody .lbl_q2').append('<td>'+Math.round(showQ2(data_tab[name]))+'</td>');
                $('#tabela_kainos_plugin tbody .lbl_q3').append('<td>'+Math.round(showQ3(data_tab[name]))+'</td>');
                $('#tabela_kainos_plugin tbody .lbl_q4').append('<td>'+Math.round(showQ4(data_tab[name]))+'</td>');
            }
            //alert("Nie udało się zmienić danych, jeśli problem będzie się powtarzał prosimy o kontakt z administracją.");
        },
        error: function() {
                alert("Wystapił błąd systemu, prosimy o kontakt z administracją.");
        },
        complete: function(){
            console.log('loading stop');
            $('#kainos_loading').hide();
            $('#kainos_content').show();
        },
    });
}

/* pr0 el0 funkcje czarka */

function showMax(tab) {
tab.sort(function(a, b) {
return b - a
});
return tab[0];
}

function showMin(tab) {
tab.sort(function(a, b) {
return a - b
});
return tab[0];
}

function showQ1 (tab) {
var q1 = 0;
var positionq1;
var n = tab.length;
tab.sort(function(a, b){return a-b});
if (n % 2 == 0) {
positionq1 = (n + 1) * 0.25;
var positionq1int = parseInt(positionq1);
var leftover = ((positionq1 * 100) % 100) / 100;
q1 = (tab[positionq1int - 1] + (leftover * (tab[positionq1int] - tab[positionq1int - 1])));
return q1;
} else {
positionq1 = n * 0.25;
var positionq1int = parseInt(positionq1);
var leftover = ((positionq1 * 100) % 100) / 100;
q1 = (tab[positionq1int - 1] + (leftover * (tab[positionq1int] - tab[positionq1int - 1])));
return q1;
}
}


function showQ2(tab) {
var q2 = 0;
var positionq2;
var n = tab.length;
tab.sort(function(a, b) {
return a - b
});
if (n % 2 == 0) {
positionq2 = (n + 1) * 0.5;
var positionq2int = parseInt(positionq2);
var leftover = ((positionq2 * 100) % 100) / 100;
q2 = (tab[positionq2int - 1] + (leftover * (tab[positionq2int] - tab[positionq2int - 1])));
return q2;
} else {
positionq2 = n * 0.5;
var positionq2int = parseInt(positionq2);
var leftover = ((positionq2 * 100) % 100) / 100;
q2 = (tab[positionq2int - 1] + (leftover * (tab[positionq2int] - tab[positionq2int - 1])));
return q2;
}
}

function showQ3(tab) {
var q3 = 0;
var positionq3;
var n = tab.length;
tab.sort(function(a, b) {
return a - b
});
if (n % 2 == 0) {
positionq3 = (n + 1) * 0.75;
var positionq3int = parseInt(positionq3);
var leftover = ((positionq3 * 100) % 100) / 100;
q3 = (tab[positionq3int - 1] + (leftover * (tab[positionq3int] - tab[positionq3int - 1])));
return q3;
} else {
positionq3 = n * 0.75;
var positionq3int = parseInt(positionq3);
var leftover = ((positionq3 * 100) % 100) / 100;
q3 = (tab[positionq3int - 1] + (leftover * (tab[positionq3int] - tab[positionq3int - 1])));
return q3;
}
}

function showQ4(tab) {
tab.sort(function(a, b) {
return b - a
});
return tab[0];
}