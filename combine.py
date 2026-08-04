import os

output_file = 'all_code.txt'
project_dir = r'f:\venture'

exclude_dirs = {'.git', 'node_modules', '.next', '__pycache__', 'venv', 'dist', 'build', '.gemini'}
exclude_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.dwg', '.exe', '.db', '.sqlite3', '.pyc'}

with open(os.path.join(project_dir, output_file), 'w', encoding='utf-8') as outfile:
    for root, dirs, files in os.walk(project_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in sorted(files):
            ext = os.path.splitext(file)[1].lower()
            if ext in exclude_extensions or file == output_file or file == 'combine.py':
                continue
            
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, project_dir)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as infile:
                    content = infile.read()
                
                outfile.write(f"{'='*80}\n")
                outfile.write(f"FILE: {rel_path}\n")
                outfile.write(f"{'='*80}\n\n")
                outfile.write(content)
                outfile.write("\n\n")
            except Exception as e:
                outfile.write(f"Error reading file {rel_path}: {e}\n\n")

print(f"Code combined successfully into {output_file}")
