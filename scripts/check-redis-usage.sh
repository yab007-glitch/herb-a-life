#!/bin/bash
# Check Upstash Redis usage for 1Herb
# Usage: ./scripts/check-redis-usage.sh

REDIS_URL="stirring-beagle-81353.upstash.io"
REDIS_TOKEN="gQAAAAAAAT3JAAIncDI0ZjA5M2UwNGY2NzU0YWRiOWFlMDJlYmEyNjRlZWIzNHAyODEzNTM"

echo "📊 Upstash Redis Usage for 1Herb"
echo "================================"

# Get memory info
MEMORY=$(curl -s -X POST "https://${REDIS_URL}/pipeline" \
  -H "Authorization: Bearer ${REDIS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '[["INFO", "memory"]]' | jq -r '.[0].result' 2>/dev/null)

echo ""
echo "💾 Memory:"
echo "$MEMORY" | grep -E "used_memory_human|maxmemory_human" | while read line; do
  echo "   $line"
done

# Get stats
STATS=$(curl -s -X POST "https://${REDIS_URL}/pipeline" \
  -H "Authorization: Bearer ${REDIS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '[["INFO", "stats"]]' | jq -r '.[0].result' 2>/dev/null)

echo ""
echo "📈 Stats:"
echo "$STATS" | grep -E "total_commands_processed|instantaneous_ops_per_sec|max_ops_per_sec" | while read line; do
  echo "   $line"
done

# Get key count
KEYS=$(curl -s -X POST "https://${REDIS_URL}/pipeline" \
  -H "Authorization: Bearer ${REDIS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '[["DBSIZE"]]' | jq -r '.[0].result' 2>/dev/null)

echo ""
echo "🔑 Keys: $KEYS"

# Daily limits
echo ""
echo "📋 Free Tier Limits:"
echo "   Commands: 10,000/day"
echo "   Bandwidth: 256 MB/day"
echo "   Memory: 256 MB"
echo ""
echo "Console: https://console.upstash.com/redis/93618e01-838d-4b4e-b5c9-dc6212e5f000"