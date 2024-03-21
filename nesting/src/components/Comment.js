import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import { ReactComponent as Trash } from "../assets/trash.svg";

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [commentorName, setCommentorName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  // console.log(comment);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
    setInput('')
    setCommentorName('');
  };

  const onAddComment = () => {
    if(!input){
      return;
      
    } 

    let obj = new Date(); 
    let day = obj.getUTCDate(); 
    let month = obj.getUTCMonth() + 1; 
    let year = obj.getUTCFullYear();
    let monthName = obj.toLocaleString('default',{month:'short'})
    const date = {
      day,
      month,
      year,
      monthName
    }
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText,date);
    } else {
      
      setExpand(true);
      handleInsertNode(comment.id, input,commentorName,date);
      setShowInput(false);
      setInput("");
      setCommentorName('');
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };
  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
          <div className="background" >
            <div className="aligninput">
          <div >
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={commentorName}
              onChange={(e) => setCommentorName(e.target.value)}
              placeholder="Name"
            />
            </div>
            <div style={{marginTop:'10px'}}>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Comment..."
            />
            </div>
            </div>

            <div className="button-top">
            <Action
              className="reply comment"
              type="POST"
              handleClick={onAddComment}
            />

            </div>
            </div>

           
          </>
        ) : (
          <>
          <div style={{display:"flex", justifyContent:'space-between', fontSize:'14px' }}>
          <div
              style={{ wordWrap: "break-word" }}
            >
              {comment.commentorName}
            </div>
            <div>

            {(comment.date.day + '-' +comment.date.monthName + '-' +comment.date.year)}

            </div>
            </div>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                      setInput(inputRef.current);
                    }}
                  />
                </>
              )}

                
            </div>
            <Action
                  
                  className="trash-icon"
                  type={
                    <>
                    <Trash width="20px" height="20px" onClick={handleDelete} />
                    </>
                  }
                  handleClick={handleDelete}
                />
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
            <div className=" commentContainer">
              <div style={{marginTop:10}}>
              <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={commentorName}
              onChange={(e) => setCommentorName(e.target.value)}
              placeholder="Name"
            />
            </div>
            <div>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              placeholder="Reply"
              onChange={(e) => setInput(e.target.value)}
            />
         
            </div>

            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <div><Action className="reply comment" type="REPLY" handleClick={onAddComment} /></div>
            <div>
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
            </div>
            </div>
            </div>
            
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
