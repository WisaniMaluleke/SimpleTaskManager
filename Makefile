build:
	docker-compose build
run:
	rm -rf node_modules/.vite && docker-compose up --remove-orphans -d && npm run dev

down:
	docker-compose down

dbshow:
	php artisan db:show

seed:
	php artisan db:seed

migrate:
	docker exec crawler bash -c "php artisan migrate:fresh --seed"

clear:
	php artisan optimize:clear

permissions:
	chmod 777 ~/development/learning/wis-warehouse && sudo chown wislim:wislim ~/development/learning/wis-warehouse
storagelink:
	docker exec crawler bash -c "php artisan storage:link"
storagePermission:
	sudo chmod -R 777 storage
con:
	docker exec -ti crawler bash
stan:
	./vendor/bin/phpstan analyse
