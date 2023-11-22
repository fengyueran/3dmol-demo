import styled from "styled-components";
import * as mol from "3dmol";
import { useEffect, useRef } from "react";

const Container = styled.div`
  width: 600px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  margin-top: 200px;
`;

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const config = { backgroundColor: "orange" };
    const viewer = mol.createViewer(element, config);
    viewer.addSphere({
      center: { x: 0, y: 0, z: 0 },
      radius: 10.0,
      color: "green",
    });
    viewer.zoomTo();
    viewer.render();
    viewer.zoom(0.8, 2000);
  }, []);

  return <Container ref={ref} />;
}

export default App;
