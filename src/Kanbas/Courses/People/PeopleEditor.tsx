export default function PeopleEditor({ dialogTitle, PersonId, setPersonId, addPerson }:{ 
    dialogTitle: string; PersonId: string; setPersonId: (name: string) => void; addPerson: () => void; }) {
      return (
        <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {dialogTitle} </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <input className="form-control" defaultValue={PersonId} placeholder="New Person ID"
                       onChange={(e) => setPersonId(e.target.value)}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={addPerson} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Add Person </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    