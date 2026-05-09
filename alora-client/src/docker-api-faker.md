# Docker API Faker

## LanguageTool

### Installation

```bash
docker run -d -p 8010:8010 --name languagetool silviof/docker-languagetool
```

### Vérifier le conteneur

```bash
docker ps
```

### Tester dans le navigateur

- URL : http://localhost:8010/v2/check

### Exemple d'appel API

```bash
curl -X POST http://localhost:8010/v2/check \
  -d "text=Je suis aller au magasin" \
  -d "language=fr"
```

---

## LibreTranslate

### Installation

```bash
docker run -d -p 5000:5000 -e LT_LOAD_ONLY=en,es libretranslate/libretranslate
```

### Tester dans le navigateur

- URL : http://localhost:5000

### Exemple d'appel API

```bash
curl -X POST http://localhost:5000/translate \
  -H "Content-Type: application/json" \
  -d '{
    "q": "Bonjour",
    "source": "fr",
    "target": "es"
  }'
```
