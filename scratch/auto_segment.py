import re

# Load all valid syllables from js/data.js
with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    data_text = f.read()

# Extract all words
known_syllables = set()
for w in re.findall(r'[a-zA-ZÀ-ỹ]+', data_text):
    # Only single-syllable length (roughly <= 7 chars and standard Vietnamese)
    if len(w) <= 7:
        known_syllables.add(w.lower())

print(f"Total known valid Vietnamese syllables from literature database: {len(known_syllables)}")

# Function to split a glued word into known syllables using dynamic programming
def segment_word(w):
    w_lower = w.lower()
    n = len(w)
    
    # dp[i] = list of syllables for w_lower[:i], or None
    dp = [None] * (n + 1)
    dp[0] = []
    
    for i in range(1, n + 1):
        for j in range(max(0, i - 7), i):
            sub = w_lower[j:i]
            if sub in known_syllables and dp[j] is not None:
                dp[i] = dp[j] + [w[j:i]]
                break
                
    if dp[n] is not None:
        return " ".join(dp[n])
    return w

# Test on multi_tone_words.txt
with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/multi_tone_words.txt', 'r', encoding='utf-8') as f:
    test_words = [line.strip() for line in f if line.strip()]

split_results = []
failed = []
for tw in test_words:
    res = segment_word(tw)
    if res != tw:
        split_results.append((tw, res))
    else:
        failed.append(tw)

print(f"Successfully segmented: {len(split_results)} / {len(test_words)}")
print("Sample segmented:")
for orig, seg in split_results[:30]:
    print(f"  {orig:<20} -> {seg}")

if failed:
    print(f"Failed to segment ({len(failed)}):", failed[:20])
