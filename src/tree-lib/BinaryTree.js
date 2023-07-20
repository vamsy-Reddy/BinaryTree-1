import { options } from "../config";

class Node {
  static counter = 0;

  constructor(value, parent = null) {
    this.id = Node.counter;
    Node.counter++;

    this.parent = parent;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  _convert(item, i = 0) {
    return isNaN(item) ? parseInt(item.charCodeAt(i), 10) : parseInt(item, 10);
  }

  _handleEqual(item, itemValue, thisValue) {
    if (isNaN(item)) {
      let index = 1;
      while (itemValue === thisValue) {
        itemValue = this._convert(item, index);
        thisValue = this._convert(this.value, index);
        index++;

        if (index >= this.value.length) {
          this.addRightChild(item);
          return;
        }
        if (index >= item.length) {
          this.addLeftChild(item);
          return;
        }
      }
      if (itemValue === thisValue) {
        this.addLeftChild(item);
      } else {
        this._compareValues(item, itemValue, thisValue);
      }
    } else {
      // same number, insert at left child
      this.addLeftChild(item);
    }
  }

  _compareValues(item, itemValue, thisValue) {
    if (itemValue < thisValue) {
      this.addLeftChild(item);
    } else if (itemValue > thisValue) {
      this.addRightChild(item);
    } else {
      // special case for equality
      this._handleEqual(item, itemValue, thisValue);
    }
  }

  addLeftChild(item) {
    this.left ? this.left.insert(item) : (this.left = new Node(item, this));
  }

  addRightChild(item) {
    this.right ? this.right.insert(item) : (this.right = new Node(item, this));
  }

  insert(item) {
    let itemValue = this._convert(item);
    if (this.value) {
      let thisValue = this._convert(this.value);
      this._compareValues(item, itemValue, thisValue);
    } else {
      this.value = item;
    }
  }

  delete(item) {
    let itemValue = this._convert(item);
    let thisValue = this._convert(this.value);

    if (itemValue < thisValue) {
      if (this.left) {
        this.left = this.left.delete(item);
      }
    } else if (itemValue > thisValue) {
      if (this.right) {
        this.right = this.right.delete(item);
      }
    } else {
      // Node with the target value found

      // Case 1: Node has no children or only one child
      if (this.left === null) {
        return this.right;
      } else if (this.right === null) {
        return this.left;
      }

      // Case 2: Node has two children
      // Find the minimum value in the right subtree (successor)
      let minValueNode = this.right.findMin();

      // Replace the node's value with the minimum value
      this.value = minValueNode.value;

      // Delete the minimum value node from the right subtree
      this.right = this.right.delete(minValueNode.value);
    }

    return this;
  }

  findMin() {
    let current = this;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  toGraph(isRoot = true) {
    let edges = this.parent
      ? [
          {
            from: this.parent.id,
            to: this.id,
          },
        ]
      : [];
    let nodes = this.value
      ? [
          {
            id: this.id,
            label: this.value,
            shape: isRoot ? "box" : options.nodes.shape,
          },
        ]
      : [];
    if (this.left) {
      let leftRes = this.left.toGraph(false);
      edges = [...edges, ...leftRes.edges];
      nodes = [...nodes, ...leftRes.nodes];
    }
    if (this.right) {
      let rightRes = this.right.toGraph(false);
      edges = [...edges, ...rightRes.edges];
      nodes = [...nodes, ...rightRes.nodes];
    }

    return {
      nodes,
      edges,
    };
  }
}

export { Node as BinaryTree };
