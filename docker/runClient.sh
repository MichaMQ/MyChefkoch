#!/bin/bash
homePath=/home/chefkoch
logfile=$homePath/chefkoch.log

echo '192.168.2.138 cloud.fritz.box' >> /etc/hosts

echo $(date +'%Y-%m-%d %I:%M:%H') "run chefkoch" >> ${logfile} 2>&1
java -jar $homePath/chefkoch.jar

