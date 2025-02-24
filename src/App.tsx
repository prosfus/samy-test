import ImagesList from "./components/ImagesList";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Topbar />
      <ImagesList />
    </div>
  );
}
