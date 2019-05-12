var config = {
    apiKey: "AIzaSyAAe_cDwbvS-WSaoGmpwwDG49rYYvmOpe0",
    authDomain: "brincos-9f9fd.firebaseapp.com",
    databaseURL: "https://brincos-9f9fd.firebaseio.com",
    projectId: "brincos-9f9fd",
    storageBucket: "brincos-9f9fd.appspot.com",
    messagingSenderId: "226015777999"
};
firebase.initializeApp(config);

firebase.firestore().enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });

const db = firebase.firestore();
var loadingcal = true;
const forma = document.querySelector('#nuevocliente')
const receta = document.querySelector('#nuevareceta')
const recetas = document.querySelector('#recetas')
const clienteview = document.querySelector('#impresion')

const editar = document.querySelector('#editarcliente')
var folio = 1;
var cliente = {};
var previd = null;
var loadingcliente = true;
var loadingmain = true;

var eventos = []

function collect (){
	db.collection('clientes').onSnapshot(snapshot => {
	    let changes = snapshot.docChanges();
	    var contador = 0;
	    changes.forEach(change => {
	        if (change.type == 'added') {
	                var cal ={}
	                var cal2 = {}
	                
	                if (change.doc.data().proximacita != ''){
	                    cal.start=change.doc.data().proximacita
	                } else {
	                    cal.start = '1/1/1990'
	                }
    	            
    	            if (change.doc.data().proximacita != ''){
	                    cal.end = change.doc.data().proximacita
	                } else {
	                    cal.end = '1/1/1990'
	                }
	                
	                
	                if (change.doc.data().nuevafecha != undefined){
	                    console.log(change.doc.data().nuevafecha)
	                    cal2.start=change.doc.data().nuevafecha
	                    cal2.title=change.doc.data().nombre
        	            cal2.id=change.doc.id
	                } else {
	                    cal2.start = '1/1/1990'
	                }
    	            
    	            if (change.doc.data().nuevafecha != ''){
	                    cal2.end = change.doc.data().nuevafecha
	                } else {
	                    cal2.end = '1/1/1990'
	                }
    	            
    	            crearlista(change.doc)
    	            
    	            cal.title=change.doc.data().nombre
    	            cal.id=change.doc.id
    	            
    	            
    	            if( cal2 === undefined || cal2.length == 0 ){
    	                eventos.push(cal)
    	            } else {
    	                eventos.push(cal)
    	                eventos.push(cal2)
    	            }
    	            contador++
    	            $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('addEventSource', eventos);
                $('#calendar').fullCalendar('rerenderEvents');
	        } else if (change.type == 'removed') {
	            index = eventos.findIndex(x => x.id === change.doc.id);
	            eventos.splice(index, 1);
	            let li = ul.querySelector('[id="' + change.doc.id + '"]');
                ul.removeChild(li);
	            $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('addEventSource', eventos);
                $('#calendar').fullCalendar('rerenderEvents');
	        } else if (change.type == 'modified') {
	            index = eventos.findIndex(x => x.id === change.doc.id);
	            console.log(index)
	            eventos.splice(index, 1);
                
                var cal ={}
                var cal2 = {}
                
                if (change.doc.data().proximacita != ''){
                    cal.start=change.doc.data().proximacita
                } else {
                    cal.start = '1/1/1990'
                }
	            
	            if (change.doc.data().proximacita != ''){
                    cal.end = change.doc.data().proximacita
                } else {
                    cal.end = '1/1/1990'
                }
                
                
                if (change.doc.data().nuevafecha != undefined){
                    console.log(change.doc.data().nuevafecha)
                    cal2.start=change.doc.data().nuevafecha
                    cal2.title=change.doc.data().nombre
    	            cal2.id=change.doc.id
                } else {
                    cal2.start = '1/1/1990'
                }
	            
	            if (change.doc.data().nuevafecha != ''){
                    cal2.end = change.doc.data().nuevafecha
                } else {
                    cal2.end = '1/1/1990'
                }
	            
	            cal.title=change.doc.data().nombre
	            cal.id=change.doc.id
	            
	            
	            if( cal2 === undefined || cal2.length == 0 ){
	                eventos.push(cal)
	            } else {
	                eventos.push(cal)
	                eventos.push(cal2)
	            }
	            
	            $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('addEventSource', eventos);
                $('#calendar').fullCalendar('rerenderEvents');
	        }
	    });
	    crearcalendario()
	});
}



