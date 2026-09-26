// The fixed background environment layer: the architectural grid and the two
// slow-drifting glows. One instance, mounted once in the root layout, so
// scrolling between pages feels like moving through one place.
export function Env() {
  return (
    <div className="env" aria-hidden="true">
      <div className="env-glow a" />
      <div className="env-glow b" />
    </div>
  );
}
