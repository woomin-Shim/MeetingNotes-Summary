import sys
import re
import string
import io

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')



def getHello(text):
    print ('Hello world ' + text)
    

if __name__ == '__main__':
    getHello(sys.argv[1])
