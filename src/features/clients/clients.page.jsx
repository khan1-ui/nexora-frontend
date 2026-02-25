/**
 * ClientsPage
 *
 * Feature Entry Point
 * -------------------
 * - Connects data + form hooks
 * - Orchestrates UI components
 * - No business logic here
 */

import { useClients } from "./hooks/useClients";
import { useClientForm } from "./hooks/useClientForm";
import ClientHeader from "./components/ClientHeader";
import ClientTable from "./components/ClientTable";
import ClientModal from "./components/ClientModal";

const ClientsPage = () => {
  const clientLogic = useClients();
  const formLogic = useClientForm(clientLogic.fetchClients);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      <ClientHeader
        search={clientLogic.search}
        setSearch={clientLogic.setSearch}
        onCreate={() => formLogic.setOpenModal(true)}
      />

      <ClientTable
  clients={clientLogic.clients}
  loading={clientLogic.loading}
  meta={clientLogic.meta}
  currentPage={clientLogic.currentPage}
  setCurrentPage={clientLogic.setCurrentPage}
  handleSort={clientLogic.handleSort}
  handleEdit={formLogic.handleEdit}
  handleDelete={formLogic.openDeleteConfirm}
/>

<ClientModal {...formLogic} />

    </div>
  );
};

export default ClientsPage;