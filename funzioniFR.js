//Variabili dell'applicazione
var Contatore = 0;
var OraIniziale = new Date();
var UltimaOra  = new Date();
var FrequenzaVariabile = 0.0;
var ListaValori = [];
var DifferenzaTempo = 0.0;
var SommaValori = 0.0;

function clickReset() {
    Contatore = 0;
    OraIniziale = new Date();
    UltimaOra  = new Date();
    FrequenzaVariabile = 0.0;
    ListaValori = [];
    DifferenzaTempo = 0.0;
    SommaValori = 0.0;

    //Azera l'etichetta nella pagina HTML
    elemento = document.getElementById("frequenzaIstantanea");
    elemento.value = "";

    //Azera l'etichetta nella pagina HTML
    elemento = document.getElementById("frequenzaMedia");
    elemento.value = "";
}


function clickPulsante() {
    //Variabile che conterrà la media dei valori
    var MediaValori = 0.0;

    //Aumenta il contatore dei cicli
    Contatore++;

    if(Contatore===1){
        OraIniziale = Date.now();
    }
    else {
        UltimaOra = Date.now();
        DifferenzaTempo = UltimaOra - OraIniziale;
        FrequenzaVariabile = (((Contatore-1) / (DifferenzaTempo/1000)) * 60);
        ListaValori.push(FrequenzaVariabile);

        //Somma i valori di frequenza calcolati
        SommaValori += FrequenzaVariabile;
        
        //Calcola la media delle frequenze
        MediaValori = SommaValori/(Contatore -1);

        //Mostra il risultato istantaneo nella pagina.
        elemento = document.getElementById("frequenzaIstantanea");
        elemento.value = Math.round(FrequenzaVariabile);

        //Mostra il risultato medio nella pagina.
        elemento = document.getElementById("frequenzaMedia");
        elemento.value = Math.round(MediaValori);
    }
}

//Funzione di supporto solo per mostrare i dati nella console in fase di sviluppo.
function mostraConsole() {
    console.log("Ora iniziale = " + OraIniziale);
    console.log("Ora ultima = " + UltimaOra);
    console.log("differenza tempo = " + DifferenzaTempo);
    console.log("Frequenza = " + FrequenzaVariabile);
    console.log("Lista valori = " + ListaValori);
    console.log("Somma valori = " + SommaValori);
    console.log("Contatore = " + Contatore);
}