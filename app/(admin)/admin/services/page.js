'use client';
import { useState } from 'react';
import { mockServices } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader, Input } from '@/components/ui';

const SERVICE_REQUESTS = [
  { id: 'req_001', merchant: 'AmaniRenas', service: 'Full Store Setup', status: 'in_progress', assignee: 'Karim Ali', created: '2024-01-15', price: 149 },
  { id: 'req_002', merchant: 'Sudan Craft', service: 'Product Image Optimization', status: 'pending', assignee: null, created: '2024-01-18', price: 49 },
  { id: 'req_003', merchant: 'AmaniRenas', service: 'WhatsApp Business Setup', status: 'completed', assignee: 'Karim Ali', created: '2024-01-10', price: 99 },
];

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800', assigned: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-amber-100 text-amber-800', completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminServicesPage() {
  const [services, setServices] = useState(mockServices);
  const [tab, setTab] = useState('catalog');
  const [editModal, setEditModal] = useState(null);

  return (
    <div>
      <SectionHeader title="Services" description="Paid technician services and service orders." action={<Button size="sm">+ Add Service</Button>} />

      <div className="flex gap-1 border-b border-slate-200 mb-6">
        {['catalog', 'requests'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-all
              ${tab === t ? 'border-[#8B4513] text-[#8B4513]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {t === 'catalog' ? 'Service Catalog' : 'Service Requests'}
          </button>
        ))}
      </div>

      {tab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(svc => (
            <Card key={svc._id}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{svc.name}</h3>
                <Badge variant={svc.status === 'active' ? 'success' : 'default'}>{svc.status}</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{svc.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#8B4513]">${svc.price}</span>
                  <span className="text-xs text-slate-400 ml-1">· {svc.duration}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="xs" onClick={() => setEditModal(svc)}>Edit</Button>
                  <Button variant={svc.status === 'active' ? 'danger' : 'success'} size="xs"
                    onClick={() => setServices(prev => prev.map(s => s._id === svc._id ? {...s, status: s.status === 'active' ? 'inactive' : 'active'} : s))}>
                    {svc.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <button className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors">
            <span className="text-2xl">+</span>
            <span className="text-sm font-medium">Add New Service</span>
          </button>
        </div>
      )}

      {tab === 'requests' && (
        <Card padding="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100">
                {['Merchant','Service','Assignee','Status','Price','Date','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {SERVICE_REQUESTS.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{r.merchant}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{r.service}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{r.assignee || <span className="text-amber-600 font-medium">Unassigned</span>}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[r.status]}`}>
                        {r.status.replace('_',' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-800">${r.price}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{r.created}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="xs">Assign</Button>
                        <Button variant="outline" size="xs">View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-slate-900 mb-4">Edit Service</h2>
            <div className="space-y-3">
              <Input label="Service name" defaultValue={editModal.name} />
              <Input label="Price (USD)" type="number" defaultValue={editModal.price} />
              <Input label="Estimated duration" defaultValue={editModal.duration} />
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea defaultValue={editModal.description} rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#8B4513] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button variant="primary" className="flex-1" onClick={() => setEditModal(null)}>Save</Button>
              <Button variant="outline" onClick={() => setEditModal(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
