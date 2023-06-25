const SPEED = 0.01;
export default class Player {
  constructor(padelem) {
    this.padelem = padelem;
    this.reset();
  }
  get position() {
    return parseFloat(
      getComputedStyle(this.padelem).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.padelem.style.setProperty("--position", value);
  }
  rect() {
    return this.padelem.getBoundingClientRect();
  }
  reset() {
    this.position = 50;
  }
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
