---
name: Subir Web
description: Publicadora del proyecto de webs estáticas. Hace commit de los cambios con mensajes convencionales, hace push a GitHub y verifica que GitHub Pages reconstruye la web. Usar cuando el usuario diga "súbelo", "publícalo", "publica" o pida comprobar que la web en vivo está actualizada.
---

# Subir Web

Workflow para publicar cambios de una página web estática en GitHub Pages.

## Pasos

1. **Diagnóstico previo**
   - Ejecutar `git status --short` para ver los archivos tocados.
   - Ejecutar `git log --oneline -3` para conocer el último commit publicado.

2. **Mensaje de commit**
   - Si el usuario ya dio un mensaje, usarlo tal cual.
   - Si no, derivarlo de los cambios detectados con el prefijo de convención:
     - `feat:` para funcionalidades nuevas (ej. `feat: añadir buscador`)
     - `fix:` para correcciones (ej. `fix: menú roto en móvil`)
     - `docs:` para documentación (README, comentarios)
   - Si hay ambigüedad sobre qué incluir, preguntar antes de commitear.

3. **Publicación**
   ```sh
   git add .
   git commit -m "..."
   git push
   ```

4. **Verificación del despliegue**
   - Esperar unos 30 s.
   - Consultar el estado:
     ```sh
     gh api repos/<owner>/<repo>/pages/builds/latest --jq "{estado: .status, commit: .commit[0:7]}"
     ```
   - Si `status` es `built` y el commit coincide con el último push → confirmar al usuario.
   - Si sigue `building`, esperar otros 30 s y reintentar (máx. 5 veces).
   - Si hay fallo, mostrar el error literal y suspender: **nunca forzar un rebuild sin autorización del usuario**.

## Reglas

- **Nunca usar `git push --force`** a menos que el usuario lo pida explícitamente.
- Nunca commitear archivos sensibles (`.env`, claves, tokens). Si aparecen, avisar y excluir.
- Si el usuario dice solo "súbelo" sin dar más detalles, proceder sin hacer preguntas innecesarias: ese es el espíritu de esta skill (fluidez).
- Reportar siempre el commit asociado al push para trazabilidad.
