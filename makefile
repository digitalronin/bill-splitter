server:
	yarn install
	NODE_OPTIONS=--openssl-legacy-provider yarn start

deploy:
	fly deploy
