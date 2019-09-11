deploy-base:
	docker build -t keaaa/www-workshop-base -f base.Dockerfile .
	docker push keaaa/www-workshop-base:latest 

build:
	docker build -t www .

run:
	docker run -it --rm -p 3000:3000 www