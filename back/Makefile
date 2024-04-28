COMPOSE=docker compose -f docker-compose.yml -f docker-compose-override.yml
BASH=$(COMPOSE) exec app
CONSOLE=$(BASH) php bin/console

.PHONY: start up perm db cc bash vendor stop

start: up perm vendor db cc perm

up:
	docker kill $$(docker ps -q) || true
	$(COMPOSE) build --force-rm
	$(COMPOSE) up -d --remove-orphans

stop:
	$(COMPOSE) stop
	$(COMPOSE) kill

vendor:
	$(BASH) composer install -n
	make perm

bash:
	$(BASH) bash

db:
	$(CONSOLE) doctrine:database:drop --if-exists --force
	$(CONSOLE) doctrine:database:create --if-not-exists
	$(CONSOLE) doctrine:schema:update --force --complete
	$(CONSOLE) doctrine:fixtures:load -n

db-migrate:
	$(CONSOLE) doctrine:database:drop --if-exists --force
	$(CONSOLE) doctrine:database:create --if-not-exists
	$(CONSOLE) doctrine:migrations:migrate -n

perm:
	sudo chown -R $(USER):$(USER) .
	mkdir -p ./var ./public/
	sudo chown -R www-data:$(USER) ./var ./public/
	sudo chmod -R g+rwx .

cc:
	$(CONSOLE) c:cl --no-warmup
	$(CONSOLE) c:warmup

php-linter:
	sh -c "COMPOSE_INTERACTIVE_NO_CLI=1 $(BASH) vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.php"

preprod:
	# Fetch updates
	git pull origin master
	# Clear cache
	php8.2 bin/console c:cl --no-warmup
	php8.2 bin/console c:warmup
	# Install dependencies
	php8.2 /usr/local/bin/composer install --classmap-authoritative --no-interaction --no-scripts --no-ansi --no-dev
	php8.2 bin/console c:cl --no-warmup
	php8.2 bin/console c:warmup
	# Update Database
	php8.2 bin/console doctrine:schema:update --force
