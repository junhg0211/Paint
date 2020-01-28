from sys import argv

from Server import Server

if __name__ == '__main__':
    args = argv.copy()

    if len(args) <= 1:
        args.append('1440')
    if len(args) <= 2:
        args.append('1440')

    server = Server(int(args[1]), int(args[2]))
    server.start()
