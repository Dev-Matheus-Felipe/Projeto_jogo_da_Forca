import { useState,useEffect } from 'react'
import './App.css'

function App() {

  
  const [letra_escolhida, setLetra_escolhida] = useState("");
  const [palavra,setPalavra] = useState ("");
  const [tema,setTema] = useState ("");
  const [arrayPalavra,setArrayPalavra] = useState([]);
  const [contador,setContador] = useState(0);
  const quadrado = document.querySelectorAll(".erros .quadrado");
  var acerto = false;
  

  function enviar_formulario(e){
    e.preventDefault();

    setArrayPalavra(palavra.split(""));

    document.querySelector(".app > form").style.display = 'none';
    document.querySelector(".app > .jogo").style.display = 'block';
    
  }

  function procurar_letra(e){
    e.preventDefault();
    acerto = false;
    arrayPalavra.map((value,index)=>{
      if(value.toLowerCase() === letra_escolhida.toLowerCase()){
        document.querySelectorAll(".letra p")[index].style.opacity = 1;

        if(acerto === false){
          acerto = true;
        }
      }
    })


    if(acerto === false){
      setContador(prev => prev + 1)

    }

    let vitoria_curso = 0;
    arrayPalavra.forEach((value, index) => {
      if (document.querySelectorAll(".letra p")[index].style.opacity === '1') {
        vitoria_curso++;
      }
    });

    if (vitoria_curso === arrayPalavra.length) {
      alert('Você ganhou!');
      window.location.reload();
    }

    setLetra_escolhida("");
  
    
  }

  useEffect(()=>{
    if(contador === 5){
      alert("Você perdeu!");
      window.location.reload();
    }else{
      for(var i = 0; i < contador; i++){
        quadrado[i].style.backgroundColor = 'red';
      }
    }
    
  },[contador])

  return (
    <div className="app">
      <form onSubmit={(e)=>{enviar_formulario(e)}}>

        <div className="palavra_desejada">

          <input type='text' 
          value={palavra} 
          onChange={(e)=> setPalavra(e.target.value)}  
          placeholder='Palavra'
          required
          />

        </div>

        <div className="tema_desejado">

          <input type='text'  
          value={tema} 
          onChange={(e)=> setTema(e.target.value)}  
          placeholder='Tema' 
          required
          />
        
        </div>

        <div className="botao_iniciar">
          <input type='submit' placeholder='Iniciar' />
        </div>

      </form>

      <div className="jogo" style={{display: 'none'}}>
        <div className="caixa_de_resposta">
          <h1 style={{margin: '20px',color: 'white', fontStyle: 'italic'}}>Tema: {tema}</h1>
          <form onSubmit={(e)=>procurar_letra(e)}>
            <input 
            type='text'
            value={letra_escolhida}
            onChange={(e)=> setLetra_escolhida(e.target.value)}
            placeholder='Digite aqui a letra desejada'
            />

            <input type='submit' name='acao' placeholder='Enviar'/>
          </form>
        </div>


        <div className="palavra">
        {
          arrayPalavra.map((letra, index) => (
              <div className="letra" key={index}>
                <p>{letra}</p>
              </div>
          ))
        }
        </div>

        <div className="erros">
          <div className="quadrado"></div>
          <div className="quadrado"></div>
          <div className="quadrado"></div>
          <div className="quadrado"></div>
          <div className="quadrado"></div>
        </div>

      </div>
    </div>

  )
}

export default App

