import Layout from '../components/Layout';
import { ResourceTable } from '../components/ResourceTable';

export default function EquipmentPage() {
  const data = [
    {
      avatar: '/equipment.png',
      name: 'Asdf',
      email: 'asdf@gmail.com',
      job: 'Job',
      id: '1',
    },
  ];
  return (
    <Layout>
      <ResourceTable />
    </Layout>
  );
}
