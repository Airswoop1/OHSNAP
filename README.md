## Setup development environment (OSX)

Assuming that XCode, homebrew, and command line tools are installed.


### Step 1: Install Virtualbox and Vagrant

```bash
brew cask install virtualbox
brew cask install vagrant
```

### Step 2: Clone repo

```bash
git clone git@github.com:Airswoop1/OHSNAP.git
cd OHSNAP
```

### Step 3: Download and provision the development environment

```bash
vagrant up
```

### Step 4: Run the server

```bash
vagrant ssh
cd /vagrant
nodemon server.js
```

Point your browser to http://localhost:1337.
