const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  color = "255, 0, 0" // RGB format
}) => {
  return (
    <div
      className="absolute -z-50 h-56 w-56 aspect-square rounded-full blur-3xl"
      style={{
        top,
        left,
        right,
        bottom,
        backgroundColor: `rgba(${color}, 0.3)` // 0.3 opacity
      }}
    ></div>
  );
};

export default BlurCircle;