function modal(id){
    previd= id;
    $('.cliente').modal('show');
    var docRef = db.collection("clientes").doc(id);
    while (recetas.firstChild) {
        recetas.removeChild(recetas.firstChild);
    }
    docRef.get().then(function(doc) {
        if (doc.exists) {
            cliente = {
                nombre: doc.data().nombre,
                correo: doc.data().correo,
                sexo: doc.data().sexo,
                telefono: doc.data().telefono,
                edad: doc.data().edad,
                ocupacion: doc.data().ocupacion,
                direccion: doc.data().direccion,
                diabetes: doc.data().diabetes,
                hipertension: doc.data().hipertension,
                sinusitis: doc.data().sinusitis,
                dolordecabeza: doc.data().dolordecabeza,
                alergias: doc.data().alergias,
                cataratas: doc.data().cataratas,
                glaucoma: doc.data().glaucoma,
                ceguera: doc.data().ceguera,
                otro: doc.data().otro,
                dolorojos: doc.data().dolorojos,
                ojosllorosos: doc.data().ojosllorosos,
                comezon: doc.data().comezon,
                secresion: doc.data().secresion,
                traumatismo: doc.data().traumatismo,
                miodesopsia: doc.data().miodesopsia,
                anillos: doc.data().anillos,
                hipersensibilidad: doc.data().hipersensibilidad,
                sphod: doc.data().sphod,
                sphoi: doc.data().sphoi,
                cilod: doc.data().cilod,
                ciloi: doc.data().ciloi,
                ejeod: doc.data().ejeod,
                ejeoi: doc.data().ejeoi,
                addod: doc.data().addod,
                addoi: doc.data().addoi,
                diamod: doc.data().diamod,
                diamoi: doc.data().diamoi,
                alturaod: doc.data().alturaod,
                alturaoi: doc.data().alturaoi,
                xeratometriaoi: doc.data().xeratometriaoi,
                xeratometriaod: doc.data().xeratometriaod,
                proximacita: doc.data().proximacita,
                avscod: doc.data().avscod,
                avscoi: doc.data().avscoi,
                avceod: doc.data().avceod,
                avceoi: doc.data().avceoi,
                previacita: doc.data().fecha,
                ultimacita: doc.data().ultimacita,
                nota: doc.data().nota,
                ids: "Folio - " + id.substring(0, 4)
            };
            if (doc.data().nuevafecha == undefined){
                cliente.proximacita = doc.data().proximacita
            } else {
                cliente.proximacita = doc.data().nuevafecha
            }
            loadingcliente = false;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


    db.collection('clientes').doc(id).collection('recetas').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                createreceta(change.doc);
            } else if (change.type == 'removed') {
                let li = recetas.querySelector('[id="' + change.doc.id + '"]');
                recetas.removeChild(li);
            }
        });
    });

}

var cerrado = false;

