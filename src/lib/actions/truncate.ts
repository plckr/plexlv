export type TruncateOptions = {
  lines: number;
  expandTranslation: string;
  collapseTranslation: string;
};

export const truncate = (
  node: HTMLElement,
  { lines = 3, expandTranslation = 'Sabe mais', collapseTranslation = 'Ler menos' }: TruncateOptions
) => {
  const id = node.id || crypto.randomUUID();

  const button = document.createElement('button');
  button.setAttribute('aria-controls', id);
  button.textContent = expandTranslation;
  let expanded = false;

  const lineHeight = getComputedStyle(node).getPropertyValue('line-height');
  const collapseHeight = `calc(${lineHeight} * ${lines})`;

  const collapse = () => {
    expanded = false;

    button.setAttribute('aria-expanded', 'false');
    button.textContent = expandTranslation;

    node.style.maxHeight = collapseHeight;
  };
  const expand = () => {
    expanded = true;

    button.setAttribute('aria-expanded', 'true');
    button.textContent = collapseTranslation;

    node.style.maxHeight = `${node.scrollHeight}px`;
  };

  const trigger = () => {
    if (node.clientHeight < node.scrollHeight) {
      expand();
    } else {
      collapse();
    }
  };

  const setup = () => {
    collapse();
    node.id = id;

    if (node.clientHeight < node.scrollHeight && !expanded) {
      if (!button.isConnected) {
        node.after(button);
        button.addEventListener('click', trigger);
      }
      collapse();
    }

    if (node.clientHeight >= node.scrollHeight && button.isConnected) {
      button.remove();
    }
  };

  window.addEventListener('resize', setup);
  setup();

  const clearListeners = () => {
    button.removeEventListener('click', trigger);
    window.removeEventListener('resize', setup);
  };

  return {
    destroy() {
      button.remove();
      clearListeners();
    }
  };
};
