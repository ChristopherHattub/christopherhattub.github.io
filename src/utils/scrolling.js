export const scrollToSection = (section) => {
  if (!section) return;
  
  const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
  const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
  
  window.scrollTo({
    top: elementPosition - navHeight,
    behavior: 'smooth'
  });
};

export const getActiveSection = (sections) => {
  if (!sections || !sections.length) return undefined;
  
  const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
  const windowMiddle = window.innerHeight / 2;
  
  let maxVisibleSection = sections[0];
  let maxVisibleArea = 0;
  
  sections.forEach(section => {
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top + navHeight, 0);
    
    if (visibleHeight > maxVisibleArea) {
      maxVisibleArea = visibleHeight;
      maxVisibleSection = section;
    }
  });
  
  return maxVisibleSection;
};