function cerrar() {
    cerrado = true
    $('.cliente').modal('hide')
        $('.cliente').on('hidden.bs.modal', function() {
            if (cerrado == true) {
            $('.edit').modal('show')
            cerrado = false;
            }
        })


    $$.single("#nombrecliente").setAttribute("value", cliente.nombre)
    $$.single("#telefonocliente").setAttribute("value", cliente.telefono)
    $$.single("#correocliente").setAttribute("value", cliente.correo)
    $$.single("#direccioncliente").setAttribute("value", cliente.direccion)
    $$.single("#ocupacioncliente").setAttribute("value", cliente.ocupacion)
    $$.single("#edadcliente").setAttribute("value", cliente.edad)
    if (cliente.sexo == "Masculino") {
        $('#masculinocliente').prop('checked', true);
        $('#femeninocliente').prop('checked', false);
    } else {
        $('#femeninocliente').prop('checked', true);
        $('#masculinocliente').prop('checked', false);
    }

    if (cliente.diabetes == "<i class='fa fa-check'></i>") {
        $('#diabetescliente').prop('checked', true);
    } else {
        $('#diabetescliente').prop('checked', false);
    }

    if (cliente.hipertension == "<i class='fa fa-check'></i>") {
        $('#hipertensioncliente').prop('checked', true);
    } else {
        $('#hipertensioncliente').prop('checked', false);
    }

    if (cliente.sinusitis == "<i class='fa fa-check'></i>") {
        $('#sinusitiscliente').prop('checked', true);
    } else {
        $('#sinusitiscliente').prop('checked', false);
    }

    if (cliente.dolordecabeza == "<i class='fa fa-check'></i>") {
        $('#dolordecabezacliente').prop('checked', true);
    } else {
        $('#dolordecabezacliente').prop('checked', false);
    }

    if (cliente.alergias == "<i class='fa fa-check'></i>") {
        $('#alergiascliente').prop('checked', true);
    } else {
        $('#alergiascliente').prop('checked', false);
    }

    if (cliente.cataratas == "<i class='fa fa-check'></i>") {
        $('#cataratascliente').prop('checked', true);
    } else {
        $('#cataratascliente').prop('checked', false);
    }

    if (cliente.glaucoma == "<i class='fa fa-check'></i>") {
        $('#glaucomacliente').prop('checked', true);
    } else {
        $('#glaucomacliente').prop('checked', false);
    }

    if (cliente.ceguera == "<i class='fa fa-check'></i>") {
        $('#cegueracliente').prop('checked', true);
    } else {
        $('#cegueracliente').prop('checked', false);
    }


    $$.single("#otrocliente").setAttribute("value", cliente.otro)

    if (cliente.dolorojos == "<i class='fa fa-check'></i>") {
        $('#dolorojoscliente').prop('checked', true);
    } else {
        $('#dolorojoscliente').prop('checked', false);
    }

    if (cliente.ojosllorosos == "<i class='fa fa-check'></i>") {
        $('#ojosllorososcliente').prop('checked', true);
    } else {
        $('#ojosllorososcliente').prop('checked', false);
    }

    if (cliente.comezon == "<i class='fa fa-check'></i>") {
        $('#comezoncliente').prop('checked', true);
    } else {
        $('#comezoncliente').prop('checked', false);
    }

    if (cliente.secresion == "<i class='fa fa-check'></i>") {
        $('#secresioncliente').prop('checked', true);
    } else {
        $('#secresioncliente').prop('checked', false);
    }

    if (cliente.traumatismo == "<i class='fa fa-check'></i>") {
        $('#traumatismocliente').prop('checked', true);
    } else {
        $('#traumatismocliente').prop('checked', false);
    }

    if (cliente.miodesopsia == "<i class='fa fa-check'></i>") {
        $('#miodesopsiacliente').prop('checked', true);
    } else {
        $('#miodesopsiacliente').prop('checked', false);
    }

    if (cliente.anillos == "<i class='fa fa-check'></i>") {
        $('#anilloscliente').prop('checked', true);
    } else {
        $('#anilloscliente').prop('checked', false);
    }

    if (cliente.hipersensibilidad == "<i class='fa fa-check'></i>") {
        $('#hipersensibilidadcliente').prop('checked', true);
    } else {
        $('#hipersensibilidadcliente').prop('checked', false);
    }

    $$.single("#sphodcliente").setAttribute("value", cliente.sphod)

    $$.single("#cilodcliente").setAttribute("value", cliente.cilod)

    $$.single("#ejeodcliente").setAttribute("value", cliente.ejeod)

    $$.single("#addodcliente").setAttribute("value", cliente.addod)

    $$.single("#diamodcliente").setAttribute("value", cliente.diamod)

    $$.single("#alturaodcliente").setAttribute("value", cliente.alturaod)

    $$.single("#xeratometriaodcliente").setAttribute("value", cliente.xeratometriaod)


    $$.single("#sphoicliente").setAttribute("value", cliente.sphoi)

    $$.single("#ciloicliente").setAttribute("value", cliente.ciloi)

    $$.single("#ejeoicliente").setAttribute("value", cliente.ejeoi)

    $$.single("#addoicliente").setAttribute("value", cliente.addoi)

    $$.single("#diamoicliente").setAttribute("value", cliente.diamoi)

    $$.single("#alturaoicliente").setAttribute("value", cliente.alturaoi)

    $$.single("#xeratometriaoicliente").setAttribute("value", cliente.xeratometriaoi)

    $$.single("#avscodcliente").setAttribute("value", cliente.avscod)

    $$.single("#avscoicliente").setAttribute("value", cliente.avscoi)

    $$.single("#avceodcliente").setAttribute("value", cliente.avceod)

    $$.single("#avceoicliente").setAttribute("value", cliente.avceoi)

    $$.single("#datepickercliente").setAttribute("value", cliente.proximacita)

    $$.single("#notacliente").setAttribute("value", cliente.nota)

}

