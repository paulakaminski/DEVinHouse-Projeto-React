export default function Modal({
  medicamento,
  dosagem,
  tipo,
  preco,
  descricao,
  hide,
}) {
  let modalStyle = {
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  };
  return (
    <div class="modal show fade" style={modalStyle}>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{medicamento}</h5>
            <button type="button" class="btn-close" onClick={hide}></button>
          </div>
          <div class="modal-body">
            <p>
              <strong>Dosagem: </strong>
              {dosagem}
            </p>
            <p>
              <strong>Tipo: </strong>
              {tipo}
            </p>
            <p>
              <strong>Preço: </strong>
              {preco}
            </p>
            <p>
              <strong>Descricao: </strong>
              {descricao}
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={hide}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
