//creer un nouveau projet
npx @nestjs/cli new nom-du-projet

cd nom-du-projet

//install swagger  qui permet de générer la documentation de l'API avec Swagger.
npm install --save @nestjs/swagger swagger-ui-express

//Installer Awilix pour l’injection de dépendances:   Awilix est une bibliothèque d’injection de dépendances populaire et légère pour Node.js
npm install awilix

// Installer une bibliothèque de tests unitaires qui permet d'exécuter des tests unitaires pour le projet. 
//jest qui permet d'exécuter des tests unitaires pour le projet.
npm install --save-dev jest

//initialise prisma   
//La commande npx prisma init installe Prisma et crée un fichier prisma.schema qui contient la configuration de la base de données.
npx prisma init


//configuration de la base de donne dans le fichier .env
DATABASE_URL="mysql://root:password@localhost/nom_de_votre_base_de_donnees"


//Lancer un conteneur MySQL avec la version par défaut (latest)
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql


 //Créer la structure de projet avec les répertoires nécessaire
mkdir src


mkdir src\domain\entities\user.ts
// Cette entité représente un utilisateur dans la base de données. 
//Elle a des propriétés pour l'ID, le nom, l'email et le mot de passe.


mkdir src\application
mkdir src\infrastructure
mkdir src\interfaces
mkdir src\utils




//main.ts
Ce fichier est le point d'entrée de l'application. Il crée une 
instance de l'application et configure Swagger pour la documentation de l'API.

//app.module.ts
Ce fichier définit le module principal de l'application. Il importe 
les modules nécessaires, les contrôleurs et les services.


//prisma.module.ts
Ce fichier définit le module Prisma. Il fournit le service Prisma et 
l'exporte pour qu'il puisse être utilisé dans d'autres modules.


//prisma.service.ts
Ce fichier définit le service Prisma. Il crée une instance de 
PrismaClient et fournit une méthode pour récupérer un message de bienvenue.





//Express.js est un framework web populaire pour Node.js qui permet de créer des 
//applications web rapides et efficaces. 
//installer express pour la gestion des routes

npm install express


//JSON Web Token (JWT) est un standard pour représenter les claims (revendications) 
//sécurisées entre deux parties
//installer JWT pour l'authentification et l'autorisation

npm install jsonwebtoken


//ZooKeeper est un système de gestion de configuration
//installer Zod pour s'assurer que les entrees de l'utilisteur sont bien ceux qu'on attend de lui

npm install zod



//installer Dotenv qui est un module Node.js qui permet de charger des variables d'environnement 
//à partir d'un fichier .env dans votre projet()

npm install dotenv



//ajouter d'imarge kafka et zookeeper dans Docker-compos.yml et
//Exécutez la commande pour lancer les services dans le fichier Docker-compos.yml (zookeeper, kafka...)

docker-compose up


//installer le packet kafka

npm install kafkajs




// Lancer le projet
npx nest start


