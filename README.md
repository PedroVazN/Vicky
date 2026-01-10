# 🎂 Site de Aniversário Especial

Um site surpresa de aniversário que só será liberado no dia 13 de janeiro!

## 📋 Como Usar

### 1. Adicionar Fotos

Para adicionar fotos nas seções, edite o arquivo `script.js` e use a função `addImageToSection()` no final do arquivo. Exemplo:

```javascript
// Fotos juntos
addImageToSection('photosTogether', 'fotos/nossas-fotos/foto1.jpg', 'Nós juntos');
addImageToSection('photosTogether', 'fotos/nossas-fotos/foto2.jpg', 'Nós juntos');

// Fotos aleatórias
addImageToSection('randomPhotos', 'fotos/aleatorias/foto1.jpg', 'Foto aleatória');

// Fotos da Mayte
addImageToSection('maytePhotos', 'fotos/mayte/foto1.jpg', 'Mayte fofa');

// Mais fotos
addImageToSection('morePhotos', 'fotos/mais/foto1.jpg', 'Mais um momento');
```

**Importante:** Coloque suas fotos em uma pasta `fotos/` dentro do projeto e ajuste os caminhos conforme necessário.

### 2. Personalizar Mensagens

Edite a função `updateMessages()` no arquivo `script.js` para personalizar as mensagens:

- **Primeiro Encontro:** Mensagem sobre o primeiro encontro de vocês
- **Vídeo:** Mensagem que acompanha o vídeo principal
- **Mensagem Final:** Mensagem especial sobre ela ser forte, os 19 anos, etc.

### 3. Adicionar Vídeo

Para adicionar um vídeo, você tem duas opções:

**Opção 1 - Vídeo local:**
Edite a função `addVideo()` no `script.js`:
```javascript
const video = document.createElement('video');
video.src = 'videos/nosso-video.mp4';
video.controls = true;
videoContainer.appendChild(video);
```

**Opção 2 - YouTube/Vimeo:**
```javascript
const iframe = document.createElement('iframe');
iframe.src = 'https://www.youtube.com/embed/SEU_VIDEO_ID';
iframe.width = '100%';
iframe.height = '500';
iframe.allowFullscreen = true;
videoContainer.appendChild(iframe);
```

### 4. Testar o Site (Antes do Dia 13)

Para testar o site antes do dia 13 de janeiro, você pode temporariamente modificar a função `checkDate()` no `script.js`:

```javascript
function checkDate() {
    // Para testar, sempre retorne true temporariamente
    return true; // Mude de volta para a verificação real depois!
    
    // Código original (comentar durante teste):
    // const today = new Date();
    // const month = today.getMonth() + 1;
    // const day = today.getDate();
    // if (month === 1 && day === 13) {
    //     return true;
    // }
    // return false;
}
```

**Lembre-se de voltar ao código original depois do teste!**

## 🎨 Estrutura do Site

O site contém as seguintes seções:

1. **💕 Nosso Primeiro Encontro** - Mensagem especial sobre o primeiro encontro
2. **📸 Nossos Momentos** - Fotos de vocês juntos
3. **🎬 Nosso Vídeo Especial** - Vídeo principal com mensagem
4. **😍 Fotos Que Você Me Manda** - Fotos aleatórias que ela manda
5. **👶 Mayte** - Fotos da sobrinha fofa
6. **📷 Mais Momentos Especiais** - Mais fotos especiais
7. **💝 Para Você** - Mensagem final especial

## 🚀 Como Abrir o Site

1. Abra o arquivo `index.html` no seu navegador
2. Ou use um servidor local (recomendado):
   - Se tiver Python: `python -m http.server 8000`
   - Se tiver Node.js: `npx http-server`
   - Depois acesse `http://localhost:8000`

## 📝 Notas

- O site só será liberado automaticamente no dia 13 de janeiro
- O contador regressivo será adicionado depois (conforme solicitado)
- O design é responsivo e funciona em celulares, tablets e computadores
- Todas as cores e animações seguem um tema de aniversário amoroso e engraçado

## 💝 Boa sorte com a surpresa!

Espero que ela ame o site! 🎉
