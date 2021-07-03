var botao = document.getElementById('button')


function puxaDados(pes, apiBase) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${pes}&type=textquery&fields=photo_reference,formatted_address,name,rating,opening_hours&key=${apiBase}`

  var request = new XMLHttpRequest()

  request.open('GET', url, true)

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      let data = JSON.parse(this.response)
      var box = document.querySelector('.results-pesq')
      
       
     
      if(data.status == 'ZERO_RESULTS'){

        alert('Nenhum Resultado Encontrado!')
        
      }else{
        box.innerHTML = '<h5>Resultados</h5>'
        data.results.forEach(element => {
          // let urlReference = element.photos[0].photo_reference
         console.log(element.photos[0].photo_reference)
          // let photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${urlReference}&key=${apiBase}`;
          
          // if(urlReference == undefined){
          //    photo = 'https://inisa.ufms.br/files/2019/04/2196393.jpg'
          // }
          box.innerHTML+= `<div class="card grid" style="width: 18rem;">
          <img class="card-img-top" src="" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <h6>Nota: ${element.rating}</h6>
          <p class="card-text">${element.formatted_address}</p>
          <a href="#" class="btn btn-primary grid">Ver no mapa</a>
          </div>
          </div>
          `
          
        }); 
      }
      
          
    }
    //
  }

  request.onerror = function () {}
  request.send()
}




          

// https://inisa.ufms.br/files/2019/04/2196393.jpg
$(botao).click(()=>{
const apiBase = 'AIzaSyCpDwM2kB5sPh1K2wUAG9aTYdZhmwMiqhQ'
  var search = document.getElementById('pesquisa').value
  puxaDados(search, apiBase)
  var boxe = document.querySelector('.results-pesq')
  boxe.classList.add('.animaPesq')
  boxe.classList.remove('.animaPesq')
  boxe.innerHTML = ''
})
  
