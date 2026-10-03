import json

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/step_102.json', 'r', encoding='utf-8') as f:
    step = json.load(f)

for tc in step.get('tool_calls', []):
    args = tc.get('args', {})
    code = args.get('CodeContent', '') or args.get('ReplacementContent', '')
    if 'authors' in code:
        print("Found code with authors, length:", len(code))
        with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/recovered_code.txt', 'w', encoding='utf-8') as out:
            out.write(code)
        print("Wrote scratch/recovered_code.txt")
