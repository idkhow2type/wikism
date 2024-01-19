import json
from html import unescape
import re

# with open('words.txt') as f:
#     words = dict((word.strip().title(),'') for word in f.readlines() if word.strip().endswith('ism'))
total_occurrences = 0
with open("all.num") as f:
    words = {}
    for line in f:
        word = line.split()
        if word[1].endswith("ism"):
            # add non alpha chars to set
            if re.search("[^a-zA-Z\-]", word[1]):
                continue

            word[1] = unescape(word[1])
            start = 0
            for c in word[1]:
                if c.isalpha():
                    break
                start += 1
            end = len(word[1])
            for c in reversed(word[1]):
                if c.isalpha():
                    break
                end -= 1
            word[1] = word[1][start:end]

            if word[1] in words:
                words[word[1]]["freq"] += int(word[0])
            else:
                words[word[1]] = {"desc": "", "freq": int(word[0])}

            total_occurrences += int(word[0])
print(total_occurrences)

with open("ism.json", "w") as f:
    json.dump(words, f)