editar.addEventListener('submit', (e) => {
    e.preventDefault();
    var diabetes;
    var hipertension;
    var sinusitis;
    var dolordecabeza;
    var alergias;
    var cataratas;
    var glaucoma;
    var ceguera;
    var dolorojos;
    var ojosllorosos;
    var comezon;
    var secresion;
    var traumatismo;
    var miodesopsia;
    var anillos;
    var hipersensibilidad;

    var fechanueva = new Date();

    if (cliente.fecha == fechanueva.toDateString()) {
        fechanueva = cliente.fecha
    }

    if (editar.diabetescliente.checked) {
        diabetes = editar.diabetescliente.value
    } else {
        diabetes = "Diabetes:";
    }

    if (editar.hipertensioncliente.checked) {
        hipertension = editar.hipertensioncliente.value
    } else {
        hipertension = "Hipertensión:";
    }

    if (editar.sinusitiscliente.checked) {
        sinusitis = editar.sinusitiscliente.value
    } else {
        sinusitis = "Sinusitis:";
    }

    if (editar.dolordecabezacliente.checked) {
        dolordecabeza = editar.dolordecabezacliente.value
    } else {
        dolordecabeza = "Dolor de Cabeza:";
    }

    if (editar.alergiascliente.checked) {
        alergias = editar.alergiascliente.value
    } else {
        alergias = "Alergias:";
    }

    if (editar.cataratascliente.checked) {
        cataratas = editar.cataratascliente.value
    } else {
        cataratas = "Cataratas:";
    }

    if (editar.glaucomacliente.checked) {
        glaucoma = editar.glaucomacliente.value
    } else {
        glaucoma = "Glaucoma:";
    }

    if (editar.cegueracliente.checked) {
        ceguera = editar.cegueracliente.value
    } else {
        ceguera = "Ceguera:";
    }


    if (editar.dolorojoscliente.checked) {
        dolorojos = editar.dolorojoscliente.value
    } else {
        dolorojos = "Dolor de Ojos:";
    }

    if (editar.ojosllorososcliente.checked) {
        ojosllorosos = editar.ojosllorososcliente.value
    } else {
        ojosllorosos = "Ojos Llorosos:";
    }

    if (editar.comezoncliente.checked) {
        comezon = editar.comezoncliente.value
    } else {
        comezon = "Comezón:";
    }

    if (editar.secresioncliente.checked) {
        secresion = editar.secresioncliente.value
    } else {
        secresion = "Secresión:";
    }

    if (editar.traumatismocliente.checked) {
        traumatismo = editar.traumatismocliente.value
    } else {
        traumatismo = "Traumatismo:";
    }

    if (editar.miodesopsiacliente.checked) {
        miodesopsia = editar.miodesopsiacliente.value
    } else {
        miodesopsia = "Miodesopsia:";
    }

    if (editar.anilloscliente.checked) {
        anillos = foreditarma.anilloscliente.value
    } else {
        anillos = "Anillos o Halos:";
    }

    if (editar.hipersensibilidadcliente.checked) {
        hipersensibilidad = editar.hipersensibilidadcliente.value
    } else {
        hipersensibilidad = "Hipersensibilidad Solar:";
    }

    db.collection('clientes').doc(previd).update({
            nombre: editar.nombrecliente.value,
            telefono: editar.telefonocliente.value,
            correo: editar.correocliente.value,
            edad: editar.edadcliente.value,
            ocupacion: editar.ocupacioncliente.value,
            direccion: editar.direccioncliente.value,
            sexo: editar.sexocliente.value,
            diabetes: diabetes,
            hipertension: hipertension,
            sinusitis: sinusitis,
            dolordecabeza: dolordecabeza,
            alergias: alergias,
            cataratas: cataratas,
            glaucoma: glaucoma,
            ceguera: ceguera,
            otro: forma.otro.value,
            dolorojos: dolorojos,
            ojosllorosos: ojosllorosos,
            comezon: comezon,
            secresion: secresion,
            traumatismo: traumatismo,
            miodesopsia: miodesopsia,
            anillos: anillos,
            hipersensibilidad: hipersensibilidad,
            sphod: editar.sphodcliente.value,
            cilod: editar.cilodcliente.value,
            ejeod: editar.ejeodcliente.value,
            addod: editar.addodcliente.value,
            diamod: editar.diamodcliente.value,
            alturaod: editar.alturaodcliente.value,
            xeratometriaod: editar.xeratometriaodcliente.value,
            sphoi: editar.sphoicliente.value,
            ciloi: editar.ciloicliente.value,
            ejeoi: editar.ejeoicliente.value,
            addoi: editar.addoicliente.value,
            diamoi: editar.diamoicliente.value,
            alturaoi: editar.alturaoicliente.value,
            xeratometriaoi: editar.xeratometriaoicliente.value,
            avscod: editar.avscodcliente.value,
            avscoi: editar.avscoicliente.value,
            avceod: editar.avceodcliente.value,
            avceoi: editar.avceoicliente.value,
            proximacita: editar.proximacitacliente.value,
            nota: editar.notacliente.value,
            ultimacita: editar.ultimacitacliente.value
        })
        .then(function() {
            console.log("Document successfully written!");
            editar.reset()
            $("#clienteactualizado").show(200);
            $("#clienteactualizado").hide(5500);
            $("[data-dismiss=modal]").trigger({
                type: "click"
            });
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#actualizarerror").show(200);
            $("#actualizarerror").hide(5500);
        });
})


