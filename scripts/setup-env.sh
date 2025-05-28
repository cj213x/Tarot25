#!/bin/bash

# Check if both URL and key are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <SUPABASE_URL> <SUPABASE_ANON_KEY>"
    exit 1
fi

# Create .env.local file
cat > ../.env.local << EOL
NEXT_PUBLIC_SUPABASE_URL=$1
NEXT_PUBLIC_SUPABASE_ANON_KEY=$2
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOL

echo "Environment variables have been set up in .env.local"
