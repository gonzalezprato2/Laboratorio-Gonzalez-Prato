#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════
# WATCHDOG PERRO GUARDIÁN — EVOLUTION API (Laboratorio GONZALEZ-PRATO)
# Ejecutar vía crontab cada 15 minutos en el VPS para autoreparar el socket:
# */15 * * * * /root/watchdog_evolution.sh >> /var/log/evolution_watchdog.log 2>&1
# ══════════════════════════════════════════════════════════════════════════

API_KEY="GonzalezPratoSecret2026"
BASE_URL="http://localhost:8080"
INSTANCE="gonzalez-prato"
LOG_FILE="/var/log/evolution_watchdog.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# 1. Consultar estado del socket en Evolution API
HTTP_RESP=$(curl -s -m 10 -H "apikey: $API_KEY" "$BASE_URL/instance/connectionState/$INSTANCE" 2>/dev/null)
STATE=$(echo "$HTTP_RESP" | grep -o '"state":"[^"]*"' | cut -d'"' -f4)

RESTART_NEEDED=0
REASON=""

if [ -z "$STATE" ] || [ "$STATE" != "open" ]; then
  RESTART_NEEDED=1
  REASON="Socket no está open (Estado actual: '${STATE:-NO_RESPONSE}')"
fi

# 2. Ventanas de reinicio preventivo (Hora Venezuela UTC-4)
CURRENT_HOUR=$(TZ="America/Caracas" date +%H)
CURRENT_MIN=$(TZ="America/Caracas" date +%M)

# 6:45 AM (apertura preventiva de la sede)
if [ "$CURRENT_HOUR" -eq 6 ] && [ "$CURRENT_MIN" -ge 45 ]; then
  RESTART_NEEDED=1
  REASON="Reinicio preventivo matutino (Apertura de sede 7:00 AM)"
fi

# 12:00 PM - 12:15 PM (mediodía / prevención de congelamiento zombie)
if [ "$CURRENT_HOUR" -eq 12 ] && [ "$CURRENT_MIN" -le 15 ]; then
  RESTART_NEEDED=1
  REASON="Reinicio preventivo del mediodía (evitar socket zombie tras almuerzo)"
fi

# 3. Acción de Autoreparación
if [ "$RESTART_NEEDED" -eq 1 ]; then
  log "⚠️ ALERTA WATCHDOG: $REASON. Reiniciando socket..."
  RESTART_RESP=$(curl -s -m 15 -X POST -H "apikey: $API_KEY" "$BASE_URL/instance/restart/$INSTANCE" 2>/dev/null)
  log "✅ RESULTADO REINICIO: $RESTART_RESP"
else
  log "🟢 WATCHDOG SALUDABLE: Instancia '$INSTANCE' con socket activo ('$STATE')."
fi
