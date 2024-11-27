export default function QuizDelete({ dialogTitle, quizId, deleteQuiz}:{ 
    dialogTitle: string; 
    quizId: string; 
    deleteQuiz: (quizId: string) => void; }) {
      return (
        <div id={`wd-delete-${quizId}-dialog`} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    {dialogTitle} </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    
                    <h5>Are you sure you want to remove the assignment?</h5>
                    
                </div>  

                <div className="modal-footer">
                    <button onClick={() => deleteQuiz(quizId)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                    Yes </button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel </button>
                </div>
            </div>
          </div>
        </div>
      );
    }
    
    