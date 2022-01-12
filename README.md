## Запуск проекта

1. В корне проекта создать файл .env и перенести в него содержимое из .env.example


2. Запустить через docker-compose:
```shell script
docker-compose up
```
## Запуск миграций

```shell script
npm run typeorm:migration:run
```
