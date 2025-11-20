// получить цвет placeholder у input
export function getPlaceholderColor(element) {
  const styles = window.getComputedStyle(element, '::placeholder');
  return styles.getPropertyValue('color');
}  