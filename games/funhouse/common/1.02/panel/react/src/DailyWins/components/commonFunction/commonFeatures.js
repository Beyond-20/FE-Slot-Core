export const landscapeCheck = () => {
  let type = screen.orientation.type;

  if (type === "landscape-primary" || type === "landscape-secondary") {
    return true;
  }
  return false;
};
