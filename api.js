var paginas_totales=0;
var pagina_actual=1;
var nombre_pelicula = "";
function BuscarPelicula(){
    nombre_pelicula = document.getElementById('titulo').value;
    let url = 'https://www.omdbapi.com/?apikey=8c504a5c&s='+ nombre_pelicula;
    metodoAJAX(url);
}
function metodoAJAX(url) {
    $(document).ready( function () {
        $('#TablaPeliculas').DataTable();
    } );
var titulo = document.getElementById("titulo").value;
var detalles="";
if (titulo ==""){
    alert("Rellene los Campos.")
}else {
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else {
        xmlhttp =new ActiveXObject("Microsoft.XMLHTTP");
    }

        xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText)
            paginas_totales = data.totalResults;
            paginas_totales /= 10;
            paginas_totales = Math.ceil(paginas_totales);

            console.log(data)
            data.Search.forEach(movie =>{
                detalles += "<tr>" +
                    "<td>"+ movie.Title + "</td>" +
                    "<td>"+ movie.Year + "</td>" +
                    "<td>"+ movie.imdbID + "</td>" +
                    "<td>"+ movie.Type + "</td>" +
                    "<td><img src="+ movie.Poster + " style='width:200px;height:200px;'></td>" +
                    "<td><input type='button' value='More Details' id="+movie.imdbID+" onclick=BuscarPeliculaID(this.id)></td>" +
                    "</tr>";
            });
            document.getElementById("DetallesPeliculas").innerHTML = detalles;
        }
        }
    xmlhttp.open("GET",url, true);
    xmlhttp.send();
}
}




















function BuscarPeliculaID(id){
    var detalles="";
    if (id==""){
        detalles = "sin informacion";
        document.getElementById("informacion").innerHTML=detalles;

    }else {

        if(window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        } else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function() {
            if(this.readyState ==4 && this.status ==200){
                var data= JSON.parse(this.responseText);
                console.log(data);
                var x;

                for(x in data){
                    "<tr>"
                    detalles+=  "<tr>"+data[x] +"</tr>" +"<br>" ;
                    "</tr>"

                }
                "<tr>"
                detalles+=  "<tr>"+Object.keys(data)+"</tr>" +"<br>" ;
                "</tr>"

            }
            document.getElementById("detallesId").innerHTML=detalles;

        };
        xmlhttp.open("GET","http://www.omdbapi.com/?apikey=335d2c95&i="+ id +"&plot=full",true);
        xmlhttp.send();
    }
}
function PrimeraPelicula() {
    let url = 'https://www.omdbapi.com/?apikey=8c504a5c&s='+ nombre_pelicula + '&page='+1;
    metodoAJAX(url);
}
function UltimaPelicula() {
    let url = 'https://www.omdbapi.com/?apikey=8c504a5c&s='+ nombre_pelicula + '&page='+ paginas_totales;
    metodoAJAX(url);
}
function AvanzarPelicula() {
    pagina_actual = parseInt(pagina_actual)+1;
    let url = 'https://www.omdbapi.com/?apikey=8c504a5c&s='+ nombre_pelicula + '&page='+ pagina_actual;
    metodoAJAX(url);
}
function RetrocederPelicula() {
    pagina_actual = parseInt(pagina_actual)-1;
    let url = 'https://www.omdbapi.com/?apikey=8c504a5c&s='+ nombre_pelicula + '&page='+ pagina_actual;
    metodoAJAX(url);
}