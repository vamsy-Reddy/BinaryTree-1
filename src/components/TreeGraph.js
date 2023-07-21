import React, { useCallback, useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { InputForm } from "./InputForms";
import {
  BinaryTree,
  inOrder,
  makeArrayEmpty,
  postOrder,
  preOrder,
  printInorder,
  printPostorder,
  printPreorder,
} from "../tree-lib/BinaryTree";
import Col from "react-bootstrap/Col";
import { options } from "../config";
import Row from "react-bootstrap/Row";
import { IconTrash } from "./Icons";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Card, CardContent } from "@mui/material";

let TreeGraph = (props) => {
  const defaultTree = {
    edges: [],
    nodes: [],
  };
  const [traverse, setTraverse] = React.useState("");
  let [tree, setTree] = useState(new BinaryTree(null));
  const [traversal, setTraversal] = React.useState("");

  const handleChange = (event) => {
    setTraverse(event.target.value);
    console.log(event.target.value);
    makeArrayEmpty();
    if (event.target.value === 10) {
      printPreorder(tree);
      console.log("data", preOrder);
      setTraversal(preOrder.join(", "));
    }
    if (event.target.value === 20) {
      printInorder(tree);
      setTraversal(inOrder.join(", "));
    }
    if (event.target.value === 30) {
      printPostorder(tree);
      setTraversal(postOrder.join(", "));
    }
  };

  let [representation, setRepresentation] = useState({
    edges: [],
    nodes: [],
  });
  let [network, setNetwork] = useState(null);
  let [divElement, setDiv] = useState(null);

  let handleResize = useCallback(() => {
    if (network) {
      let newOptions = options;
      newOptions.height = `${divElement.clientHeight}px`;
      network.setOptions(newOptions);
      network.fit();
    }
  }, [network, divElement]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    handleResize();
  });

  const update = (newVal) => {
    setRepresentation(newVal);
    if (network) {
      network.setData(newVal);
    }
  };

  const clear = () => {
    update(defaultTree);
    setTree(new BinaryTree(null));
  };

  const deleteNode = () => {
    let value = prompt("Enter the value to delete");
    if (value !== null) {
      tree.delete(value); // Call the delete method on the existing tree instance
      update(tree.toGraph()); // Update the representation to reflect the changes
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <InputForm update={update} tree={tree} />
        </Col>
        <Col sm={4} className="align-items">
          <button
            className={"btn btn-danger"}
            onClick={() => {
              deleteNode();
            }}
          >
            Delete Node
          </button>
        </Col>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Col sm={4} className="align-items">
          <button
            className={"btn btn-warning"}
            onClick={() => {
              clear();
            }}
          >
            <IconTrash />
            Clear All
          </button>
        </Col>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Col sm={4} className="align-items">
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Traverse</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={traverse ? traverse : ""}
                label="Traverse"
                onChange={handleChange}
              >
                <MenuItem value={""}>---None---</MenuItem>
                <MenuItem value={10}>PreOrder</MenuItem>
                <MenuItem value={20}>InOrder</MenuItem>
                <MenuItem value={30}>PostOrder</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>
        <Col style={{marginTop:"15px"}}>
          {traverse !== "" &&
          <Card style={{ backgroundColor:"#A8A196"}}>
            <CardContent>{traversal}</CardContent>
          </Card>
          }
        </Col>
      </Row>
      &nbsp;&nbsp;
      <Row>
        <Col>
          <div
            style={{
              height: "60vh",
              border: "1px dashed grey",
              borderRadius: "6px",
            }}
            ref={(divElement) => {
              setDiv(divElement);
            }}
          >
            <Graph
              options={props.options}
              updateTrigger={representation}
              graph={{ edges: [], nodes: [] }}
              getNetwork={(network) => {
                setNetwork(network);
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export { TreeGraph };
