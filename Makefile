build:
	docker-compose build

run:
	docker-compose up --remove-orphans -d

runvite:
	docker exec simple-task-manager bash -c "npm run dev"

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
	chmod 777 ~/development/learning/SimpleTaskManager && sudo chown wislim:wislim ~/development/learning/SimpleTaskManager

storagelink:
	docker exec crawler bash -c "php artisan storage:link"

storagePermission:
	sudo chmod -R 777 storage

con:
	docker exec -ti crawler bash

stan:
	./vendor/bin/phpstan analyse
