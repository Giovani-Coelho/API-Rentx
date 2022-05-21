# passa qual imagem
FROM node 
# definir uma pasta onde vai ficar as informacoes
WORKDIR /usr/app
# copia o package.json para dentro do diretorio passado acima
COPY package.json ./
# esse comando serve para baixar as dependencias
RUN npm install
# aki fala para copiar tudo para dentro da pasta raiz
COPY . .
# porta do http
EXPOSE 3333
# para rodar o script
CMD ["npm", "run", "dev"]

# docker compose
