export const crossfade = (node: HTMLImageElement, src: string) => {
  const handler = () => {
    node.style.opacity = '1';

    node.removeEventListener('load', handler);
  };

  node.style.opacity = '0';

  node.src = src;
  node.addEventListener('load', handler);

  return {
    update(newSrc: string) {
      node.style.opacity = '0';

      setTimeout(() => {
        node.src = newSrc;
        node.addEventListener('load', handler);
      }, 200);
    },
    destroy() {
      node.removeEventListener('load', handler);
    }
  };
};
