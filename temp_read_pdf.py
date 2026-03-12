import pypdf

try:
    reader = pypdf.PdfReader('../TP_Seance3.pdf')
    text = ''
    for i, page in enumerate(reader.pages):
        text += f"--- PAGE {i+1} ---\n"
        text += page.extract_text() + "\n"
    
    with open('tp_seance3_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Done")
except Exception as e:
    print(f"Error: {e}")
