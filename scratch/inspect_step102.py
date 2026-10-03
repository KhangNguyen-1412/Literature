import json

with open(r'C:\Users\nhpk1\.gemini\antigravity-ide\brain\8e4f5377-b764-4b67-9de1-ca3ca2021771\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i == 102:
            step = json.loads(line)
            content = json.dumps(step)
            print("Step keys:", step.keys())
            # search for authors
            idx = content.find('authors')
            print("Found authors at:", idx)
            with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/step_102.json', 'w', encoding='utf-8') as out:
                out.write(content)
            print("Saved step 102 to scratch/step_102.json")
            break
