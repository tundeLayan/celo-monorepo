echo "Releasing ODIS to $ENV_NAME!"
gcloud init --console-only
yarn keys:decrypt
./packages/celotool/bin/celotooljs.sh deploy upgrade odis --celoEnv $NETWORK --context azure-odis-eastus-1