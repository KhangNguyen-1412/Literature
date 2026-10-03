with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import json
# Let's extract works array
start = text.find('works: [')
if start == -1:
    start = text.find('"works": [')
print("works start:", start)

# Let's load the data by evaluating JS in node