receta.addEventListener('submit', (e) => {
    e.preventDefault();
var fecha = new Date();
id = fecha.toDateString()
console.log(id)
    db.collection('clientes').doc(previd).collection('recetas').add({
            sphod: receta.sphodreceta.value,
            cilod: receta.cilodreceta.value,
            ejeod: receta.ejeodreceta.value,
            addod: receta.addodreceta.value,
            diamod: receta.diamodreceta.value,
            alturaod: receta.alturaodreceta.value,
            xeratometriaod: receta.xeratometriaodreceta.value,
            sphoi: receta.sphoireceta.value,
            ciloi: receta.ciloireceta.value,
            ejeoi: receta.ejeoireceta.value,
            addoi: receta.addoireceta.value,
            diamoi: receta.diamoireceta.value,
            alturaoi: receta.alturaoireceta.value,
            xeratometriaoi: receta.xeratometriaoireceta.value,
            avscod: receta.avscodreceta.value,
            avscoi: receta.avscoireceta.value,
            avceod: receta.avceodreceta.value,
            avceoi: receta.avceoireceta.value,
            fecha: id
        })
        .then(function() {
            console.log("Document successfully written!");
            receta.reset()
            $("#clienteactualizado").show(200);
            $("#clienteactualizado").hide(5500);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#actualizarerror").show(200);
            $("#actualizarerror").hide(5500);
        });
});

function nuevacita(){
    $('.nuevacita').modal('show');
    
}

const ul = document.querySelector('#clientesselect')

function crearlista(doc){
    var li = document.createElement('li')
    li.innerText = doc.data().nombre
    li.setAttribute('id', doc.id)
    li.setAttribute('class', 'list-group-item')
    li.setAttribute('onClick', 'guardarcita(this.id)')
    ul.appendChild(li);
}

const formanuevacita = document.querySelector('#nuevacitaform')
var idcita = null;

function guardarcita(id){
    var li = document.getElementById(id);
    li.setAttribute('style', 'background-color:#50b662; color:white')
    idcita = id;
}


formanuevacita.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(formanuevacita.nuevafecha.value)
    
    
    db.collection('clientes').doc(idcita).update({
            nuevafecha:formanuevacita.nuevafecha.value
        })
        .then(function() {
            console.log("Document successfully written!");
            formanuevacita.reset()
            $("#citaok").show(200);
            $("#citaok").hide(5500);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    
    
});




