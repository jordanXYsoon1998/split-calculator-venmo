FROM node:14
EXPOSE 3000
EXPOSE 9229
USER node
WORKDIR /home/node
CMD /bin/bash
# Run these commands
# docker build -f Dockerfile -t node:latest .
# docker run -it -p 3000:3000 -p 9229:9229 -p 8888:8888 -v /media/jordansoon/DATA/WebDev/NodeUdemyCourse/:/home/node/shared/ --name node node:latest
