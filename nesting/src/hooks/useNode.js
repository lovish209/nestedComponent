const useNode = () => {
  const insertNode = function (tree, commentId, item,commentorName,date) {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        commentorName:commentorName,
        name: item,
        date:date,
        items: [],

      });
      localStorage.setItem('comments',JSON.stringify(tree));

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item,commentorName,date);
    });
    localStorage.setItem('comments',JSON.stringify({ ...tree, items: latestNode }));
    return { ...tree, items: latestNode };
  };

  const editNode = (tree, commentId, value,date) => {
    if (tree.id === commentId) {
      tree.name = value;
      tree.date = date;
      localStorage.setItem('comments',JSON.stringify(tree));
      return tree;
    }
    tree.items.map((ob) => {
      return editNode(ob, commentId, value,date);
    });
    localStorage.setItem('comments',{ ...tree });

    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        localStorage.setItem('comments',tree);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }

    localStorage.setItem('comments',tree);
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};

export default useNode;
