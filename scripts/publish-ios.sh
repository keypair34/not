#!/usr/bin/env bash

pnpm tauri ios build --export-method app-store-connect
xcrun altool --upload-app --type ios --file "src-tauri/gen/apple/build/arm64/notwallet.ipa" --apiKey YOUR_API_KEY --apiIssuer YOUR_API_ISSUER
