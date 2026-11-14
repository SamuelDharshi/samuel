/** Draw the robot silhouette (black on transparent) and return sampled points. */
export function sampleRobot(s: number, ox: number, oy: number, step: number) {
  const W = Math.ceil(300 * s), H = Math.ceil(380 * s);
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const g = cv.getContext("2d")!;
  g.scale(s, s);
  g.fillStyle = "#000";
  const rr = (x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); };
  rr(60, 70, 180, 130, 30); // head
  rr(44, 105, 16, 40, 6); rr(240, 105, 16, 40, 6); // ears
  rr(80, 215, 140, 120, 30); // torso
  g.fillRect(147.5, 38, 5, 34); // antenna
  g.beginPath(); g.arc(150, 28, 10, 0, Math.PI * 2); g.fill();
  g.lineCap = "round"; g.strokeStyle = "#000"; g.lineWidth = 26;
  g.beginPath(); g.moveTo(66, 245); g.lineTo(38, 325); g.stroke();
  g.beginPath(); g.moveTo(234, 245); g.lineTo(262, 325); g.stroke();
  g.globalCompositeOperation = "destination-out"; // hollow visor and chest light
  g.beginPath(); g.roundRect(82, 112, 136, 48, 14); g.fill();
  g.beginPath(); g.arc(150, 275, 16, 0, Math.PI * 2); g.fill();
  const d = g.getImageData(0, 0, W, H).data;
  const pts: { x: number; y: number; top: boolean }[] = [];
  for (let y = 0; y < H; y += step)
    for (let x = 0; x < W; x += step)
      if (d[(y * W + x) * 4 + 3] > 128) pts.push({ x: ox + x, y: oy + y, top: y < H * 0.55 });
  return pts;
}
