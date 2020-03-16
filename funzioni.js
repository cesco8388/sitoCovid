//Variabili globali per l'applicazione
var primoPunto = null;
var secondoPunto = null;
var terzoPunto = null;
var delta1 = null;
var delta2 = null;
const lod = 2;
var url = null;
var treOre = false;
var altoRischio = false;
var ecg = false;

//funzione per il pulsante di annullamento del valore inserito
function annullaPunto(stringa)
{
    //recupera il campo da annullare in base all'ID
    var elemento = document.getElementById(stringa);

    //Non so se sia il caso di rimuovere questa condizione e far annullare sempre il valore inserito
    //controlla se il valore inserire non è nullo
    if(elemento.value !== null)
    {
        //annulla il valore inserito nell'HTML
        elemento.value = null;
        
        //Annullamento anche delle variabili del programma (sia valori dei punti, sia valori dei delta)
        if(stringa==="1punto")
        {
            primoPunto = null;
            delta1=null;
            delta2=null;
        }
        else if(stringa==="2punto")
        {
            secondoPunto = null;
            delta1=null;
        }
        else if(stringa==="3punto")
        {
            terzoPunto = null;
            delta2 = null;
        }

        //Mostra i delta nella pagina HTML
        mostraDelta();
    }
}

//funzione per il controllo del valore inserito dall'utente
function uscitaForm(stringa)
{
    var elemento = document.getElementById(stringa);
    var controlloNumero = !isNaN(elemento.value);
    
    //Controlla che il testo inserito nella form sia un numero
    if(!controlloNumero)
    {
        alert("Inserire un numero!");
        annullaPunto(stringa);
    }
    else
    {
        //Controlla che il numero inserito sia un numero maggiore di 0
        if(elemento.value <0 || elemento.value === null || elemento.value === "")
        {
            if(elemento.value <0)
            {
                alert("inserire un numero maggiore di 0!");
            }
            annullaPunto(stringa);
        }
        else
        {
            if(stringa==="1punto")
            {
                primoPunto = elemento.value;
            }
            else if(stringa==="2punto")
            {
                secondoPunto = elemento.value;
            }
            else if(stringa==="3punto")
            {
                terzoPunto = elemento.value;
            }
            calcolaDelta();
        }
    }
    mostraDelta();
}

//funzione per calcolare i delta, in base ai valori dei punti
function calcolaDelta()
{
    if(primoPunto!==null)
    {
        if(secondoPunto!==null)
        {
            delta1=secondoPunto - primoPunto;
        }
        if(terzoPunto!==null)
        {
            delta2 = terzoPunto - primoPunto;
        }
    }
}

//Funzione per mostrare i valori dei delta sulla pagina
function mostraDelta()
{
    var elemento = document.getElementById("delta1");
    if(delta1===null)
    {
        elemento.value = "";
    }
    else
    {
        elemento.value = delta1;
    }
    
    elemento = document.getElementById("delta2");
    if(delta2===null)
    {
        elemento.value = "";
    }
    else
    {
        elemento.value = delta2;
    }

    //Istruzioni per mostrare i risultati nella console (in teoria solo di supporto)
    /*
        console.log("1° punto: ",primoPunto);
        console.log("2° punto: ",secondoPunto);
        console.log("3° punto: ",terzoPunto);
        console.log("delta 1: ",delta1);
        console.log("delta 2: ",delta2);
    */
}

//Funzione di gestione della selezione delle caselle di spunta
function gestoreClick(elemento)
{
    //in base al valore attuale viene segnata come spuntata o meno la checkBox
    if(elemento.checked === false)
    {
        elemento.checked === true;
    }
    else
    {
        elemento.checked === true;
    }

    //console.log(elemento.name + " " + elemento.checked);
}

//Funzione che calcola il valore dell'URL in base al genere
function calcoloURL()
{
    //Variabile contenente il valore del genere del paziente
    var genere = document.getElementsByName("genere");

    //attribuzione del valore di URL in base al genere del paziente
    if(genere[0].checked)
    {
        url = 20;
    }
    else if(genere[1].checked)
    {
        url = 12;
    }
    else
    {
        url = null;
    }
}

