//La forma de conectar javascript con los elementos de la pagina HTML es a través de document (DOM: Document Object Model)
//document permite trabajar con varios metodos en este caso querySelector donde yo paso el nombre de una etiqueta
//y lo extraigo y se lo asigno a titulo que es un objeto.
//Los eventos empiezan con on y cuando esperan despues de un = con comillas, se puede poner codigo de javascript


//Variables globales
let numeroSecreto=0;
let intentos=0;
let listaNumerosSorteados=[];
let numeroMaximo=10;
let listaVacia=[];
let lenguajesDeProgramacion=['JavaScript', 'C', 'C++', 'Kotlin', 'Python'];
lenguajesDeProgramacion.push('Java');
lenguajesDeProgramacion.push('Ruby');
lenguajesDeProgramacion.push('GoLang');
mostrarLenguajes();
mostrarLenguajesInverso();
let listaNumeros=[1,2,3];
let listaNumeros2=[4,5,6];
console.log(sumaLista(listaNumeros));
console.log(calcularPromedioLista(listaNumeros));
console.log(pequenhoYGrandeLista(listaNumeros));
console.log(devolverPos(1,listaNumeros));
console.log(devolverPos(10,listaNumeros));
let listaNueva=fusionarListas(listaNumeros,listaNumeros2);
console.log(listaNueva);
let listaCuadrados=elevarLista(listaNumeros);
console.log(listaCuadrados);

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); //h1 es headingElement
    elementoHTML.innerHTML=texto;
    return; //Buena practica, pese a ser un void
}

//Los inputs tienen distintos atributos (Ej: Un formulario)
//getElementbyId para obtener el objeto (el input que tenga el id correspondiente)
//y el .value para acceder al valor de este
//En el HTML ya se configuro para que en la interfaz el usuario solo coloque numeros
//pero igualmente al colocarlo se lee como string
//Triple igual para que sea igual en tipo y en valor
function verificarIntento(){
    let numeroDeUsuario=parseInt(document.getElementById('valorUsuario').value);

    if(numeroDeUsuario===numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos==1)?'vez':'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{ //El usuario no acerto
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor');
        }else{
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//Con el # se le indica a querySelector que se quiere encontrar el input usando el ID
//'' para indicar caja vacia
function limpiarCaja(){
    document.querySelector('#valorUsuario').value='';
}

function generarNumeroSecreto() { //Funcion recursiva
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if(listaNumerosSorteados.length==numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }else{
        if(listaNumerosSorteados.includes(numeroGenerado)){ //Esta en la lista
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del numero secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto=generarNumeroSecreto();
    intentos=1;
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numeros
    //Generar el numero aleatorio
    //Inicializar el numero de intentos
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    //Setteando el atributo disabled con el valor de true para poner gris el nuevo intento
    document.querySelector('#reiniciar').setAttribute('disabled',true);
}

function mostrarLenguajes(){
    for(let i=0;i<lenguajesDeProgramacion.length;i++){
        console.log(lenguajesDeProgramacion[i]);
    }
}

function mostrarLenguajesInverso(){
    for(let i=lenguajesDeProgramacion.length-1;i>=0;i--){
        console.log(lenguajesDeProgramacion[i]);
    }
}

function calcularPromedioLista(lista){
    return sumaLista(lista)/lista.length;
}

function sumaLista(lista){
    let sumaTot=0;
    for(let i=0;i<lista.length;i++){
        sumaTot+=lista[i];
    }
    return sumaTot;
}

function pequenhoYGrandeLista(lista){
    //Evita usar el -1 para inicializar
    let mayor=lista[0];
    let menor=lista[0];
    for(let i=0;i<lista.length;i++){
        if(lista[i]>mayor){
            mayor=lista[i];
        }
        if(lista[i]<menor){
            menor=lista[i];
        }
    }
    console.log(mayor);
    console.log(menor);
}

function devolverPos(elemento,lista){
    for(let i=0;i<lista.length;i++){
        if(lista[i]===elemento) return i;
    }
    return -1;
}

function fusionarListas(lista1,lista2){
    let newList=[];
    for(let i=0;i<lista1.length;i++){
        newList.push(lista1[i]+lista2[i]);
    }
    return newList;
}

function elevarLista(lista){
    let newList=[];
    for(let i=0;i<lista.length;i++){
        newList.push(lista[i]*lista[i]);
    }
    return newList;
}

condicionesIniciales();