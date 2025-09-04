#!/bin/sh

# Write env vars to a JS file for the frontend to consume
cat <<EOF > /usr/share/nginx/html/env.js
window.env = {
  VITE_WAREHOUSE_API_URL: "${VITE_WAREHOUSE_API_URL}",
  VITE_MERCHANTS_API_URL: "${VITE_MERCHANTS_API_URL}"
};
EOF

# Start the app
exec "$@"