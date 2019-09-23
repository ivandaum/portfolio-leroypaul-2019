export function colorid(id) {
  id >>>= 0;
  return [
    id & 0xFF,
    (id & 0xFF00) >>> 8,
    (id & 0xFF0000) >>> 16
  ]
}
export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randFloat(min, max) {
  return (Math.random() * (max - min) + min)
}
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

export function percentInRange(min, max, value) {
  return ((value - min) * 100) / (max - min)
}

export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  var to = "aaaaeeeeiiiioooouuuunc------"
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

/**
* Copy a string to clipboard
* @param  {String} string         The string to be copied to clipboard
* @return {Boolean}               returns a boolean correspondent to the success of the copy operation.
*/
export function copyToClipboardv2(string) {
  let textarea;
  let result;

  try {
    textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', true);
    textarea.setAttribute('contenteditable', true);
    textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
    textarea.value = string;

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    document.body.removeChild(textarea);
  }

  // manual copy fallback using prompt
  if (!result) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
    result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
    if (!result) {
      return false;
    }
  }
  return true;
}
export function interpolate(A, B, t) {
  return A + t * (B - A);
}

export function konami(then) {
  let k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    n = 0
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === k[n++]) {
      then({})
      if (n === k.length) {
        n = 0;
        then({ success: true })
        return false
      }
    } else {
      n = 0;
      then({})
    }
  })
}