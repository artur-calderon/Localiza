//pega o botão de pesquisar no html
var botao = document.getElementById('button')

// função que faz o request para a API do google Usando XMLHttpRequest
function puxaDados(pes, apiBase) {
  //Endpoint da api do google com o termo pesquisado na variável pes e a KeyAPI na variável apiBase
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${pes}&type=textquery&fields=photo_reference,formatted_address,name,rating,opening_hours&key=${apiBase}`

  $.ajax({
    url: url,
    method: 'GET'
  }).done(data => {
    //pega a div onde aparece os resultados
    var box = document.querySelector('.results-pesq')

    //Se o User digitar um valor sem resultados exibe uma mensagem
    if (data.status == 'ZERO_RESULTS') {
      alert('Nenhum Resultado Encontrado!')
    } else {
      //insere na div os resultados obtidos da pesquisa
      box.innerHTML = '<h5>Resultados</h5>'

      //percorre o array de resultados obitidos
      data.results.forEach(element => {
        var photo = ''
        var urlReference

        //se o estabelecimento não tiver foto seta a variável photo com uma imagem pré-definida
        if (element.photos == undefined) {
          photo = 'https://inisa.ufms.br/files/2019/04/2196393.jpg'
        } else {
          //seta a variável photo com a foto do estabelecimento pesquisado
          urlReference = element.photos[0].photo_reference
          photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${urlReference}&key=${apiBase}`
        }

        //adiciona os resultados em um card box
        box.innerHTML += `<div class="card " style="width: 18rem;">
            <img class="card-img-top" src="${photo}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${element.name.substring(0, 35)}</h5>
            <h6>Nota: ${element.rating}</h6>
            <p class="card-text">${element.formatted_address}</p>
            <a href="http://maps.google.com/maps?q=${
              element.name
            }" target="_blank" class="btn btn-primary grid">Ver no mapa</a>
            </div>
            </div>
            `
      })
    }
  }) //end Done
}

//funcão que executa a pesquisa
function pesquisar() {
  const apiBase = 'AIzaSyCpDwM2kB5sPh1K2wUAG9aTYdZhmwMiqhQ'
  //pega o valor do input text
  var search = document.getElementById('pesquisa').value

  puxaDados(search, apiBase)

  //era pra adicionar uma animação mas não está funcionando ainda
  var boxe = document.querySelector('.results-pesq')
  boxe.classList.add('.animaPesq')
  boxe.classList.remove('.animaPesq')
  //limpa a pesquisa
  boxe.innerHTML = ''
}

//qundo clica no botão pesquisar executa a funcão pesquisar
$(botao).click(() => {
  pesquisar()
})

//quando pressionada a tecla enter executa a função pesquisar
$('#pesquisa').keypress(e => {
  var keycode = e.keyCode ? e.keyCode : e.which
  if (keycode == '13') {
    pesquisar()
  }
})
