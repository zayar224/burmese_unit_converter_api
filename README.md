# Burmese Unit Converter REST API

**မြန်မာ့တိုင်းတာယူနစ် ပြောင်းလဲပေးသော REST API**

A lightweight, high-performance REST API built with **Express.js** that converts traditional Burmese (Myanmar) units to other Burmese units and to international metric/imperial units.

Perfect for developers building e-commerce apps, real-estate platforms, gold/silver trading systems, agricultural tools, or any Myanmar-focused application that needs accurate traditional unit conversion.

## Features

- Convert **within** Burmese units (e.g., လက်ချောင်း → တောင်, ကျပ်သား → ပိဿာ)
- Convert **Burmese → International** (metric & imperial)
- Supports **Length, Area, Weight, Volume** (including gold/silver & rice measurements)
- Pure JSON data storage – easy to edit and extend
- Clean RESTful endpoints with proper HTTP status codes
- Zero external database required
- Ready for production (add CORS, rate-limiting, PM2, Docker as needed)

## Supported Categories & Sample Units

| Category | Burmese Units (examples)                     | International Units     |
| -------- | -------------------------------------------- | ----------------------- |
| Length   | လက်ချောင်း, ထွား, တောင်, လံ, မိုင်           | m, cm, km, ft, in, mile |
| Area     | စတုရန်းတောင်, ဧက (traditional), ပိဿာ, တစ်ရာ  | m², hectare, acre       |
| Weight   | ရွေးလေး, ကျပ်သား, ပိဿာ, တင်း                 | g, kg, oz, lb           |
| Volume   | လမြူး, စီး, ပုံ, တင်း (volume & rice weight) | L, m³, gallon, pint     |

## Project Structure

burmese-unit-converter-api/
├── app.js # Main Express server
├── data/
│ └── units.json # All conversion factors (editable)
├── package.json
├── README.md # You are here
└── node_modules/

## Quick Start

### 1. Prerequisites

- Node.js **v18 or higher** (recommended: latest LTS – v20 or v22)

### 2. Installation

```bash
# Clone or download this project
git clone https://github.com/yourusername/burmese-unit-converter-api.git
cd burmese-unit-converter-api

# Install dependencies
npm install
```

## API Endpoints

| Method | Endpoints | Description | Example
| GET | /categories | List all categories | → ["length","area","weight","volume"]
| GET | /:category/units | List units in a category | /length/units
| POST | /convert | Perform conversion (main endpoint) |

## Example Requests (cURL)

# 10 တောင် → meters

curl -X POST http://localhost:3000/convert \
 -H "Content-Type: application/json" \
 -d '{"category":"length","from":"taung","to":"m","value":10}'

# 500 ကျပ်သား (gold) → viss (ပိဿာ)

curl -X POST http://localhost:3000/convert \
 -d '{"category":"weight","from":"kyattha","to":"peittha","value":500}'

# 3 traditional ဧက → hectares

curl -X POST http://localhost:3000/convert \
 -d '{"category":"area","from":"acre_traditional","to":"ha","value":3}'
