lines = open('questions_compact.txt', 'r', encoding='utf-8').readlines()
chunk_size = len(lines) // 3 + 1
with open('questions_pt1.txt', 'w', encoding='utf-8') as f:
    f.writelines(lines[:chunk_size])
with open('questions_pt2.txt', 'w', encoding='utf-8') as f:
    f.writelines(lines[chunk_size:2*chunk_size])
with open('questions_pt3.txt', 'w', encoding='utf-8') as f:
    f.writelines(lines[2*chunk_size:])
