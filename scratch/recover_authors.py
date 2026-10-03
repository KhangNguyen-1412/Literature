import json

transcript_path = r'C:\Users\nhpk1\.gemini\antigravity-ide\brain\8e4f5377-b764-4b67-9de1-ca3ca2021771\.system_generated\logs\transcript_full.jsonl'

print("Searching transcript for authors...")
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        if 'nam-cao' in line and 'vu-trong-phung' in line and 'nguyen-du' in line and 'authors' in line:
            # Let's extract JSON object from this step
            try:
                step = json.loads(line)
                # Look into tool calls or content
                content_str = json.dumps(step)
                p = content_str.find('"authors": [')
                if p != -1:
                    p2 = content_str.find('],\\n  "quotes":', p)
                    if p2 == -1:
                        p2 = content_str.find('],\\n  \\"quotes\\":', p)
                    print(f"Found candidate at {p}, end {p2}")
                    if p2 != -1:
                        block = content_str[p:p2+2]
                        # unescape
                        clean_block = json.loads('"' + block.replace('"', '\\"') + '"')
                        with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/recovered_authors.txt', 'w', encoding='utf-8') as out:
                            out.write(block)
                        print("Saved block!")
            except Exception as e:
                pass
