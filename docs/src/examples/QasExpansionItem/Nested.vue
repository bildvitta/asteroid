<template>
  <div class="container spaced">
    <qas-expansion-item :badges="badges" label="John Doe">
      <template #content>
        <qas-expansion-item label="Informações 1">
          <template #content>
            Meu conteúdo customizado
          </template>
        </qas-expansion-item>

        <qas-expansion-item label="Informações 2">
          <template #content>
            Meu conteúdo customizado 2
          </template>
        </qas-expansion-item>

        <qas-expansion-item label="Informações 3">
          <template #content>
            Meu conteúdo customizado 3
          </template>
        </qas-expansion-item>

        <qas-expansion-item label="Informações 4">
          <template #content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dolore eligendi accusamus placeat laudantium aliquid aspernatur mollitia, expedita id labore ex nulla quam maiores exercitationem et debitis quae corrupti odio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dolore eligendi accusamus placeat laudantium aliquid aspernatur mollitia, expedita id labore ex nulla quam maiores exercitationem et debitis quae corrupti odio.
          </template>

          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat saepe commodi sit consequatur, fuga quia hic neque porro, atque eum maxime dolores, natus asperiores consequuntur sapiente quisquam ratione. Expedita, deserunt.</div>
        </qas-expansion-item>
      </template>
    </qas-expansion-item>
  </div>
</template>

<script setup>
const badges = [
  {
    color: 'green-14',
    label: 'Aprovado',
    textColor: 'white'
  },
  {
    color: 'red-14',
    label: 'Reprovado',
    textColor: 'white'
  }
]
</script>
