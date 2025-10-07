window.addEventListener('DOMContentLoaded', () => {
  const out = document.getElementById('out');
  if (out && window.electronAPI && window.electronAPI.hello) {
    out.innerText = window.electronAPI.hello();
  }

  const addBtn = document.getElementById('addImages');
  const imagesRoot = document.getElementById('images');

  function createThumb(labelOrPath, src) {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '8px';

  const img = document.createElement('img');
  img.src = src || `file://${labelOrPath}`;
  img.style.width = '64px';
    img.style.height = '64px';
    img.style.objectFit = 'cover';
  img.alt = labelOrPath;

  const label = document.createElement('div');
  label.style.flex = '1';
  label.style.fontSize = '12px';
  label.style.wordBreak = 'break-all';
  label.innerText = (labelOrPath + '').split(/\\|\//).pop();

    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', () => wrap.remove());

    wrap.appendChild(img);
    wrap.appendChild(label);
    wrap.appendChild(remove);
    return wrap;
  }

  addBtn.addEventListener('click', async () => {
    // If running in Electron, use the native file picker
    if (window.electronAPI && window.electronAPI.selectImages) {
      const paths = await window.electronAPI.selectImages();
      if (!paths || !paths.length) return;
      for (const p of paths) {
        const thumb = createThumb(p, `file://${p}`);
        imagesRoot.appendChild(thumb);
      }
      return;
    }

    // Browser fallback: use an <input type="file"> to pick images
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.addEventListener('change', () => {
      const files = Array.from(input.files || []);
      for (const f of files) {
        const objectUrl = URL.createObjectURL(f);
        const thumb = createThumb(f.name, objectUrl);
        imagesRoot.appendChild(thumb);
      }
      // release object URLs when the window unloads (not per-file here)
      window.addEventListener('unload', () => files.forEach(f => URL.revokeObjectURL(f)));
    });
    input.click();
  });
});
