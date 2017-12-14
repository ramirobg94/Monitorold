import os

os.system("truffle compile")
os.system("truffle migrate --reset")
os.system("cp build/contracts/GrandHouse.json ../script/contracts/")
