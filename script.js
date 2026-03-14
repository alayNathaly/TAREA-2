let tiempo = 0;
let intervalo = null;
let tiempos = [];

function actualizarDisplay(){

    let ms = tiempo % 1000;
    let totalSeg = Math.floor(tiempo/1000);

    let segundos = totalSeg % 60;
    let minutos = Math.floor(totalSeg/60)%60;
    let horas = Math.floor(totalSeg/3600);

    document.getElementById("display").innerText =
        String(horas).padStart(2,'0')+":"+
        String(minutos).padStart(2,'0')+":"+
        String(segundos).padStart(2,'0')+"."+
        String(ms).padStart(3,'0');

}

function iniciar(){

    if(intervalo) return;

    intervalo = setInterval(()=>{

        tiempo += 10;
        actualizarDisplay();

    },10);

}

function pausar(){

    clearInterval(intervalo);
    intervalo = null;

}

function reiniciar(){

    pausar();
    tiempo = 0;
    actualizarDisplay();
    tiempos = [];

    document.getElementById("tablaResultados").innerHTML="";

}

function registrarTiempo(){

    tiempos.push(tiempo);

    let primero = Math.min(...tiempos);

    let tabla = document.getElementById("tablaResultados");

    tabla.innerHTML="";

    tiempos.forEach((t,i)=>{

        let diferencia = t - primero;

        let fila = `
<tr>
<td>${i+1}</td>
<td>${formatear(t)}</td>
<td>${formatear(diferencia)}</td>
</tr>
`;

        tabla.innerHTML += fila;

    });

}

function formatear(t){

    let ms = t % 1000;
    let totalSeg = Math.floor(t/1000);

    let s = totalSeg % 60;
    let m = Math.floor(totalSeg/60)%60;
    let h = Math.floor(totalSeg/3600);

    return String(h).padStart(2,'0')+":"+
        String(m).padStart(2,'0')+":"+
        String(s).padStart(2,'0')+"."+
        String(ms).padStart(3,'0');


}

function exportarResultados(){

    if(tiempos.length === 0){
        alert("No hay resultados para exportar");
        return;
    }

    let primero = Math.min(...tiempos);

    let csv = "Competidor,Tiempo,Diferencia\n";

    tiempos.forEach((t,i)=>{

        let diferencia = t - primero;

        csv += `${i+1},${formatear(t)},${formatear(diferencia)}\n`;

    });

    let blob = new Blob([csv], { type: "text/csv" });

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "resultados_cronometro.csv";

    a.click();

    URL.revokeObjectURL(url);

}