function createreceta(doc) {
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let trod = document.createElement('tr');
    let troi = document.createElement('tr');

    let row = document.createElement('div')
    let rowbotones = document.createElement('div')

    row.setAttribute('class', 'row')
    rowbotones.setAttribute('class', 'row')

    let colimprimir = document.createElement('div')
    colimprimir.setAttribute('class','col-md-2')

    let coleditar = document.createElement('div')
    coleditar.setAttribute('class','col-md-2 offset-md-8')

    let thead = document.createElement('thead');
    let thempy = document.createElement('th');
    let sph = document.createElement('th');
    let cil = document.createElement('th');
    let eje = document.createElement('th');
    let add = document.createElement('th');
    let diam = document.createElement('th');
    let altura = document.createElement('th');
    let avsc = document.createElement('th');
    let avce = document.createElement('th');
    let quera = document.createElement('th');

    let imprimir = document.createElement('button')
    let editar = document.createElement('button')
    let col = document.createElement('div');
    let pfecha = document.createElement('p');

    let tbody = document.createElement('tbody');
    let od = document.createElement('th');
    let oi = document.createElement('th');

    let sphod = document.createElement('th');
    let sphoi = document.createElement('th');

    let cilod = document.createElement('th');
    let ciloi = document.createElement('th');

    let ejeod = document.createElement('th');
    let ejeoi = document.createElement('th');

    let addod = document.createElement('th');
    let addoi = document.createElement('th');

    let diamod = document.createElement('th');
    let diamoi = document.createElement('th');

    let alturaod = document.createElement('th');
    let alturaoi = document.createElement('th');

    let avscod = document.createElement('th');
    let avscoi = document.createElement('th');

    let avceod = document.createElement('th');
    let avceoi = document.createElement('th');

    let queraod = document.createElement('th');
    let queraoi = document.createElement('th');

    let destroy = document.createElement('div')

    col.setAttribute('class', 'col col-md-12');
    pfecha.innerText = doc.data().fecha
    destroy.setAttribute('id', doc.id)

    table.setAttribute('class', 'table table-striped');

    thempy.innerText=''
    sph.innerText = 'SPH';
    cil.innerText='CIL';
    eje.innerText='EJE';
    add.innerText='ADD';
    diam.innerText='DIAM';
    altura.innerText='ALTURA';
    avsc.innerText='AVSC';
    avce.innerText='AVCE';
    quera.innerText='QUERATOMETRIA';

    sph.setAttribute('style', 'text-align:center')
    cil.setAttribute('style', 'text-align:center')
    eje.setAttribute('style', 'text-align:center')
    add.setAttribute('style', 'text-align:center')
    diam.setAttribute('style', 'text-align:center')
    altura.setAttribute('style', 'text-align:center')
    avsc.setAttribute('style', 'text-align:center')
    avce.setAttribute('style', 'text-align:center')
    quera.setAttribute('style', 'text-align:center')

    sphod.setAttribute('style', 'text-align:center')
    cilod.setAttribute('style', 'text-align:center')
    ejeod.setAttribute('style', 'text-align:center')
    addod.setAttribute('style', 'text-align:center')
    diamod.setAttribute('style', 'text-align:center')
    alturaod.setAttribute('style', 'text-align:center')
    avscod.setAttribute('style', 'text-align:center')
    avceod.setAttribute('style', 'text-align:center')
    queraod.setAttribute('style', 'text-align:center')

    sphoi.setAttribute('style', 'text-align:center')
    ciloi.setAttribute('style', 'text-align:center')
    ejeoi.setAttribute('style', 'text-align:center')
    addoi.setAttribute('style', 'text-align:center')
    diamoi.setAttribute('style', 'text-align:center')
    alturaoi.setAttribute('style', 'text-align:center')
    avscoi.setAttribute('style', 'text-align:center')
    avceoi.setAttribute('style', 'text-align:center')
    queraoi.setAttribute('style', 'text-align:center')


    od.innerText='OD'
    oi.innerText='OI'

    cilod.innerText = doc.data().cilod
    ciloi.innerText = doc.data().ciloi

    ejeod.innerText = doc.data().ejeod
    ejeoi.innerText = doc.data().ejeoi

    addod.innerText = doc.data().addod
    addoi.innerText = doc.data().addoi

    diamod.innerText = doc.data().diamod
    diamoi.innerText = doc.data().diamoi

    alturaod.innerText=doc.data().alturaod
    alturaoi.innerText = doc.data().alturaoi

    avscod.innerText = doc.data().avscod
    avscoi.innerText = doc.data().avscoi

    avceod.innerText = doc.data().avceod
    avceoi.innerText = doc.data().avceoi

    queraod.innerText = doc.data().xeratometriaod;
    queraoi.innerText = doc.data().xeratometriaoi;

    sphod.innerText=doc.data().sphod
    sphoi.innerText=doc.data().sphoi

    let parameter = "imprimirreceta('#"+doc.id+"')"
    console.log(parameter)
    
    let parameterborrar = "borrarreceta('"+doc.id+"')"

    rowbotones.setAttribute('style','margin-bottom:32px')
    imprimir.setAttribute('type','button')
    imprimir.setAttribute('onClick',parameter)
    imprimir.setAttribute('class','btn btn-primary btn-sm')
    rowbotones.setAttribute('data-html2canvas-ignore', 'true')
    imprimir.innerText="Imprimir"

    editar.setAttribute('type','button')
    editar.setAttribute('onClick',parameterborrar)
    editar.setAttribute('class','btn btn-danger btn-sm')
    editar.innerText="Borrar"
    // imprimir.innerHTML = '<button type="button" onClick="imprimir(#'+doc.id+')" class="btn btn-primary btn-sm">Imprimir</button>'


    recetas.appendChild(destroy);
    destroy.appendChild(col);
    col.appendChild(pfecha);
    row.appendChild(table);
    destroy.appendChild(row);

    table.appendChild(thead);
    table.appendChild(tbody);

    thead.appendChild(tr);
    tr.appendChild(thempy);
    tr.appendChild(sph);
    tr.appendChild(cil);
    tr.appendChild(eje);
    tr.appendChild(add);
    tr.appendChild(diam);
    tr.appendChild(altura);
    tr.appendChild(avsc);
    tr.appendChild(avce);
    tr.appendChild(quera);

    tbody.appendChild(trod);
    tbody.appendChild(troi);
    trod.appendChild(od);
    trod.appendChild(sphod);
    trod.appendChild(cilod)
    trod.appendChild(ejeod)
    trod.appendChild(addod)
    trod.appendChild(diamod)
    trod.appendChild(alturaod)
    trod.appendChild(avscod)
    trod.appendChild(avceod)
    trod.appendChild(queraod)

    troi.appendChild(oi);
    troi.appendChild(sphoi);
    troi.appendChild(ciloi)
    troi.appendChild(ejeoi)
    troi.appendChild(addoi)
    troi.appendChild(diamoi)
    troi.appendChild(alturaoi)
    troi.appendChild(avscoi)
    troi.appendChild(avceoi)
    troi.appendChild(queraoi)
    
    rowbotones.appendChild(coleditar)
    rowbotones.appendChild(colimprimir)
    colimprimir.appendChild(imprimir)
    coleditar.appendChild(editar)
    
    destroy.appendChild(rowbotones)
}


