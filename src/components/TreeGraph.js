import React, { useCallback, useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { InputForm } from "./InputForm";
import { BinaryTree } from "../tree-lib/BinaryTree";
import Col from "react-bootstrap/Col";
import { options } from "../config";
import Row from "react-bootstrap/Row";
import { IconTrash } from "./Icons";
import { Container } from "react-bootstrap";

let TreeGraph = (props) => {
  const defaultTree = {
    edges: [],
    nodes: [],
  };

  let [tree, setTree] = useState(new BinaryTree(null));

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
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Col sm={4} className="align-items">
          <button
            className={"btn btn-danger"}
            onClick={() => {
              clear();
            }}
          >
            <IconTrash />
            Clear All
          </button>
        </Col>
      </Row>
      &nbsp;&nbsp;
      <Row>
        <Col>
          <div
            style={{ height: "60vh" }}
            ref={(divElement) => {
              setDiv(divElement);
            }}
            className={"border border-dark"}
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
