## Arquivo para documentar possíveis breaking changes ao atualizar o Asteroid.

#### app-extension/boot/notifications.js`:
- Componente sensível pois foi necessário alterações especificas referentes ao QIcon, foi necessário utilizar a prop `message` como HTML, porém o QIcon é um Vue componente, então foi necessário copiar o HTML renderizado e injeta-lo diretamente na prop.
