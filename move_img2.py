def move_hero_img():
    filepath = 'index_v2.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Find hero-right start and end
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if '<div class="hero-right">' in line:
            start_idx = i
        if start_idx != -1 and i > start_idx and '  </div>' in line:
            # We assume it closes at the first 2-space indented </div> after hero-right
            if line.startswith('  </div>'):
                end_idx = i
                break

    if start_idx == -1 or end_idx == -1:
        print(f"Could not find hero-right bounds: start={start_idx}, end={end_idx}")
        return

    # Extract lines
    hero_right_lines = lines[start_idx:end_idx+1]
    
    # Delete from original list
    del lines[start_idx:end_idx+1]

    hero_right_str = "".join(hero_right_lines)

    # Modifications
    hero_right_str = hero_right_str.replace('<span class="cert-t1">Técnico Formado</span>', '<span class="cert-t1">Técnico</span>')
    hero_right_str = hero_right_str.replace('<span class="cert-t2">e Registrado</span>', '<span class="cert-t2">Especializado</span>')

    # Wrap in a new block
    img_block = f"""
  <div class="svc-img-block" style="position:relative; max-width:500px; margin: 0 auto 60px auto;">
{hero_right_str}
  </div>
"""
    img_block = img_block.replace('<div class="hero-right">', '<div class="hero-right" style="min-height:unset; display:flex; justify-content:center;">')

    # Find insertion point for img_block (after svc-header closes)
    insert_idx = -1
    for i, line in enumerate(lines):
        if '<div class="svc-header reveal">' in line:
            # find where svc-header closes
            for j in range(i, len(lines)):
                if '    </p>' in lines[j] and '  </div>' in lines[j+1]:
                    insert_idx = j + 2
                    break
            break

    if insert_idx == -1:
        print("Could not find svc-header")
        return

    # Insert
    lines.insert(insert_idx, img_block)

    # Change CSS for #hero
    for i, line in enumerate(lines):
        if 'grid-template-columns:1fr 1fr;' in line:
            lines[i] = line.replace('grid-template-columns:1fr 1fr;', 'grid-template-columns:1fr;')
            break

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("Success! Image moved.")

move_hero_img()