//Funzione di calcolo delle variabili della situazione (valori selezionati nelle checkBox)
function calcoloValoriCheckbox()
{
    treOre = controlloCheckbox("3ore");
    altoRischio = controlloCheckbox("Rischio");
    ecg = controlloCheckbox("ECG");

    /*
    console.log("3ore: ", treOre);
    console.log("altoRischio: ", altoRischio);
    console.log("ECG: ", ecg);
    */
}

//Funzione di supporto per il controllo dei valori delle chackBox
function controlloCheckbox(nomeCheckbox)
{
    //Controlla se la checkBox è spuntata
    if(document.getElementById(nomeCheckbox).checked)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//Funzione di analisi (al suo interno ci sono tutte le varie funzioni necessarie)
function analisiPunti()
{
    //salva elemento HTML dove mostrare il risultato dell'analisi
    var risultato = document.getElementById("risultato");

    //Variabile contenente la stringa risultato dell'analisi
    var valoreRisultato = ""

    //Calcolo dell'URL in base al genere del paziente
    calcoloURL();
   
    //calcolo delle variabili della situazione (valori selezionati nelle checkBox)
    calcoloValoriCheckbox();

    //Controlla che sia stato specificato il genere del paziente
    if(url!==null)
    {
        //Viene eseguito l'algoritmo di analisi dei punti di troponina
        valoreRisultato = algoritmoAnalisi();
    }
    else
    {
        //Non è stato specificato il genere del paziente
        valoreRisultato = "Specificare il GENERE del paziente! (serve per calcolare l'URL della troponina)"
    }

    //Mostra risultato nella pagina HTML
    risultato.value = valoreRisultato;
}

//Funzione analisi dei punti di troponina
function algoritmoAnalisi()
{
    //Verifica la presenza del 1° Punto
    if(primoPunto !== null)
    {
        //Verifica se supera criterio IMA Acuto
        if(primoPunto >= 100) //Then
        {
            //Rule In = IMA Acuto
            return "Rule-In = IMA Acuto (Troponina maggiore o uguale a 100 ng/L";
        }
        else
        {
            //Verifica se possibile Rule-Out con 1 solo punto
            if(!altoRischio && ecg && treOre && primoPunto <= lod)//Then
            {
                //Rule-Out con un solo punto
                return "Rule-Out (Dolore da più di 3 ore; ECG non significativo; Troponina inferiore o uguale al livello di rilevazione)";
            }
            else
            {
                //Verifica la presenza del 2° Punto
                if(secondoPunto !== null)//Then
                {
                    //Verifica se 1° punto maggiore o minore dell'URL
                    if(primoPunto <= url)//Then
                    {
                        //Ramo 1° Punto minore/uguale dell'URL
                        //Valutazione del possibile Rule-In
                        if((secondoPunto > url) && (delta1 > 0.5 * url))//Then
                        {
                            //Rule-In perchè superamento dell'URL e delta positivo
                            return "Rule-In = Danno miocardico acuto (URL superato in 1 punto con Delta significativo)";
                        }
                        else
                        {
                            //Controllo se possibile Rule-Out per assenza di Delta positivo e non superamento dell'URL
                            if((secondoPunto <= url && (delta1 > 0.5 * url)) || (secondoPunto > url) || (altoRischio) )//Then
                            {
                                //Verifica la presenza del 3° Punto
                                if(terzoPunto!==null)//Then
                                {
                                    //Verifica se 2° punto maggiore o minore dell'URL
                                    if(secondoPunto <= url)//Then
                                    {
                                        //Ramo 2° Punto minore o uguale dell'URL
                                        //Valutazione del possibile Rule-In
                                        if(terzoPunto > url && (delta2 > 0.5 * url))//Then
                                        {
                                            //Rule-In perchè superamento dell'URL e delta positivo
                                            return "Rule-In = Danno miocardico acuto (URL superato in 1 punto con Delta significativo)";
                                        }
                                        else
                                        {
                                            if(((terzoPunto <= url) && (delta2 > 0.5 * url)) || (terzoPunto > url) || (altoRischio))//Then
                                            {
                                                //Zona di grigio
                                                return "Zona di grigio = NON Rule-In, NON Rule-Out";
                                            }
                                            else
                                            {
                                                //Rule-out dopo 3° punto
                                                return "Rule-Out (anche il 3° punto non supera l'URL e il Delta non è significativo, e non c'è rischio clinico)";
                                            }
                                        }
                                    }
                                    else
                                    {
                                        //Ramo 2° Punto Maggiore dell'URL
                                        //Verifica del Rule-In al 3° Punto
                                        if((terzoPunto > url) && (delta2 > 0.2 * primoPunto))//Then
                                        {
                                            //Rule-In perchè superamento dell'URL (per 3 volte) e delta significativo
                                            return "Rule-In = Danno miocardico acuto (URL superato in 2 punti con Delta significativo)";
                                        }
                                        else
                                        {
                                            //Verifica possibilità di Rule-Out
                                            if((terzoPunto > url) || (altoRischio))//Then
                                            {
                                                //Zona grigia
                                                return "Zona di grigio = NON Rule-In, NON Rule-Out";
                                            }
                                            else
                                            {
                                                //Rule-Out perchè il 3° punto è sceso sotto l'URL
                                                return "Rule-Out (il 3° Punto è sceso sotto l'URL, e non c'è rischio clinico";
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    //Manca il 3° punto
                                    return "Fare il 3° Punto";
                                }
                            }
                            else
                            {
                                //Rule-out dopo 2° punto
                                return "Rule-Out (anche il 2° punto non supera l'URL e il Delta non è significativo, e non c'è rischio clinico)";
                            }
                        }
                    }
                    else
                    {
                        //Ramo 1° Punto maggiore dell'URL
                        if(secondoPunto > url && delta1 > 0.2 * primoPunto)//Then
                        {
                            //Rule-In perchè superamento dell'URL (per 2 volte) e delta significativo
                            return "Rule-In = Danno miocardico acuto (URL superato in 2 punti con Delta significativo)";
                        }
                        else
                        {
                            //Verifica se possibile Rule-Out perchè 2° punto sceso sotto URL
                            if((secondoPunto > url) || (altoRischio))//Then
                            {
                                //Verifica la presenza del 3° Punto
                                if(terzoPunto!==null)//Then
                                {
                                    //Ramo in cui il 1° punto e il 2° punto sono maggiori dell'URL ma il denta non è significativo
                                    if(terzoPunto > url && delta2 > 0.2 * primoPunto)//Then
                                    {
                                        //Rule-In perchè superamento dell'URL (per 3 volte) e delta significativo
                                        return "Rule-In = Danno miocardico acuto (URL superato in 3 punti con Delta significativo)";
                                    }
                                    else
                                    {
                                        //Verifica se possibile Rule-Out perchè 3° punto sceso sotto URL
                                        if((terzoPunto > url) || (altoRischio))//Then
                                        {
                                            //Zona di grigio
                                            return "Zona di grigio = NON Rule-In, NON Rule-Out";
                                        }
                                        else
                                        {
                                            //Rule-Out perchè il 3° punto è sceso sotto l'URL
                                            return "Rule-Out (il 3° punto è sceso sotto l'URL, e non c'è rischio clinico)";
                                        }
                                    }
                                }
                                else
                                {
                                    //Manca il 3° punto
                                    return "Fare il 3° Punto";
                                }
                            }
                            else
                            {
                                //Rule-Out perchè il 2° punto è sceso sotto l'URL
                                return "Rule-Out (il 2° punto è sceso sotto l'URL)";
                            }
                        }
                        
                    }
                }
                else
                {
                    //Manca il 2° punto
                    return "Fare il 2° Punto";
                }
            }
        }
    }
    else
    {
        //Manca il 1° punto
        return "Fare il 1° Punto";
    }
}