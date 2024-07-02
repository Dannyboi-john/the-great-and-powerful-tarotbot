import requireContext from 'require-context.macro'

const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((item) => {
      const key = item.replace('./', '');
      images[key] = requireContext(item);
    });
    return images;
  };
  
  export const images = importAll(import.meta.glob('../assets/tarot-cards/*.{png,jpg,jpeg,svg}', { eager: true }));