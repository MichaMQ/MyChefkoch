FROM alpine:3.14

RUN apk --update add supervisor tzdata openjdk11 bash && rm -rf  /tmp/* /var/cache/apk/* && echo '192.168.2.138 cloud.fritz.box' >> /etc/hosts
# add timezone info (instead of UTC)
ENV TZ="Europe/Berlin"

COPY supervisord.conf /etc/
COPY runClient.sh /home/chefkoch/
COPY chefkoch-1.2.jar /home/chefkoch/chefkoch.jar
#RUN echo '192.168.2.138 cloud.fritz.box' >> /etc/hosts

CMD /home/chefkoch/runClient.sh

#ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]

