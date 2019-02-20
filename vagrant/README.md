# Vagrant
Vagrant provides unified way of starting a development server on any operating system. This will start Webpack Dev Server on port 3000 with Hot Reload enabled in VM.

### Requirements
- Vagrant (https://www.vagrantup.com/downloads.html)
- VirtualBox (https://www.virtualbox.org)

### Usage
#### First Start
As Vagrant needs to download Box and install VM it may take a while (understand up to 30 minutes) after you start it for the first time. Consequent executions should be fast. 

#### Start Development Server
To start the development server use following command:

- run `start_dev.sh` on Linux/Mac 
- run `start_dev.bat` on Windows

You will be prompted if you would like to use nginx API proxy server in your project. This is useful when you need to use multiple backend servers or dealing with Cookies and CORS.
Configuration for nginx server can be found in `$PROJECT_ROOT$/config/nginx` directory.

Open [http://localhost:3000](http://localhost:3000) in your browser if you are NOT using nginx proxy server.
Open [http://localhost:4000](http://localhost:4000) in your browser if you are using nginx proxy server.

#### Stop Development Server
- run `stop_dev.sh` on Linux/Mac 
- run `stop_dev.bat` on Windows

#### Code Quality Check
It is important to have a top-notch code quality and we try to keep that up using ESLing and Flow. Make sure that during your development you have your IDE setup for using both of them while coding.
During production build code quality check is performed and if it fails it on your head ;)
Make sure you run these before you push anything into the repository.

- run `check.sh` on Linux/Mac
- run `check.bat` on Windows

#### Build
Additionally you can use Vagrant to create a build of the web application.

- run `build.sh` on Linux/Mac
- run `build.bat` on Windows

Your application will be available in `$PROJECT_ROOT$/dist` directory.

#### Destroy and Clean
If you for some reason want to remove VM from your project you can do so by using following command:

- run `destroy.sh` on Linux/Mac
- run `destroy.bat` on Windows
