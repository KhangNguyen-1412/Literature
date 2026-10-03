import json

transcript_path = r'C:\Users\nhpk1\.gemini\antigravity-ide\brain\8e4f5377-b764-4b67-9de1-ca3ca2021771\.system_generated\logs\transcript_full.jsonl'

print("Searching transcript for data.js edits...")
with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 'TargetFile' in line and 'data.js' in line:
            print(f"Found at step index {i}, line len {len(line)}")
            try:
                step = json.loads(line)
                for tc in step.get('tool_calls', []):
                    tf = tc.get('args', {}).get('TargetFile', '')
                    if 'data.js' in tf:
                        print(f"  Target: {tf}")
                        content = tc['args'].get('CodeContent', '')
                        print(f"  CodeContent length: {len(content)}")
                        if len(content) > 100000:
                            with open(f'c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/data_js_step_{i}.js', 'w', encoding='utf-8') as out:
                                out.write(content)
                            print(f"  Dumped full data.js from step {i}!")
            except Exception as e:
                print("  Parse error:", e)
