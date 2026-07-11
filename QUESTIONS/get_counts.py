import json

with open('set3_extracted.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
bscn = 0
krchn = 0
for line in lines:
    if '| BScN |' in line:
        bscn += 1
    elif '| KRCHN |' in line:
        krchn += 1
print(f'Parsed BScN: {bscn}, KRCHN: {krchn}')
