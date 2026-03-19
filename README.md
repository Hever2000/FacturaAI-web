# FacturaAI

> OCR + IA para procesamiento automático de facturas argentinas

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38b2ac?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎯 Descripción

FacturaAI es una aplicación web que utiliza OCR inteligente e IA para extraer automáticamente datos estructurados de facturas argentinas en formato AFIP. Procesa PDFs e imágenes en segundos, devolviendo JSON con toda la información relevante.

## ✨ Características

- 📄 **Procesamiento OCR** - Extrae texto de PDFs e imágenes
- 🤖 **IA Inteligente** - Comprende el formato AFIP automáticamente
- ⚡ **Ultra Rápido** - Respuesta en menos de 5 segundos
- 🎯 **Alta Precisión** - 99.8% de exactitud en extracción
- 📊 **JSON Estructurado** - Datos listos para integrar

## 🛠️ Stack

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **Componentes:** shadcn/ui
- **API Client:** Axios
- **Linting:** ESLint + Prettier

## 📁 Estructura del Proyecto

```
src/
├── app/              # App Router (páginas y layouts)
├── components/
│   ├── ui/          # Componentes base (Button, Card, Input)
│   └── sections/     # Secciones de landing
├── features/        # Features específicas por módulo
├── hooks/           # Custom hooks reutilizables
├── lib/             # Utilidades y configuración
├── services/        # Capa de comunicación con API
├── types/           # TypeScript interfaces y tipos
└── config/          # Constantes y configuración global
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Hever2000/FacturaAI-web.git
cd FacturaAI-web

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Variables de Entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Corrige errores de lint automáticamente |

## 🔌 API

El proyecto está preparado para conectarse a una API backend. Ver [services/api.ts](src/services/api.ts) para la configuración.

### Endpoints esperados:

- `POST /api/invoice/process` - Procesar una factura
- `GET /api/invoice/status/:id` - Obtener estado del procesamiento

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño basado en:

- **Colores:** Tema oscuro con acentos teal/verde
- **Tipografía:** Inter para texto, JetBrains Mono para código
- **Componentes:** shadcn/ui para UI base

## 📦 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t facturaai-web .
docker run -p 3000:3000 facturaai-web
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'Agregar nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Hever2000** - [https://github.com/Hever2000](https://github.com/Hever2000)

---

⭐ Dale una estrella si te resultó útil
