---
title: QasBtn
---

O mesmo botão do Quasar ([QBtn](https://v2.quasar.dev/vue-components/button)), mas com o nosso estilo, tem acesso a todas propriedades do componente do quasar.
Tem a função de criar gatilhos para ações. Eles podem ser utilizados isoladamente ou ​​como parte de outros componentes de padrões maiores, como formulários,  caixas de diálogo e feedbacks.

<doc-api file="btn/QasBtn" name="QasBtn" />

:::danger
Sempre que utilizar "label" e "ícone", certifique-se de usar as propriedades correspondentes, como `label`, `icon` e `iconRight`. Evite usar esses conteúdos através do slot padrão, pois essa prática pode causar problemas de estilo. O slot padrão deve ser reservado para casos específicos, como chamar um `QMenu` dentro dele. Se você não utilizar as propriedades `label`, `icon` e `iconRight` e adicionar esses conteúdos via slot, há uma grande possibilidade de ocorrerem problemas de estilo.
:::

:::warning
Algumas propriedades do quasar não são repassadas, como:

- align
- dense
- fab
- fabMini
- flat
- glossy
- noWrap
- outline
- padding
- push
- ripple
- round
- size
- square
- stack
- stretch
- textColor
- unelevated
:::

:::tip
##### Propriedade "color"
A prop `color` só é configurável caso a variante seja `tertiary`, não é possível alterar as cores das variantes `primary` e `secondary`, as possíveis opções de cores para tertiary são:

- primary
- grey-9
- white
:::

:::tip
##### Regras para o uso dos ícones (icon e iconRight)

Usar o ícone à esquerda para ações diretas e o ícone à direita para ações que abrem outras opções ou possibilidades. O ícone à esquerda é sempre ilustrativo, enquanto o ícone à direita indica que há uma ação específica a ser tomada, como escolher opções ou acessar várias ações. Seguir essa convenção ajudará os usuários a entender rapidamente a função de cada botão e melhorar a experiência de usuário.
:::

## Uso

#### primary
Os botões primários são utilizados em ações positivas e/ou primárias, como confirmar, avançar, ir para, acessar. Eles também são usados quando houver somente um botão disponível, como entendi, ok. Esses botões primários são utilizados para indicar ao usuário a ação principal que deve ser realizada, como salvar, adicionar, excluir, ativar, desativar. Eles são utilizados como uma forma de "guiar" o usuário, indicando qual é a ação principal que deve ser tomada. O objetivo é tornar a interface clara e intuitiva para o usuário, facilitando a navegação e a realização das ações desejadas.
<doc-example file="QasBtn/ExPrimaryVariant" title='Variante "primary"' />

#### secondary
O botão secundário é utilizado em casos em que há dois botões de ação disponíveis, mas sua função não é chamar a atenção do usuário para a ação principal. Um exemplo típico de botão secundário é o de "cancelar", que tem a função de desfazer a ação anterior. Esses botões secundários são usados para ações negativas ou secundárias, como voltar, cancelar, recusar, voltar para, remover. O objetivo é fornecer uma opção de desfazer a ação principal, ajudando o usuário a navegar de forma segura e intuitiva na interface.
<doc-example file="QasBtn/ExSecondaryVariant" title='Variante "secondary"' />

#### tertiary
Os botões terciários são utilizados para ações complementares ou secundárias, que requerem menos destaque na tela. Eles são usados quando já há um botão primário e/ou um botão secundário na tela. Exemplos de ações que podem ser realizadas por meio de botões terciários incluem: criar conta, ir para ajuda, adicionar uma opção, baixar planilha. É importante lembrar que eles são menos chamativos e devem ser utilizados para ações secundárias.

##### Cores
###### primary
A cor "primary" é usada para ações diretas, como botão para adicionar novos itens, baixar planilha, etc. Porém quando a ação é negativa como remover, não se usa a cor primary mas sim a grey-9.

###### grey-9
A cor "grey-9" é usado para quando não é uma ação direta ou ação negativa, por exemplo no botão de opções que quando clicado abre um menu para outras opções, ou um botão de remover.

###### white
A cor "white" é usada quando necessita de um contraste, sendo possível ter ou não uma cor de hover, sendo possível modificar através da prop `useHoverOnWhiteColor`.
<doc-example file="QasBtn/ExTertiaryVariant" title='Variante "tertiary"' />

<doc-example file="QasBtn/UseLabelOnSmallScreen" title="use-label-on-small-screen" />