forma.addEventListener('submit', (e) => {
    e.preventDefault();
    var fecha = new Date()
    var diabetes;
    var hipertension;
    var sinusitis;
    var dolordecabeza;
    var alergias;
    var cataratas;
    var glaucoma;
    var ceguera;
    var dolorojos;
    var ojosllorosos;
    var comezon;
    var secresion;
    var traumatismo;
    var miodesopsia;
    var anillos;
    var hipersensibilidad;


    if (forma.diabetes.checked) {
        diabetes = forma.diabetes.value
    } else {
        diabetes = "Diabetes:";
    }

    if (forma.hipertension.checked) {
        hipertension = forma.hipertension.value
    } else {
        hipertension = "Hipertensión:";
    }

    if (forma.sinusitis.checked) {
        sinusitis = forma.sinusitis.value
    } else {
        sinusitis = "Sinusitis:";
    }

    if (forma.dolordecabeza.checked) {
        dolordecabeza = forma.dolordecabeza.value
    } else {
        dolordecabeza = "Dolor de Cabeza:";
    }

    if (forma.alergias.checked) {
        alergias = forma.alergias.value
    } else {
        alergias = "Alergias:";
    }

    if (forma.cataratas.checked) {
        cataratas = forma.cataratas.value
    } else {
        cataratas = "Cataratas:";
    }

    if (forma.glaucoma.checked) {
        glaucoma = forma.glaucoma.value
    } else {
        glaucoma = "Glaucoma:";
    }

    if (forma.ceguera.checked) {
        ceguera = forma.ceguera.value
    } else {
        ceguera = "Ceguera:";
    }

    if (forma.dolorojos.checked) {
        dolorojos = forma.dolorojos.value
    } else {
        dolorojos = "Dolor de Ojos:";
    }

    if (forma.ojosllorosos.checked) {
        ojosllorosos = forma.ojosllorosos.value
    } else {
        ojosllorosos = "Ojos Llorosos:";
    }

    if (forma.comezon.checked) {
        comezon = forma.comezon.value
    } else {
        comezon = "Comezón:";
    }

    if (forma.secresion.checked) {
        secresion = forma.secresion.value
    } else {
        secresion = "Secresión:";
    }

    if (forma.traumatismo.checked) {
        traumatismo = forma.traumatismo.value
    } else {
        traumatismo = "Traumatismo:";
    }

    if (forma.miodesopsia.checked) {
        miodesopsia = forma.miodesopsia.value
    } else {
        miodesopsia = "Miodesopsia:";
    }

    if (forma.anillos.checked) {
        anillos = forma.anillos.value
    } else {
        anillos = "Anillos o Halos:";
    }

    if (forma.hipersensibilidad.checked) {
        hipersensibilidad = forma.hipersensibilidad.value
    } else {
        hipersensibilidad = "Hipersensibilidad Solar:";
    }

    db.collection('clientes').add({
            nombre: forma.nombre.value,
            telefono: forma.telefono.value,
            correo: forma.correo.value,
            folio: folio,
            edad: forma.edad.value,
            ocupacion: forma.ocupacion.value,
            direccion: forma.direccion.value,
            sexo: forma.sexo.value,
            diabetes: diabetes,
            hipertension: hipertension,
            sinusitis: sinusitis,
            dolordecabeza: dolordecabeza,
            alergias: alergias,
            cataratas: cataratas,
            glaucoma: glaucoma,
            ceguera: ceguera,
            otro: forma.otro.value,
            dolorojos: dolorojos,
            ojosllorosos: ojosllorosos,
            comezon: comezon,
            secresion: secresion,
            traumatismo: traumatismo,
            miodesopsia: miodesopsia,
            anillos: anillos,
            hipersensibilidad: hipersensibilidad,
            sphod: forma.sphod.value,
            cilod: forma.cilod.value,
            ejeod: forma.ejeod.value,
            addod: forma.addod.value,
            diamod: forma.diamod.value,
            alturaod: forma.alturaod.value,
            xeratometriaod: forma.xeratometriaod.value,
            sphoi: forma.sphoi.value,
            ciloi: forma.ciloi.value,
            ejeoi: forma.ejeoi.value,
            addoi: forma.addoi.value,
            diamoi: forma.diamoi.value,
            alturaoi: forma.alturaoi.value,
            xeratometriaoi: forma.xeratometriaoi.value,
            ultimacita: forma.proximacita.value,
            avscod: forma.avscod.value,
            avscoi: forma.avscoi.value,
            avceod: forma.avceod.value,
            avceoi: forma.avceoi.value,
            nota: forma.nota.value,
            fecha: fecha.toDateString()
        })
        .then(function() {
            console.log("Document successfully written!");
            forma.reset()
            $("#clienteregistrado").show(200);
            $("#clienteregistrado").hide(5500);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#alertaerror").show(200);
            $("#alertaerror").hide(5500);
        });
})

