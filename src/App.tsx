import styled from "styled-components";
import * as mol from "3dmol";
import axios from "axios";
import { useEffect, useRef } from "react";

const Container = styled.div`
  width: 600px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  margin-top: 200px;
`;

const getSource = async () => {
  const { data } = await axios.get("atoms.pdb");
  return data;
};

const colorAsSnake = function (atom: any) {
  // console.log(atom);
  // return atom.elem == "C" ? "yellow" : "blue";
  switch (atom.elem) {
    case "H": //氢
      return "#ffffff";
    case "N": //氮
      return "#0000FF";
    case "P": //磷
      return "#E99CFF";
    case "C": //碳
      return "#828282";
    case "Cl": //氯
      return "#B3FFAD";
    case "O": //氧
      return "#FF0000";
    case "S": //硫
      // if(atom.serial==1){  atom.bondOrder=[1,2]}
      // if(atom.serial==3){  atom.bondOrder=[1,2]}
      return "#FFEB00";
  }
  return atom.elem == "C" ? "yellow" : "blue";
};

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const config = { backgroundColor: "#F5F9FF" };
    const viewer = mol.createViewer(element, config);
    // viewer.addSphere({
    //   center: { x: 0, y: 0, z: 0 },
    //   radius: 10.0,
    //   color: "green",
    // });
    // viewer.zoomTo();
    // viewer.render();
    // viewer.zoom(0.8, 2000);

    const init = async () => {
      const data = await getSource();
      viewer.addModel(data, "pdb", { keepH: true }); /* load data */
      viewer.setStyle({}, { sphere: { colorfunc: colorAsSnake } });
      viewer.setZoomLimits(20, 500);
      viewer.zoomTo();
      // viewer.zoom(10); //will not zoom all the way
      viewer.center();
      viewer.render();
    };
    init();
  }, []);

  return <Container ref={ref} />;
}

export default App;
