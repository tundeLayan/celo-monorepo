echo "Releasing ODIS to $ENV_NAME!"
yarn keys:decrypt
./packages/celotool/bin/celotooljs.sh deploy upgrade odis --celoEnv $NETWORK --context azure-odis-eastus-1