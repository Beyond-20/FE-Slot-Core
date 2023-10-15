export var landscapeCheck = function landscapeCheck() {
  var type = screen.orientation.type;

  if (type === "landscape-primary" || type === "landscape-secondary") {
    return true;
  }
  return false;
};