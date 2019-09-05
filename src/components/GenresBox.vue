<template>
  <div>
    <div class="genre-list">
      <ul>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'accion'}}">accion</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'aventura'}}">aventura</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'comedia'}}">comedia</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'crimen'}}">crimen</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'drama'}}">drama</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'familia'}}">familia</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'fantasia'}}">fantasia</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'misterio'}}">misterio</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'suspense'}}">suspense</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'suspenso'}}">suspenso</router-link></li>
        <li><router-link :to="{name: 'ByGenre' , params:{genres: 'terror'}}">terror</router-link></li>
      </ul>
    </div>
  </div>
</template>