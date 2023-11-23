export default function Button({ Label, onPress, color = "#1C7B3C" }) {
  return (
    <div className="flex gap-10 w-full ">
      <div
        onClick={onPress}
        className="w-full flex items-center justify-center p-2 rounded-md mt-4 gap-4 cursor-pointer "
        style={{
          backgroundColor: color,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          {Label}
        </div>
      </div>
    </div>
  );
}