var cliente = {};


var loadingevento = true;
var previd=null;

function crearcalendario () {
    loadingcal = false;
      var fecha = new Date()

     //===== Full Calendar =====//
     if ($.isFunction($.fn.fullCalendar)) {
         $('#calendar').fullCalendar({
             header: {
                 left: 'prev',
                 center: 'title',
                 right: 'next'
             },
             height: 530,
             displayEventTime: false,
             defaultDate: fecha.toDateString(),
             editable: true,
             eventLimit: false,
             eventClick: function(info) {
                 modal(info.id);
             },
             events: eventos
         });
     }

};

function sendmail() {
    
    if (cliente.correo != ''){
        $("[data-dismiss=modal]").trigger({
            type: "click"
        });
        
        smalltalk
            .prompt('Contactando a ' + cliente.nombre, 'Escribe tu mensaje', '', {
                buttons: {
                    ok: 'Enviar',
                    cancel: 'Cancelar',
                }
            })
            .then((value) => {
                Email.send({
                    Host: "mail.opticazeiss.com",
                    Username: "contacto@opticazeiss.com",
                    Password: "0pticaZe1ss",
                    To: cliente.correo,
                    From: "contacto@opticazeiss.com",
                    Subject: "Contacto - Optica Zeiss",
                    Body: value
                }).then(
                    message => alert("Correo Enviado")
                );
            })
            .catch(() => {
                console.log('cancel');
            });
    } else {
        alert("el Cliente no cuenta con correo electrónico")
    }
}

function imprimir(id) {
    const filename = cliente.nombre + '-' + previd.substring(0, 4) + '.pdf';
    var height = $(id).height();
    var width = $(id).width();

    html2canvas(document.querySelector(id), {
        scale: 1
    }).then(canvas => {
        let pdf = new jsPDF('1', 'mm', 'letter');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 8,195,265);
        pdf.save(filename);
    });

    $("#pdfguardado").show(2000);
    $("#pdfguardado").hide(4000);
}

function imprimirreceta(id) {
    console.log(id)
    const filename = cliente.nombre + '- receta - ' + previd.substring(0, 4) + '.pdf';
    var height = $(id).height();
    var width = $(id).width();
    height -= height *0.38
    width -= width *0.19

    html2canvas(document.querySelector(id), {
        scale: 1
    }).then(canvas => {
        let pdf = new jsPDF('1', 'mm', 'letter');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 8, 8);
        pdf.save(filename);
    });


    $("#pdfguardado").show(2000);
    $("#pdfguardado").hide(4000);
}

function borrarcliente() {
    if (confirm("¿Quieres borrar a este cliente?")) {
        db.collection('clientes').doc(previd).delete();
        $("[data-dismiss=modal]").trigger({
            type: "click"
        });
    }
}

function borrarreceta(id) {
    if (confirm("¿Quieres borrar esta receta?")) {
        db.collection('clientes').doc(previd).collection('recetas').doc(id).delete();
        $("[data-dismiss=modal]").trigger({
            type: "click"
        });
    }
}



$.extend($.expr[":"], {
"containsIN": function(elem, i, match, array) {
return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
}
});
function buscar(query) {
    $('#clientesselect li:not(:containsIN("' + query + '"))').hide();
}

var searchbar = document.getElementById("search");
searchbar.onkeyup = function(e) {
    var busqueda = this.value;
    if (e.keyCode == 8) {
        $('#clientesselect > li').each(function() {
            $(this).show()
        });
        buscar(busqueda);
    } else {
        if (busqueda !== "") {
            buscar(busqueda);
        } else {
            console.log("Empty")
            $('#clientesselect > li').each(function() {
                $(this).show()
            });
        }
    }


}


// Create a var for Display.JS. You don't have to add the $ var, you can change the name.
var $$ = new DisplayJS(window);
$$.ready(function () {
    collect()
})
// Will render the var once
$$.var(10);