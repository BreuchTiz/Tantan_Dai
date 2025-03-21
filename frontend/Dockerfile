FROM node:alpine

# Arbeitsverzeichnis
WORKDIR /app

# Installiere einen leichten Static-File-Server
RUN npm install -g http-server

# Kopiere deine statischen Dateien (HTML, CSS, JS)
COPY . .

# Exponiere den internen Port (für nginx-proxy)
EXPOSE 8080

# Starte http-server
CMD ["http-server", "-p", "8080"]
