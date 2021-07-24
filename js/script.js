//pega o botão de pesquisar no html
let botao = document.getElementById('button')


// função que faz o request para a API do google Usando XMLHttpRequest
function puxaDados(pes, apiBase,local) {
  
  //Endpoint da api HERE com o termo pesquisado na variável pes e a KeyAPI na variável apiBase
  const url = `https://discover.search.hereapi.com/v1/discover?in=circle:${local};r=10000&q=${pes}&lang=pt-BR&apiKey=${apiBase}`

   $.ajax({
    url: url,
    method: 'GET'
  }).done(data => {

    data.items.forEach(element => {
      
     putData({
      nome: element.title.substring(0, 35),
      endereco: element['address'].label,
      tel: element['contacts'],
      positionL:element['position'].lat,
      positionLong:element['position'].lng

     })
    });

  })
}



function putData(data){
  //Se o User digitar um valor sem resultados exibe uma mensagem
  if (data.items == '') {
    alert('Nenhum Resultado Encontrado!')
  } else {

   //pega a div onde aparece os resultados
     let box = document.querySelector('.results-pesq')
    //insere na div os resultados obtidos da pesquisa
 
    let lat = data.positionL
    let long = data.positionLong
    let tel
    let photo = 'https://inisa.ufms.br/files/2019/04/2196393.jpg'


    //se o estabelecimento não tiver foto seta a variável photo com uma imagem pré-definida
    if (
      data.tel == undefined || data.tel[0].phone == undefined
    ) {
      tel = 'Telefone não disponível'
    } else {
      //seta a variável photo com a foto do estabelecimento pesquisado
      tel = data.tel[0].phone[0].value
     
    }

    //adiciona os resultados em um card box
    // box.innerHTML = '<h5>Resultados</h5>'
    box.innerHTML += `
    <div class="card " style="width: 18rem;">
        <img class="card-img-top" src="${photo}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${data.nome}</h5>
        <h6>Tel:${tel}</h6>
        <p class="card-text">${data.endereco}</p>
        <a href="http://maps.google.com/maps?q=${data.nome + '/' + '@' +
          lat + ',' + long
        }" target="_blank" class="btn btn-primary grid">Ver no mapa</a>
        </div>
        </div>
        `
      
}

}

//funcão que executa a pesquisa
function pesquisar() {
  const apiBase = 'pUIQcCLtEuxbmJNpg0DHaufPhLKxeFiHJzpnUC-Ry1A'
  //pega o valor do input text
  let search = document.getElementById('pesquisa').value


 // ########### pega localização do user ####################
 navigator.geolocation.getCurrentPosition(function(position) {
 let locale = position.coords.latitude + ',' + position.coords.longitude

  puxaDados(search, apiBase,locale)
});


  //era pra adicionar uma animação mas não está funcionando ainda
  let boxe = document.querySelector('.results-pesq')
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
