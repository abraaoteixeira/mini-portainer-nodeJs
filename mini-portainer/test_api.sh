#!/bin/bash
# Script de teste para Mini Portainer (registro, login e containers)

API_URL="http://localhost:3000"
USER="testeuser"
PASS="testesenha"

echo "Registrando usuário..."
curl -s -X POST "$API_URL/register" -H "Content-Type: application/json" -d '{"username":"'$USER'","password":"'$PASS'"}'
echo -e "\n"

echo "Logando usuário..."
TOKEN=$(curl -s -X POST "$API_URL/login" -H "Content-Type: application/json" -d '{"username":"'$USER'","password":"'$PASS'"}' | grep -o '"token":"[^"]*"' | cut -d '"' -f4)
echo "Token: $TOKEN"

echo "Listando containers..."
curl -s "$API_URL/containers" -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "Teste concluído."
