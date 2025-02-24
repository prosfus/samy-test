interface ImagePriceProps {
  price: number;
  smallView: boolean;
}

export const ImagePrice = ({ price, smallView }: ImagePriceProps) => {
  if (smallView) {
    return (
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: "16px",
        }}
      >
        {price.toFixed(2)}€
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            width: "150px",
            height: "100px",
            backgroundColor: "white",
            clipPath: "polygon(0 0, 0% 100%, 100% 0)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 25,
            left: 15,
            fontWeight: "bold",
          }}
        >
          {price.toFixed(2)}€
        </span>
      </div>
    </div>
  );
};
