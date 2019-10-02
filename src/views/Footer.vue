<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center">
          
        </div>
        <div class="col-md-6 text-center">   
          
        </div>
      </div>
      <div class="justify-content-center text-center bottom">
        <span>© {{year}} CineCoqui , Todos los derechos reservados</span>
        <p class="font-italic">Ningúno de los vídeos se encuentra alojado en servidores.</p>
        <br>
        <p class="font-italic">v{{version}}</p>
        <a href="https://github.com/ChrisMichaelPerezSantiago/cinecoqui" class="btn btn-dark">
          <i class="fab fa-github"></i> 
          View code on Github
        </a>
      </div>
    </div>
  </footer>
</template>


<script>
  export default {
    setup(){
      const values = {
        year: new Date().getFullYear(),
        version: require('../../package.json').version
      };
      return{
        ...values
      }
    }
  }
</script>