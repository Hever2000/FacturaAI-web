# FacturaAI

> SaaS para procesamiento automático de facturas argentinas con OCR + IA

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38b2ac?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Security](https://img.shields.io/badge/Security-HTTPS%20%7C%20CSP%20%7C%20Headers-blue?style=flat-square)

## 🎯 Descripción

FacturaAI es una aplicación SaaS que utiliza OCR inteligente e IA para extraer automáticamente datos estructurados de facturas argentinas en formato AFIP. Procesa PDFs e imágenes en segundos, devolviendo JSON con toda la información relevante.

## ✨ Características

- 🔐 **Autenticación segura** - JWT con refresh token automático
- 📄 **Procesamiento OCR** - Extrae texto de PDFs e imágenes
- 🤖 **IA Inteligente** - Comprende el formato AFIP automáticamente
- ⚡ **Ultra Rápido** - Respuesta en menos de 5 segundos
- 📊 **JSON Estructurado** - Datos listos para integrar
- 🔑 **API Keys** - Gestiona claves para integración
- 💳 **Suscripciones** - Planes Free, Pro y Enterprise con Mercado Pago

## 🛠️ Stack

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **Componentes:** shadcn/ui
- **Estado:** React Query + Zustand
- **API Client:** Axios con interceptors
- **Validación:** Zod

## 🔒 Seguridad

- Headers de seguridad (HSTS, X-Frame-Options, CSP, etc.)
- Validación de inputs con Zod
- Sanitización de archivos subidos
- Rate limit handling
- Tokens JWT con refresh automático
- Middleware para rutas protegidas

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (auth)/           # Login, Register
│   ├── (dashboard)/       # Dashboard pages
│   └── api/              # API routes
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   └── providers/       # React Query provider
├── lib/
│   ├── api/             # API layer con interceptors
│   ├── constants.ts      # Constantes de la app
│   ├── security.ts       # Validación y sanitización
│   └── utils.ts         # Utilidades
├── stores/              # Zustand stores
├── types/               # TypeScript interfaces
└── middleware.ts       # Auth middleware
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Backend API corriendo (ver [FacturaAI Backend](https://github.com/Hever2000/FacturaAI))

### Instalación Local

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
# Producción
NEXT_PUBLIC_API_BASE_URL=https://tu-backend.onrender.com/v1
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app

# Desarrollo
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📝 Scripts Disponibles

| Script             | Descripción                             |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Inicia el servidor de desarrollo        |
| `npm run build`    | Construye la aplicación para producción |
| `npm run start`    | Inicia el servidor de producción        |
| `npm run lint`     | Ejecuta ESLint                          |
| `npm run lint:fix` | Corrige errores de lint automáticamente |

## 🌐 Deploy en Vercel

### 1. Conectar Repository

1. Ve a [vercel.com](https://vercel.com)
2. Importa el repositorio de GitHub
3. Selecciona el branch `main`

### 2. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

| Name                       | Value                                | Environments                     |
| -------------------------- | ------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | `https://tu-backend.onrender.com/v1` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL`      | `https://factura-ai-web.vercel.app`  | Production                       |

### 3. Deploy

```bash
# Deploy automático (cada push a main)
# O manual:
vercel --prod
```

## 🔌 Endpoints de API

### Autenticación

| Método | Endpoint            | Descripción         |
| ------ | ------------------- | ------------------- |
| POST   | `/v1/auth/register` | Registro de usuario |
| POST   | `/v1/auth/login`    | Inicio de sesión    |
| POST   | `/v1/auth/refresh`  | Refrescar token     |
| GET    | `/v1/auth/me`       | Datos del usuario   |

### Procesamiento

| Método | Endpoint                 | Descripción       |
| ------ | ------------------------ | ----------------- |
| POST   | `/v1/jobs/process`       | Procesar factura  |
| GET    | `/v1/jobs`               | Listar jobs       |
| GET    | `/v1/jobs/{id}`          | Detalle de job    |
| POST   | `/v1/jobs/{id}/feedback` | Enviar corrección |

### API Keys

| Método | Endpoint           | Descripción      |
| ------ | ------------------ | ---------------- |
| POST   | `/v1/apikeys`      | Crear API key    |
| GET    | `/v1/apikeys`      | Listar API keys  |
| DELETE | `/v1/apikeys/{id}` | Eliminar API key |

### Suscripciones

| Método | Endpoint                     | Descripción          |
| ------ | ---------------------------- | -------------------- |
| GET    | `/v1/subscriptions/plans`    | Listar planes        |
| POST   | `/v1/subscriptions/checkout` | Iniciar checkout MP  |
| DELETE | `/v1/subscriptions`          | Cancelar suscripción |

## 🎨 Sistema de Diseño

- **Colores:** Tema oscuro con acentos teal/verde
- **Tipografía:** Inter para texto
- **Componentes:** shadcn/ui para UI base

## 📦 Docker (Opcional)

```bash
# Build
docker build -t facturaai-web .

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://tu-backend.com/v1 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  facturaai-web
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'feat: nueva funcion'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Hever2000** - [https://github.com/Hever2000](https://github.com/Hever2000)

---

⭐ Dale una estrella si te resultó útil
