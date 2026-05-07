# Preciso do número de WhatsApp

Lucas, antes de finalizar o site preciso do número de WhatsApp que aparecerá nos CTAs.

Cole no `.env` do projeto:

```
PUBLIC_WHATSAPP_NUMBER=5534XXXXXXXXX
```

(formato: 55 + DDD + número, sem +, sem espaços, sem traços)

Exemplo Uberaba: `553499999999`

Por enquanto está usando `5534999999999` como placeholder — funciona pra testar mas todos os CTAs abrirão um número fictício.

**Onde trocar:**

1. **Local** (pra testar): cria `.env` na raiz do projeto com a linha acima
2. **Vercel** (pra prod): em *Settings → Environment Variables* da Vercel, adicione `PUBLIC_WHATSAPP_NUMBER` com o número real, marca pra Production/Preview/Development e redeploya.
