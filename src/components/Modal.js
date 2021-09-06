import React from "react";

const modal = ({ modalType, close, post, removePostit, handleEditDone }) => {
  return (
    <div className={modalType.open ? "modal open" : "modal"} onClick={close}>
      {modalType.open ? (
        <section>
          <header>
            {modalType.type}
            <button className="close" onClick={close}>
              X
            </button>
          </header>
          <main>{modalType.msg}</main>
          <footer>
            <button
              className="close"
              onClick={() => {
                if (modalType.type === "remove") {
                  removePostit(post.id);
                } else if (modalType.type === "editDone") {
                  handleEditDone();
                } else if (modalType.type === "warning") {
                  console.log("no input warning");
                } else if (modalType.type === "edit") {
                  console.log("edit button");
                }
              }}
            >
              yes
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default modal;
