from fabric.api import env, local, run, sudo, cd

def vagrant():
    env.user = 'vagrant'
    env.hosts = ['127.0.0.1:2222']
    # grab vagrant ssh key
    result = local('vagrant ssh-config | grep IdentityFile', capture=True)
    env.key_filename = result.split()[1]
    return result

def install_node():
  sudo('apt-get update')
  sudo('apt-get install -y python-software-properties python g++ make git')
  sudo('add-apt-repository -y ppa:chris-lea/node.js')
  sudo('sudo apt-get update')
  sudo('apt-get install -y nodejs')

  run('npm config set registry="http://registry.npmjs.org/"') # because the cert is wrong
  sudo('npm install -g bower')
  sudo('npm install -g grunt-cli')

def install_canvas():
  sudo("apt-get install -y libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++")
  with cd('/vagrant'):
    sudo("npm install canvas")

def install_app():
  with cd('/vagrant'):
    sudo("npm install")
    run('grunt install')

def install_mongo(): # for recent versions of ubuntu
  sudo("apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10")
  sudo("echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list")
  sudo('apt-get update')
  sudo("apt-get install mongodb-10gen")
  # sudo service mongodb start # not needed?
