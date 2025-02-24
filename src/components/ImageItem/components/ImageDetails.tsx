interface ImageDetailsProps {
  title: string;
  author: string;
  itemWidth: number;
}

export const ImageDetails = ({
  title,
  author,
  itemWidth,
}: ImageDetailsProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        flexBasis: 0,
      }}
    >
      <div
        style={{
          fontSize: "28px",
          textTransform: "uppercase",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: itemWidth - 40,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "16px",
          textTransform: "lowercase",
        }}
      >
        <span style={{ color: "#BFBFBE" }}>by </span>
        {author}
      </div>
    </div>
  );
};
