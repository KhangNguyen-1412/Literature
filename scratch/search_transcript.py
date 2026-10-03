with open(r'C:\Users\nhpk1\.gemini\antigravity-ide\brain\8e4f5377-b764-4b67-9de1-ca3ca2021771\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 'nguyen-du' in line:
            print(f'Line {i}: length {len(line)}')
