FROM abhin4v/hastatic:latest

COPY src /opt/website
WORKDIR /opt/website
CMD ["/usr/bin/hastatic"]