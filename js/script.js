//pega o botão de pesquisar no html
var botao = document.getElementById('button')

// função que faz o request para a API do google Usando XMLHttpRequest
function puxaDados(pes, apiBase) {
  //Endpoint da api do google com o termo pesquisado na variável pes e a KeyAPI na variável apiBase
  const url = `https://discover.search.hereapi.com/v1/discover?at=-10.8798147,-62.0148152,12&q=${pes}&apiKey=${apiBase}`

  //pega a div onde aparece os resultados
  var box = document.querySelector('.results-pesq')
  $.ajax({
    url: url,
    method: 'GET'
  }).done(data => {
    //Se o User digitar um valor sem resultados exibe uma mensagem
    if (data.status == 400) {
      alert('Nenhum Resultado Encontrado!')
    } else {
      //insere na div os resultados obtidos da pesquisa
      box.innerHTML = '<h5>Resultados</h5>'

      //percorre o array de resultados obitidos
      data.items.forEach(element => {
        var lat = element['position'].lat
        var long = element['position'].lng
        var tel
        var photo = ''
        var urlReference

        //se o estabelecimento não tiver foto seta a variável photo com uma imagem pré-definida
        if (
          element.photos == undefined ||
          element['contacts'][0].phone[0].value == null
        ) {
          photo = 'https://inisa.ufms.br/files/2019/04/2196393.jpg'
          tel = 'Sem Telefone'
        } else {
          //seta a variável photo com a foto do estabelecimento pesquisado
          tel = element['contacts'][0].phone[0].value
          urlReference = element.photos[0].photo_reference
          photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${urlReference}&key=${apiBase}`
        }

        //adiciona os resultados em um card box
        box.innerHTML += `<div class="card " style="width: 18rem;">
            <img class="card-img-top" src="${photo}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${element.title.substring(0, 35)}</h5>
            <h6>Tel: ${tel}</h6>
            <p class="card-text">${element['address'].label}</p>
            <a href="http://maps.google.com/maps?q=${
              lat + ',' + long
            }" target="_blank" class="btn btn-primary grid">Ver no mapa</a>
            </div>
            </div>
            `
      })
    }
  })
}

//funcão que executa a pesquisa
function pesquisar() {
  const apiBase = 'pUIQcCLtEuxbmJNpg0DHaufPhLKxeFiHJzpnUC-Ry1A'
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
